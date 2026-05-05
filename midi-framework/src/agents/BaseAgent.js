/**
 * Base Agent Class
 * Foundation class for all MIDI agent executors
 */

import fs from 'fs-extra';
import path from 'path';
import { fileExists, writeFile, ensureDir } from '../utils/fileSystem.js';
import { logger } from '../cli/logger.js';

export class BaseAgent {
  constructor(name, config = {}) {
    this.name = name;
    this.config = config;
    this.projectPath = config.projectPath || process.cwd();
    this.agentsDir = path.join(this.projectPath, '.midi', 'agents');
    this.outputDir = path.join(this.projectPath, 'midi-project');
    this.definition = null;
    this.inputs = {};
    this.outputs = {};
    this.errors = [];
    this.warnings = [];
  }

  /**
   * Load agent definition from .midi/agents/*.md
   */
  async loadConfig() {
    const agentFile = path.join(this.agentsDir, `midi-${this.name}-agent.md`);
    
    if (await fileExists(agentFile)) {
      const content = await fs.readFile(agentFile, 'utf8');
      this.definition = this.parseAgentDefinition(content);
      return this.definition;
    }
    
    logger.warning(`Agent definition not found: ${agentFile}`);
    return null;
  }

  /**
   * Parse agent markdown definition
   */
  parseAgentDefinition(content) {
    const definition = {
      role: '',
      purpose: '',
      whenToActivate: [],
      inputs: [],
      outputs: [],
      guardrails: []
    };

    // Extract role
    const roleMatch = content.match(/## Role\n([\s\S]*?)(?=\n##|$)/);
    if (roleMatch) {
      definition.role = roleMatch[1].trim();
    }

    // Extract purpose
    const purposeMatch = content.match(/## Purpose\n([\s\S]*?)(?=\n##|$)/);
    if (purposeMatch) {
      definition.purpose = purposeMatch[1].trim();
    }

    // Extract when to activate
    const activateMatch = content.match(/## When to Activate\n([\s\S]*?)(?=\n##|$)/);
    if (activateMatch) {
      definition.whenToActivate = activateMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim());
    }

    // Extract reads from
    const readsMatch = content.match(/## Reads From\n([\s\S]*?)(?=\n##|$)/);
    if (readsMatch) {
      definition.inputs = readsMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim());
    }

    // Extract writes to
    const writesMatch = content.match(/## Writes To\n([\s\S]*?)(?=\n##|$)/);
    if (writesMatch) {
      definition.outputs = writesMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim());
    }

    // Extract guardrails
    const guardrailsMatch = content.match(/## Guardrails\n([\s\S]*?)(?=\n##|$)/);
    if (guardrailsMatch) {
      definition.guardrails = guardrailsMatch[1]
        .split('\n')
        .filter(line => line.trim().match(/^[✅❌]/))
        .map(line => line.trim());
    }

    return definition;
  }

  /**
   * Read input files
   */
  async readInputs(inputPaths = {}) {
    const inputs = {};
    
    for (const [key, filePath] of Object.entries(inputPaths)) {
      const fullPath = path.join(this.projectPath, filePath);
      
      if (await fileExists(fullPath)) {
        try {
          const content = await fs.readFile(fullPath, 'utf8');
          inputs[key] = content;
          logger.debug(`Read input: ${filePath}`);
        } catch (error) {
          this.warnings.push(`Could not read ${filePath}: ${error.message}`);
        }
      } else {
        this.warnings.push(`Input file not found: ${filePath}`);
      }
    }
    
    this.inputs = inputs;
    return inputs;
  }

  /**
   * Execute agent logic (to be overridden by subclasses)
   */
  async execute(context = {}) {
    logger.info(`Executing ${this.name} agent...`);
    
    // Default implementation - just return context
    return {
      success: true,
      context,
      outputs: this.outputs,
      errors: this.errors,
      warnings: this.warnings
    };
  }

  /**
   * Write outputs to files
   */
  async writeOutputs(outputs = {}) {
    const results = {};
    
    for (const [filename, content] of Object.entries(outputs)) {
      const outputPath = path.join(this.outputDir, filename);
      
      try {
        await ensureDir(path.dirname(outputPath));
        await writeFile(outputPath, content);
        results[filename] = { success: true, path: outputPath };
        logger.success(`Wrote output: ${filename}`);
      } catch (error) {
        results[filename] = { success: false, error: error.message };
        this.errors.push(`Failed to write ${filename}: ${error.message}`);
      }
    }
    
    this.outputs = outputs;
    return results;
  }

  /**
   * Validate outputs meet requirements
   */
  async validate() {
    const issues = [];
    
    for (const [filename, content] of Object.entries(this.outputs)) {
      if (!content || content.trim().length === 0) {
        issues.push(`Output ${filename} is empty`);
      }
    }
    
    return {
      valid: issues.length === 0,
      issues
    };
  }

  /**
   * Log execution status
   */
  logStatus(status, message) {
    const prefix = `[${this.name}]`;
    
    switch (status) {
      case 'start':
        logger.info(`${prefix} Starting execution...`);
        break;
      case 'progress':
        logger.info(`${prefix} ${message}`);
        break;
      case 'complete':
        logger.success(`${prefix} Execution complete`);
        break;
      case 'error':
        logger.error(`${prefix} ${message}`);
        break;
      case 'warning':
        logger.warning(`${prefix} ${message}`);
        break;
    }
  }

  /**
   * Add error
   */
  addError(message) {
    this.errors.push(message);
    this.logStatus('error', message);
  }

  /**
   * Add warning
   */
  addWarning(message) {
    this.warnings.push(message);
    this.logStatus('warning', message);
  }

  /**
   * Get execution summary
   */
  getSummary() {
    return {
      agent: this.name,
      errors: this.errors.length,
      warnings: this.warnings.length,
      outputsGenerated: Object.keys(this.outputs).length,
      success: this.errors.length === 0
    };
  }
}

export default BaseAgent;
