/**
 * Stage Validator
 * Validates file quality, blocking rules, and prerequisites
 */

import fs from 'fs-extra';
import path from 'path';
import { fileExists, readJson } from '../utils/fileSystem.js';

export class StageValidator {
  constructor(projectPath, config = {}) {
    this.projectPath = projectPath;
    this.config = config;
    this.agentRouting = null;
    this.qualityRequirements = null;
  }

  /**
   * Initialize validator with routing config
   */
  async initialize() {
    const routingPath = path.join(this.projectPath, '.midi', 'config', 'agent-routing.json');
    
    if (await fileExists(routingPath)) {
      this.agentRouting = await readJson(routingPath);
      this.qualityRequirements = this.agentRouting?.file_quality_requirements?.requirements || {};
    }
    
    return this;
  }

  /**
   * Validate a file meets quality requirements
   */
  async validateFileQuality(filePath, fileType) {
    const requirements = this.qualityRequirements[fileType] || {};
    const fullPath = path.join(this.projectPath, filePath);
    
    const result = {
      valid: true,
      errors: [],
      warnings: [],
      details: {}
    };

    // Check file exists
    if (!(await fileExists(fullPath))) {
      result.valid = false;
      result.errors.push(`File does not exist: ${filePath}`);
      return result;
    }

    const content = await fs.readFile(fullPath, 'utf8');
    const lines = content.split('\n').filter(l => l.trim().length > 0);
    
    result.details.lines = lines.length;
    result.details.path = filePath;

    // Check minimum lines
    if (requirements.min_lines) {
      if (lines.length < requirements.min_lines) {
        result.valid = false;
        result.errors.push(
          `File has ${lines.length} lines, minimum required: ${requirements.min_lines}`
        );
      }
    }

    // Check required sections
    if (requirements.required_sections) {
      for (const section of requirements.required_sections) {
        const sectionRegex = new RegExp(`##\\s*${section}`, 'i');
        if (!sectionRegex.test(content)) {
          result.warnings.push(`Missing recommended section: ${section}`);
        }
      }
    }

    // Check required markers (like [SUPUESTO])
    if (requirements.required_markers) {
      for (const marker of requirements.required_markers) {
        const markerRegex = new RegExp(`\\[${marker}\\]`, 'g');
        const matches = content.match(markerRegex) || [];
        if (matches.length === 0) {
          result.warnings.push(`No [${marker}] markers found`);
        }
      }
    }

    // Check required patterns
    if (requirements.required_patterns) {
      for (const pattern of requirements.required_patterns) {
        const patternRegex = new RegExp(pattern);
        if (!patternRegex.test(content)) {
          result.warnings.push(`Missing expected pattern: ${pattern}`);
        }
      }
    }

    return result;
  }

  /**
   * Check blocking rules for a target (e.g., 'final_document', 'financeable_mode')
   */
  async checkBlockingRules(target, stateManager) {
    const blockingRules = this.agentRouting?.blocking_rules?.[target];
    
    if (!blockingRules) {
      return { blocked: false, reason: 'No blocking rules defined' };
    }

    const result = {
      blocked: false,
      errors: [],
      warnings: [],
      passed: [],
      details: []
    };

    for (const requirement of blockingRules.requirements || []) {
      const checkResult = await this.validateRequirement(requirement, stateManager);
      
      result.details.push({
        check: requirement.check,
        passed: checkResult.passed,
        error: checkResult.error
      });

      if (!checkResult.passed) {
        // Check for override
        if (requirement.check === 'evaluation_above_70_or_override') {
          if (stateManager.hasOverride('user_override_low_score')) {
            result.warnings.push(`Override active for: ${requirement.check}`);
            result.passed.push(requirement.check);
            continue;
          }
        }
        
        result.blocked = true;
        result.errors.push(requirement.error || `Failed: ${requirement.check}`);
      } else {
        result.passed.push(requirement.check);
      }
    }

    return result;
  }

  /**
   * Validate a single requirement
   */
  async validateRequirement(requirement, stateManager) {
    const { validate, check } = requirement;
    
    if (!validate) {
      return { passed: true };
    }

    switch (validate.type) {
      case 'composite':
        return await this.validateComposite(validate.conditions, stateManager);
      
      case 'state_field':
        return this.validateStateField(validate, stateManager);
      
      case 'state_field_range_or_override':
        return this.validateStateFieldRangeOrOverride(validate, stateManager);
      
      case 'conditional':
        return await this.validateConditional(validate, stateManager);
      
      default:
        return { passed: true };
    }
  }

  /**
   * Validate composite conditions (all must pass)
   */
  async validateComposite(conditions, stateManager) {
    for (const condition of conditions) {
      const result = await this.validateSingleCondition(condition, stateManager);
      if (!result.passed) {
        return result;
      }
    }
    return { passed: true };
  }

  /**
   * Validate a single condition
   */
  async validateSingleCondition(condition, stateManager) {
    // file_exists check
    if (condition.file_exists) {
      const filePath = path.join(this.projectPath, condition.file_exists);
      const exists = await fileExists(filePath);
      if (!exists) {
        return { passed: false, error: `File missing: ${condition.file_exists}` };
      }
    }

    // file_min_lines check
    if (condition.file_min_lines) {
      const filePath = path.join(this.projectPath, condition.file);
      if (await fileExists(filePath)) {
        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.split('\n').filter(l => l.trim().length > 0);
        if (lines.length < condition.file_min_lines) {
          return {
            passed: false,
            error: `${condition.file} has only ${lines.length} lines (min: ${condition.file_min_lines})`
          };
        }
      }
    }

    // file_contains check
    if (condition.file_contains) {
      const filePath = path.join(this.projectPath, condition.file);
      if (await fileExists(filePath)) {
        const content = await fs.readFile(filePath, 'utf8');
        const pattern = new RegExp(condition.file_contains);
        if (!pattern.test(content)) {
          return {
            passed: false,
            error: `${condition.file} missing required content: ${condition.file_contains}`
          };
        }
      }
    }

    // file_contains_pattern check
    if (condition.file_contains_pattern) {
      const filePath = path.join(this.projectPath, condition.file);
      if (await fileExists(filePath)) {
        const content = await fs.readFile(filePath, 'utf8');
        const pattern = new RegExp(condition.file_contains_pattern);
        if (!pattern.test(content)) {
          return {
            passed: false,
            error: `${condition.file} missing pattern: ${condition.file_contains_pattern}`
          };
        }
      }
    }

    return { passed: true };
  }

  /**
   * Validate state field
   */
  validateStateField(validate, stateManager) {
    const { field, value } = validate;
    const stateValue = this.getStateValue(field, stateManager);
    
    if (value !== undefined && stateValue !== value) {
      return {
        passed: false,
        error: `State field '${field}' is '${stateValue}', expected '${value}'`
      };
    }
    
    return { passed: true };
  }

  /**
   * Validate state field range with override
   */
  validateStateFieldRangeOrOverride(validate, stateManager) {
    const { field, min, override_field } = validate;
    const value = this.getStateValue(field, stateManager);
    
    // Check override first
    if (stateManager.hasOverride(override_field)) {
      return { passed: true };
    }
    
    // Check range
    if (typeof value === 'number' && value < min) {
      return {
        passed: false,
        error: `${field} is ${value}, minimum is ${min} (or set override)`
      };
    }
    
    return { passed: true };
  }

  /**
   * Validate conditional requirement
   */
  async validateConditional(validate, stateManager) {
    // Check if condition applies
    const conditionMet = this.evaluateCondition(validate.condition, stateManager);
    
    if (conditionMet) {
      // Apply 'then' validation
      if (validate.then) {
        if (validate.then.file_exists) {
          const filePath = path.join(this.projectPath, validate.then.file_exists);
          const exists = await fileExists(filePath);
          if (!exists) {
            return {
              passed: false,
              error: `Conditional requirement: ${validate.then.file_exists} not found`
            };
          }
        }
        if (validate.then.file_min_lines) {
          const filePath = path.join(this.projectPath, validate.then.file_exists || validate.then.file);
          if (await fileExists(filePath)) {
            const content = await fs.readFile(filePath, 'utf8');
            const lines = content.split('\n').filter(l => l.trim().length > 0);
            if (lines.length < validate.then.file_min_lines) {
              return {
                passed: false,
                error: `Conditional file has insufficient lines (${lines.length} < ${validate.then.file_min_lines})`
              };
            }
          }
        }
      }
    }
    
    return { passed: true };
  }

  /**
   * Evaluate a condition string
   */
  evaluateCondition(condition, stateManager) {
    if (!condition) return false;
    
    const state = stateManager.getState();
    
    // Simple conditions based on state
    if (condition.includes("sector in ['health'")) {
      const sector = state?.project?.sector;
      return ['health', 'food', 'finance', 'tourism', 'education'].includes(sector);
    }
    
    if (condition.includes('permits_required')) {
      return state?.project?.permits_required || false;
    }
    
    if (condition.includes('company_formation')) {
      return state?.project?.company_formation || false;
    }
    
    return false;
  }

  /**
   * Get state value by path
   */
  getStateValue(field, stateManager) {
    const state = stateManager.getState();
    const fieldMap = {
      'idea_selected': !!state?.ideas?.selected,
      'evaluation_score': state?.evaluation?.score,
      'user_override_low_score': state?.workflow?.overrides?.user_override_low_score
    };
    
    return fieldMap[field];
  }

  /**
   * Check if prerequisites for a stage are met
   */
  async checkPrerequisites(stageName, stateManager) {
    const activationRules = this.agentRouting?.activation_rules || {};
    const stage = activationRules[stageName];
    
    if (!stage) {
      return { met: true, missing: [] };
    }

    const missing = [];
    
    // Check mode
    const currentMode = stateManager.getCurrentMode();
    if (stage.mode && stage.mode !== currentMode) {
      missing.push(`Wrong mode: need '${stage.mode}', currently '${currentMode}'`);
    }

    // Check prerequisites if defined
    if (stage.prerequisites) {
      for (const prereq of stage.prerequisites) {
        const prereqMet = await this.checkSinglePrerequisite(prereq, stateManager);
        if (!prereqMet) {
          missing.push(`Missing prerequisite: ${prereq}`);
        }
      }
    }

    return {
      met: missing.length === 0,
      missing
    };
  }

  /**
   * Check a single prerequisite
   */
  async checkSinglePrerequisite(prereq, stateManager) {
    switch (prereq) {
      case 'devil_advocate_run':
        return stateManager.isStageCompleted('devil-advocate');
      
      case 'evaluation_complete':
        return stateManager.getEvaluationScore() !== null;
      
      case 'all_analysis_files_exist':
        return await this.checkAnalysisFilesExist();
      
      case 'idea_selected':
        return !!stateManager.getSelectedIdea();
      
      default:
        return true;
    }
  }

  /**
   * Check if all analysis files exist
   */
  async checkAnalysisFilesExist() {
    const requiredFiles = [
      '05_analysis/market_analysis.md',
      '05_analysis/financial_analysis.md',
      '08_canvas/business_model_canvas.md'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(this.projectPath, file);
      if (!(await fileExists(filePath))) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get validation summary for display
   */
  getValidationSummary(result) {
    const lines = [];
    
    if (result.blocked) {
      lines.push('❌ BLOCKED - The following requirements are not met:');
      result.errors.forEach(e => lines.push(`   • ${e}`));
    } else {
      lines.push('✅ PASSED - All requirements met');
    }

    if (result.warnings?.length > 0) {
      lines.push('⚠️  Warnings:');
      result.warnings.forEach(w => lines.push(`   • ${w}`));
    }

    return lines.join('\n');
  }
}

export default StageValidator;
