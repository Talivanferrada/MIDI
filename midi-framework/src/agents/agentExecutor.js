/**
 * Agent Executor
 * Loads and executes MIDI agent definitions
 */

import fs from 'fs-extra';
import path from 'path';
import { logger } from '../cli/logger.js';
import { fileExists } from '../utils/fileSystem.js';
import { BaseAgent } from './BaseAgent.js';

export class AgentExecutor {
  constructor(agentName, projectPath) {
    this.agentName = agentName;
    this.projectPath = projectPath || process.cwd();
    this.definition = null;
    this.context = {};
    this.executionLog = [];
  }

  /**
   * Load agent definition from .midi/agents/*.md
   */
  async loadDefinition() {
    const agentFileName = this.agentName.startsWith('midi-') 
      ? `${this.agentName}-agent.md`
      : `midi-${this.agentName}-agent.md`;
    
    const agentPath = path.join(this.projectPath, '.midi', 'agents', agentFileName);
    
    if (!(await fileExists(agentPath))) {
      throw new Error(`Agent definition not found: ${agentPath}`);
    }

    const content = await fs.readFile(agentPath, 'utf8');
    this.definition = this.parseDefinition(content);
    
    logger.info(`Loaded agent definition: ${this.definition.name}`);
    return this.definition;
  }

  /**
   * Parse agent markdown into structured definition
   */
  parseDefinition(content) {
    const definition = {
      name: this.agentName,
      role: '',
      purpose: '',
      whenToActivate: [],
      inputs: [],
      outputs: [],
      guardrails: [],
      instructions: {},
      rawContent: content
    };

    // Extract sections using regex patterns
    const extractSection = (header) => {
      const regex = new RegExp(`## ${header}\\n([\\s\\S]*?)(?=\\n##|$)`, 'i');
      const match = content.match(regex);
      return match ? match[1].trim() : '';
    };

    const extractList = (header) => {
      const section = extractSection(header);
      return section
        .split('\n')
        .filter(line => line.trim().match(/^[-*]\s/))
        .map(line => line.replace(/^[-*]\s*/, '').trim());
    };

    // Parse main sections
    definition.role = extractSection('Role');
    definition.purpose = extractSection('Purpose');
    definition.whenToActivate = extractList('When to Activate');
    
    // Parse reads/writes
    const readsSection = extractSection('Reads From');
    definition.inputs = this.parseFileList(readsSection);
    
    const writesSection = extractSection('Writes To');
    definition.outputs = this.parseFileList(writesSection);
    
    // Parse guardrails
    definition.guardrails = extractList('Guardrails');

    // Parse specific instructions sections
    definition.instructions = this.parseInstructions(content);

    return definition;
  }

  /**
   * Parse file list from section
   */
  parseFileList(section) {
    const files = [];
    const lines = section.split('\n');
    
    for (const line of lines) {
      // Match markdown file references
      const fileMatch = line.match(/`([^`]+\.(md|json))`/);
      if (fileMatch) {
        files.push(fileMatch[1]);
      }
    }
    
    return files;
  }

  /**
   * Parse instruction sections (Interview Questions, Dimensions, etc.)
   */
  parseInstructions(content) {
    const instructions = {};
    
    // Find all ## headers (level 2)
    const headers = content.match(/^## [^\n]+/gm) || [];
    
    for (const header of headers) {
      const title = header.replace(/^##\s*/, '').trim();
      const regex = new RegExp(`## ${this.escapeRegex(title)}\\n([\\s\\S]*?)(?=\\n##|$)`, 'i');
      const match = content.match(regex);
      
      if (match && !['Role', 'Purpose', 'When to Activate', 'Reads From', 'Writes To', 'Guardrails'].includes(title)) {
        instructions[title] = match[1].trim();
      }
    }
    
    return instructions;
  }

  /**
   * Escape special regex characters
   */
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Execute agent logic based on type
   */
  async execute(inputs = {}) {
    this.log(`Executing agent: ${this.agentName}`);
    
    if (!this.definition) {
      await this.loadDefinition();
    }

    // Store inputs
    this.context = { ...inputs };

    // Read required input files
    const readInputs = await this.readInputFiles();
    this.context.inputFiles = readInputs;

    // Execute based on agent type
    const result = await this.executeByType();

    // Write output files
    if (result.outputs) {
      await this.writeOutputFiles(result.outputs);
    }

    this.log(`Agent execution complete: ${this.agentName}`);
    
    return {
      success: !result.errors || result.errors.length === 0,
      agent: this.agentName,
      context: this.context,
      outputs: result.outputs || {},
      errors: result.errors || [],
      warnings: result.warnings || [],
      executionLog: this.executionLog
    };
  }

  /**
   * Execute based on agent type
   */
  async executeByType() {
    const agentType = this.agentName.toLowerCase();
    
    // Route to specific executor based on agent name
    switch (agentType) {
      case 'intake':
      case 'midi-intake':
        return await this.executeIntake();
      
      case 'global-research':
      case 'midi-global-research':
        return await this.executeResearch();
      
      case 'creative':
      case 'midi-creative':
        return await this.executeCreative();
      
      case 'devil-advocate':
      case 'midi-devil-advocate':
        return await this.executeDevilAdvocate();
      
      case 'evaluator':
      case 'midi-evaluator':
        return await this.executeEvaluator();
      
      default:
        // Generic execution
        return {
          outputs: {},
          warnings: ['Generic execution - no specific executor implemented'],
          errors: []
        };
    }
  }

  /**
   * Read input files defined in agent
   */
  async readInputFiles() {
    const files = {};
    
    for (const inputFile of this.definition.inputs) {
      const filePath = path.join(this.projectPath, inputFile);
      
      if (await fileExists(filePath)) {
        try {
          const content = await fs.readFile(filePath, 'utf8');
          files[inputFile] = content;
          this.log(`Read input file: ${inputFile}`);
        } catch (error) {
          this.log(`Warning: Could not read ${inputFile}: ${error.message}`, 'warning');
        }
      } else {
        this.log(`Warning: Input file not found: ${inputFile}`, 'warning');
      }
    }
    
    return files;
  }

  /**
   * Write output files
   */
  async writeOutputFiles(outputs) {
    for (const [filename, content] of Object.entries(outputs)) {
      const filePath = path.join(this.projectPath, filename);
      const dir = path.dirname(filePath);
      
      try {
        await fs.ensureDir(dir);
        await fs.writeFile(filePath, content, 'utf8');
        this.log(`Wrote output file: ${filename}`);
      } catch (error) {
        this.log(`Error writing ${filename}: ${error.message}`, 'error');
      }
    }
  }

  /**
   * Validate outputs match definition
   */
  async validateOutputs(outputs) {
    const issues = [];
    
    // Check all required outputs are present
    for (const expectedOutput of this.definition.outputs) {
      const hasOutput = Object.keys(outputs).some(
        output => expectedOutput.includes(output) || output.includes(expectedOutput.replace('midi-project/', ''))
      );
      
      if (!hasOutput) {
        issues.push(`Missing expected output: ${expectedOutput}`);
      }
    }
    
    return {
      valid: issues.length === 0,
      issues
    };
  }

  /**
   * Handle agent dependencies
   */
  async checkDependencies() {
    const dependencies = [];
    
    // Check if required input files exist
    for (const inputFile of this.definition.inputs) {
      const filePath = path.join(this.projectPath, inputFile);
      const exists = await fileExists(filePath);
      dependencies.push({ file: inputFile, exists });
    }
    
    return dependencies;
  }

  /**
   * Execute intake agent
   */
  async executeIntake() {
    this.log('Executing intake agent logic...');
    
    // This is a placeholder - actual implementation in IntakeExecutor
    return {
      outputs: {
        'midi-project/USER_CONTEXT.md': this.generateUserContextPlaceholder()
      },
      warnings: ['Using placeholder output - implement full IntakeExecutor'],
      errors: []
    };
  }

  /**
   * Execute research agent
   */
  async executeResearch() {
    this.log('Executing research agent logic...');
    
    return {
      outputs: {
        'midi-project/01_research/global_research.md': this.generateResearchPlaceholder()
      },
      warnings: ['Using placeholder output - implement full ResearchExecutor'],
      errors: []
    };
  }

  /**
   * Execute creative agent
   */
  async executeCreative() {
    this.log('Executing creative agent logic...');
    
    return {
      outputs: {
        'midi-project/IDEA_BACKLOG.md': this.generateIdeasPlaceholder()
      },
      warnings: ['Using placeholder output - implement full CreativeExecutor'],
      errors: []
    };
  }

  /**
   * Execute devil advocate agent
   */
  async executeDevilAdvocate() {
    this.log('Executing devil advocate agent logic...');
    
    return {
      outputs: {
        'midi-project/06_devil_advocate/devil_report.md': this.generateDevilReportPlaceholder()
      },
      warnings: ['Using placeholder output - implement full DevilAdvocateExecutor'],
      errors: []
    };
  }

  /**
   * Execute evaluator agent
   */
  async executeEvaluator() {
    this.log('Executing evaluator agent logic...');
    
    return {
      outputs: {
        'midi-project/04_analysis/evaluator_scorecard.md': this.generateEvaluatorPlaceholder()
      },
      warnings: ['Using placeholder output - implement full EvaluatorExecutor'],
      errors: []
    };
  }

  /**
   * Log execution message
   */
  log(message, level = 'info') {
    this.executionLog.push({
      timestamp: new Date().toISOString(),
      level,
      message
    });
    
    if (level === 'error') {
      logger.error(message);
    } else if (level === 'warning') {
      logger.warning(message);
    } else {
      logger.info(message);
    }
  }

  // Placeholder generators - will be replaced by actual executors

  generateUserContextPlaceholder() {
    return `# USER_CONTEXT

## Información Personal
- **Nombre:** [Por completar]
- **Ubicación:** [Por completar]
- **Fecha de intake:** ${new Date().toISOString().split('T')[0]}

## Idea Inicial
[Por completar tras entrevista]

## Objetivo Principal
[Por completar]

---
*Generado por midi-intake-agent (placeholder)*
`;
  }

  generateResearchPlaceholder() {
    return `# Global Research

## Información del Proyecto
- **Fecha de investigación:** ${new Date().toISOString().split('T')[0]}
- **Fuentes consultadas:** [Por completar]

## 1. Startups Similares
[Por completar tras investigación]

## 2. Tendencias del Sector
[Por completar]

---
*Generado por midi-global-research-agent (placeholder)*
`;
  }

  generateIdeasPlaceholder() {
    return `# IDEA BACKLOG

## Información
- **Fecha de generación:** ${new Date().toISOString().split('T')[0]}
- **Total de ideas:** 0

---
*Generado por midi-creative-agent (placeholder)*
`;
  }

  generateDevilReportPlaceholder() {
    return `# Devil Advocate Report

## Información del Proyecto
- **Fecha de análisis:** ${new Date().toISOString().split('T')[0]}
- **Analista:** midi-devil-advocate-agent

## Crítica por Dimensión
[Por completar]

---
*Generado por midi-devil-advocate-agent (placeholder)*
`;
  }

  generateEvaluatorPlaceholder() {
    return `# Evaluator Scorecard

## Información del Proyecto
- **Fecha de evaluación:** ${new Date().toISOString().split('T')[0]}
- **Evaluador:** midi-evaluator-agent

## Puntaje Total
[Por calcular]

---
*Generado por midi-evaluator-agent (placeholder)*
`;
  }
}

export default AgentExecutor;
