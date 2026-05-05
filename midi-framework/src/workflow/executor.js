/**
 * Workflow Executor
 * Main orchestrator for MIDI workflow execution
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { EventEmitter } from 'events';
import { fileExists, readJson, ensureDir } from '../utils/fileSystem.js';
import { logger } from '../cli/logger.js';
import { StateManager } from './stateManager.js';
import { StageValidator } from './stageValidator.js';
import { IterationTracker } from './iterationTracker.js';

// Import agent executors
import { AgentExecutor } from '../agents/agentExecutor.js';
import { executeIntake } from '../agents/intakeExecutor.js';
import { executeResearch } from '../agents/researchExecutor.js';
import { executeCreative } from '../agents/creativeExecutor.js';
import { executeDevilAdvocate } from '../agents/devilAdvocateExecutor.js';
import { executeEvaluator } from '../agents/evaluatorExecutor.js';

export const STAGES = {
  EXPLORATION: 'exploration',
  IDEA_SELECTION: 'idea-selection',
  FINANCEABLE: 'financeable',
  COMPLETE: 'complete',
};

export const STAGE_NAMES = {
  [STAGES.EXPLORATION]: 'Exploration Mode',
  [STAGES.IDEA_SELECTION]: 'Idea Selection',
  [STAGES.FINANCEABLE]: 'Financeable Mode',
  [STAGES.COMPLETE]: 'Complete',
};

export class WorkflowExecutor extends EventEmitter {
  constructor(projectPath, config = {}) {
    super();
    this.projectPath = projectPath || process.cwd();
    this.config = config;
    this.stateManager = new StateManager(this.projectPath);
    this.validator = new StageValidator(this.projectPath);
    this.iterationTracker = new IterationTracker(this.projectPath);
    this.workflow = null;
    this.workflowConfig = null;
    this.workflowsDir = path.join(this.projectPath, '.midi', 'workflows');
    this.configDir = path.join(this.projectPath, '.midi', 'config');
    
    // Legacy support for event-based usage
    this.currentStage = null;
    this.completedStages = [];
    this.ideas = [];
    this.selectedIdea = null;
    this.context = {};
  }

  /**
   * Initialize the executor
   */
  async initialize() {
    await this.stateManager.initialize();
    await this.validator.initialize();
    await this.loadWorkflowConfig();
    await this.iterationTracker.load();
    
    // Sync with state manager
    const state = this.stateManager.getState();
    this.completedStages = state.workflow.completedStages;
    this.selectedIdea = state.ideas.selected;
    this.ideas = state.ideas.top3;
    
    return this;
  }

  /**
   * Load workflow configuration
   */
  async loadWorkflowConfig() {
    const configPath = path.join(this.configDir, 'workflow-config.json');
    
    if (await fileExists(configPath)) {
      this.workflowConfig = await readJson(configPath);
    } else {
      this.workflowConfig = this.getDefaultConfig();
    }
    
    return this.workflowConfig;
  }

  /**
   * Get default workflow configuration
   */
  getDefaultConfig() {
    return {
      workflows: {
        'full-midi': {
          name: 'Full MIDI',
          description: 'Complete workflow: Exploration + Financeable',
          file: 'full-midi.workflow.md'
        },
        'exploration': {
          name: 'Exploration Mode',
          description: 'Generate and evaluate ideas',
          file: 'exploration.workflow.md'
        },
        'financeable': {
          name: 'Financeable Mode',
          description: 'Deep analysis of selected idea',
          file: 'financeable.workflow.md'
        }
      },
      stages: {
        'intake': {
          name: 'Intake',
          command: '/midi-start',
          mode: 'exploration',
          required: true
        },
        'research': {
          name: 'Research',
          command: '/midi-explore',
          mode: 'exploration',
          required: true
        },
        'top3': {
          name: 'Top 3 Selection',
          command: '/midi-top3',
          mode: 'exploration',
          required: true
        },
        'devil-advocate': {
          name: "Devil's Advocate",
          command: '/midi-devil',
          mode: 'financeable',
          required: true
        },
        'evaluation': {
          name: 'Evaluation',
          command: '/midi-evaluate',
          mode: 'financeable',
          required: true
        },
        'final': {
          name: 'Final Document',
          command: '/midi-final',
          mode: 'financeable',
          required: true
        }
      },
      fileQualityRequirements: {
        intake_output: { minLines: 30, requiredSections: ['Contexto', 'Recursos', 'Objetivos'] },
        research_output: { minLines: 80, requiredSections: ['Tendencias', 'Referentes'] },
        analysis_output: { minLines: 100, requiredSections: ['Análisis', 'Conclusiones'] },
        financial_output: { minLines: 150, requiredSections: ['Inversión', 'Costos', 'Ingresos'] },
        devil_report: { minLines: 100, requiredSections: ['Crítica', 'Veredicto'] },
        evaluation_output: { minLines: 80, requiredSections: ['Puntaje', 'Recomendación'] },
        final_document: { minLines: 500, requiredSections: ['Resumen Ejecutivo', 'Supuestos'] }
      },
      gates: {
        gate_context: { after: 'intake', question: '¿El contexto es suficiente?' },
        gate_top3: { after: 'top3', question: '¿Cuál idea deseas desarrollar?' },
        gate_devil: { after: 'devil-advocate', question: '¿Continuar después del devil advocate?' },
        gate_evaluation: { after: 'evaluation', question: '¿El puntaje es aceptable?' }
      }
    };
  }

  /**
   * Load a specific workflow definition
   */
  async loadWorkflow(workflowName) {
    const workflowInfo = this.workflowConfig?.workflows?.[workflowName];
    
    if (!workflowInfo) {
      throw new Error(`Workflow not found: ${workflowName}`);
    }

    const workflowPath = path.join(this.workflowsDir, workflowInfo.file);
    
    if (await fileExists(workflowPath)) {
      const content = await fs.readFile(workflowPath, 'utf8');
      this.workflow = this.parseWorkflowMarkdown(content, workflowInfo);
      return this.workflow;
    }

    // Use workflow info from config
    this.workflow = {
      name: workflowInfo.name,
      description: workflowInfo.description,
      stages: this.getStagesForWorkflow(workflowName),
      gates: this.workflowConfig.gates || {}
    };
    
    return this.workflow;
  }

  /**
   * Parse workflow markdown file
   */
  parseWorkflowMarkdown(content, info) {
    return {
      name: info.name,
      description: info.description,
      stages: this.extractStagesFromMarkdown(content),
      gates: this.extractGatesFromMarkdown(content),
      rawContent: content
    };
  }

  /**
   * Extract stages from markdown
   */
  extractStagesFromMarkdown(content) {
    const stages = [];
    const commandRegex = /\/midi-(\w+)/g;
    let match;
    
    while ((match = commandRegex.exec(content)) !== null) {
      const commandName = match[1];
      if (!stages.find(s => s.command === `midi-${commandName}`)) {
        stages.push({
          name: this.formatStageName(commandName),
          command: `/midi-${commandName}`,
          id: commandName
        });
      }
    }

    return stages;
  }

  /**
   * Extract gates from markdown
   */
  extractGatesFromMarkdown(content) {
    const gates = [];
    const gateRegex = /\[GATE\s*(\d+):?\s*([^\]]+)\]/g;
    let match;

    while ((match = gateRegex.exec(content)) !== null) {
      gates.push({
        id: `gate_${match[1]}`,
        number: parseInt(match[1]),
        question: match[2].trim()
      });
    }

    return gates;
  }

  /**
   * Format stage name from command
   */
  formatStageName(command) {
    const names = {
      'start': 'Intake',
      'explore': 'Research',
      'top3': 'Top 3 Selection',
      'financeable': 'Financeable Mode',
      'devil': "Devil's Advocate",
      'canvas': 'Business Canvas',
      'evaluate': 'Evaluation',
      'final': 'Final Document'
    };
    
    return names[command] || command.charAt(0).toUpperCase() + command.slice(1);
  }

  /**
   * Get stages for a workflow type
   */
  getStagesForWorkflow(workflowName) {
    const stageMap = {
      'full-midi': ['intake', 'research', 'top3', 'financeable', 'devil-advocate', 'evaluation', 'final'],
      'exploration': ['intake', 'research', 'top3'],
      'financeable': ['devil-advocate', 'evaluation', 'final']
    };

    const stageIds = stageMap[workflowName] || stageMap['full-midi'];
    
    return stageIds.map(id => ({
      id,
      name: this.workflowConfig.stages?.[id]?.name || this.formatStageName(id),
      command: this.workflowConfig.stages?.[id]?.command || `/midi-${id}`,
      mode: this.workflowConfig.stages?.[id]?.mode
    }));
  }

  /**
   * Execute a specific stage
   */
  async executeStage(stageName) {
    logger.title(`Executing Stage: ${stageName}`);

    // Get stage definition
    const stage = this.workflow?.stages?.find(s => s.id === stageName || s.name === stageName);
    
    if (!stage) {
      throw new Error(`Stage not found: ${stageName}`);
    }

    // Check prerequisites
    const prereqResult = await this.validator.checkPrerequisites(stage.id, this.stateManager);
    if (!prereqResult.met) {
      logger.error('Prerequisites not met:');
      prereqResult.missing.forEach(m => logger.error(`  • ${m}`));
      return { success: false, reason: 'prerequisites_not_met', missing: prereqResult.missing };
    }

    // Set current stage
    await this.stateManager.setCurrentStage(stage.id);
    this.currentStage = stage.id;
    
    logger.info(`Stage: ${stage.name}`);
    logger.info(`Command: ${stage.command}`);

    // Emit event for listeners
    this.emit('stage:start', { stage: stage.id, name: stage.name });

    return {
      success: true,
      stage,
      message: `Ready to execute: ${stage.command}`,
      command: stage.command
    };
  }

  /**
   * Mark a stage as completed
   */
  async completeStage(stageName) {
    await this.stateManager.completeStage(stageName);
    this.completedStages.push(stageName);
    
    logger.success(`Stage completed: ${stageName}`);
    this.emit('stage:complete', { stage: stageName });
    
    // Record iteration in decision log
    await this.recordStageIteration(stageName);
    
    // Check if gate follows
    const gate = this.findGateAfterStage(stageName);
    if (gate) {
      return {
        completed: true,
        gate: gate,
        message: `Stage completed. Gate awaiting: ${gate.question}`
      };
    }

    return { completed: true };
  }

  /**
   * Record iteration for a completed stage
   */
  async recordStageIteration(stageName) {
    const stageConfig = this.workflowConfig?.stages?.[stageName];
    const agentMap = {
      'intake': 'intake-agent',
      'research': 'global-research-agent',
      'top3': 'insight-agent',
      'devil-advocate': 'devil-advocate-agent',
      'evaluation': 'evaluator-agent',
      'final': 'writer-agent'
    };

    const agentName = agentMap[stageName] || stageName;
    const stage = this.workflow?.stages?.find(s => s.id === stageName);
    const mode = stage?.mode || 'exploration';

    try {
      await this.iterationTracker.recordIteration({
        decision: `Stage ${stageName} completed`,
        agent: agentName,
        stage: mode === 'financeable' ? 'financiable' : 'exploración',
        title: stage?.name || stageName,
        context: `Automated workflow stage: ${stageName}`,
        justification: 'Stage prerequisites met and execution successful',
        impact: 'Progress to next workflow stage'
      });
    } catch (error) {
      logger.warning(`Could not record iteration: ${error.message}`);
    }
  }

  /**
   * Find gate that follows a stage
   */
  findGateAfterStage(stageName) {
    const gates = this.workflow?.gates || this.workflowConfig?.gates || {};
    
    for (const [gateId, gate] of Object.entries(gates)) {
      if (gate.after === stageName) {
        return { ...gate, id: gateId };
      }
    }
    
    return null;
  }

  /**
   * Check all blocking rules
   */
  async checkBlockingRules(target = 'final_document') {
    logger.info(`Checking blocking rules for: ${target}`);
    
    const result = await this.validator.checkBlockingRules(target, this.stateManager);
    
    if (result.blocked) {
      logger.error('Blocking rules NOT passed:');
      result.errors.forEach(e => logger.error(`  • ${e}`));
    } else {
      logger.success('All blocking rules passed');
    }

    if (result.warnings?.length > 0) {
      result.warnings.forEach(w => logger.warning(w));
    }

    return result;
  }

  /**
   * Trigger and handle a gate
   */
  async triggerGate(gateId) {
    const gate = this.workflow?.gates?.[gateId] || this.workflowConfig?.gates?.[gateId];
    
    if (!gate) {
      throw new Error(`Gate not found: ${gateId}`);
    }

    logger.subtitle(`Gate: ${gate.question}`);
    
    // Return gate info for human decision
    return {
      gateId,
      question: gate.question,
      options: gate.options || ['continue', 'review', 'abort'],
      requiresHuman: true
    };
  }

  /**
   * Process gate decision
   */
  async processGateDecision(gateId, decision) {
    await this.stateManager.recordGateDecision(gateId, decision);
    
    if (decision === 'approved' || decision === 'continue') {
      logger.success(`Gate ${gateId} passed with decision: ${decision}`);
      return { passed: true, decision };
    }

    logger.warning(`Gate ${gateId} decision: ${decision}`);
    return { passed: false, decision };
  }

  /**
   * Run the complete workflow
   */
  async run(workflowName = 'full-midi') {
    logger.title('🎹 MIDI Workflow Executor');

    // Load workflow
    await this.loadWorkflow(workflowName);
    logger.info(`Workflow: ${this.workflow.name}`);
    logger.info(`Description: ${this.workflow.description}`);

    // Get current state
    const currentState = this.stateManager.getState();
    const completedStages = currentState.workflow.completedStages;

    logger.info(`Mode: ${currentState.workflow.currentMode || 'Not set'}`);
    logger.info(`Completed stages: ${completedStages.length}`);

    // Find next stage
    const nextStage = this.findNextStage(completedStages);
    
    if (!nextStage) {
      logger.success('Workflow complete! All stages finished.');
      this.emit('workflow:complete', { mode: workflowName });
      return { complete: true };
    }

    logger.step(nextStage.index + 1, this.workflow.stages.length, nextStage.name);
    
    // Execute stage
    const result = await this.executeStage(nextStage.id);
    
    if (!result.success) {
      return { blocked: true, reason: result.reason, missing: result.missing };
    }

    return {
      nextStage: result.stage,
      command: result.command,
      message: result.message
    };
  }

  /**
   * Find the next uncompleted stage
   */
  findNextStage(completedStages) {
    const stages = this.workflow?.stages || [];
    
    for (let i = 0; i < stages.length; i++) {
      if (!completedStages.includes(stages[i].id)) {
        return { ...stages[i], index: i };
      }
    }
    
    return null;
  }

  // ============================================================
  // Legacy Event-Based Methods (for backward compatibility)
  // ============================================================

  /**
   * Start the full MIDI workflow (legacy)
   */
  async startFull() {
    this.emit('workflow:start', { mode: 'full' });
    await this.run('full-midi');
    this.emit('workflow:complete', { mode: 'full' });
    return this.context;
  }

  /**
   * Run exploration mode only (legacy)
   */
  async startExploration() {
    this.emit('workflow:start', { mode: 'exploration' });
    await this.run('exploration');
    this.emit('workflow:complete', { mode: 'exploration' });
    return this.context;
  }

  /**
   * Run financeable mode only (legacy)
   */
  async startFinanceable() {
    if (!this.selectedIdea) {
      const error = new Error('No idea selected. Run exploration mode first or provide an idea.');
      this.emit('workflow:error', { error, stage: STAGES.FINANCEABLE });
      throw error;
    }
    
    this.emit('workflow:start', { mode: 'financeable' });
    await this.run('financeable');
    this.emit('workflow:complete', { mode: 'financeable' });
    return this.context;
  }

  /**
   * Run exploration stage (legacy)
   */
  async runExploration() {
    this.currentStage = STAGES.EXPLORATION;
    this.emit('stage:start', { stage: STAGES.EXPLORATION });
    
    this.emit('stage:progress', { 
      stage: STAGES.EXPLORATION, 
      message: 'Analyzing market opportunities...' 
    });
    
    // Generate placeholder ideas
    this.ideas = [
      {
        id: 1,
        title: 'SaaS Platform for SME Digitalization',
        description: 'A low-code platform enabling small businesses to digitize operations',
        score: 85,
        strengths: ['High market demand', 'Recurring revenue', 'Scalable'],
        challenges: ['High competition', 'Requires onboarding support'],
      },
      {
        id: 2,
        title: 'AI-powered Customer Service Bot',
        description: 'Intelligent chatbot for customer support automation',
        score: 78,
        strengths: ['AI trending', 'Cost reduction', 'Easy to demo'],
        challenges: ['Requires training data', 'Integration complexity'],
      },
      {
        id: 3,
        title: 'Sustainable Packaging Marketplace',
        description: 'B2B marketplace connecting suppliers with eco-friendly packaging',
        score: 72,
        strengths: ['Sustainability focus', 'Growing market', 'CORFO alignment'],
        challenges: ['Logistics complexity', 'Supplier network needed'],
      },
    ];
    
    this.context.ideas = this.ideas;
    this.completedStages.push(STAGES.EXPLORATION);
    this.emit('stage:complete', { 
      stage: STAGES.EXPLORATION, 
      result: { ideasCount: this.ideas.length } 
    });
  }

  /**
   * Run idea selection stage (legacy)
   */
  async runIdeaSelection() {
    this.currentStage = STAGES.IDEA_SELECTION;
    this.emit('stage:start', { stage: STAGES.IDEA_SELECTION });
    
    if (this.ideas.length === 0) {
      const error = new Error('No ideas available for selection');
      this.emit('workflow:error', { error, stage: STAGES.IDEA_SELECTION });
      throw error;
    }
    
    this.emit('stage:progress', { 
      stage: STAGES.IDEA_SELECTION, 
      message: 'Presenting top ideas for selection...' 
    });
    
    const topIdeas = this.ideas
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    
    this.emit('ideas:ready', { ideas: topIdeas });
    this.completedStages.push(STAGES.IDEA_SELECTION);
  }

  /**
   * Select an idea (legacy)
   */
  selectIdea(ideaId) {
    const idea = this.ideas.find(i => i.id === ideaId);
    if (!idea) {
      throw new Error(`Idea with ID ${ideaId} not found`);
    }
    this.selectedIdea = idea;
    this.context.selectedIdea = idea;
    this.emit('idea:selected', { idea });
    return idea;
  }

  /**
   * Run financeable mode (legacy)
   */
  async runFinanceable() {
    this.currentStage = STAGES.FINANCEABLE;
    this.emit('stage:start', { stage: STAGES.FINANCEABLE });
    
    if (!this.selectedIdea) {
      const error = new Error('No idea selected for financeable mode');
      this.emit('workflow:error', { error, stage: STAGES.FINANCEABLE });
      throw error;
    }
    
    const financeableStages = [
      'Validating problem-solution fit',
      'Analyzing market size',
      'Building business model',
      'Preparing financial projections',
      'Generating funding proposal',
    ];
    
    for (const stageMsg of financeableStages) {
      this.emit('stage:progress', { 
        stage: STAGES.FINANCEABLE, 
        message: stageMsg 
      });
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    this.context.financeable = {
      idea: this.selectedIdea,
      businessModel: { revenue: 'SaaS subscription', pricing: '$49-199/month' },
      marketAnalysis: { tam: '$2B', sam: '$500M', som: '$50M' },
      fundingProposal: { requested: '$150,000', useOfFunds: 'Product development, marketing' },
    };
    
    this.completedStages.push(STAGES.FINANCEABLE);
    this.emit('stage:complete', { 
      stage: STAGES.FINANCEABLE, 
      result: this.context.financeable 
    });
  }

  // ============================================================
  // Utility Methods
  // ============================================================

  /**
   * Get workflow status
   */
  getStatus() {
    const state = this.stateManager.getState();
    const completedStages = state.workflow.completedStages;
    const allStages = this.workflow?.stages || [];
    
    return {
      mode: state.workflow.currentMode,
      currentStage: state.workflow.currentStage,
      completedStages,
      totalStages: allStages.length,
      progress: allStages.length > 0 
        ? Math.round((completedStages.length / allStages.length) * 100) 
        : 0,
      nextStage: this.findNextStage(completedStages)?.name || 'Complete',
      ideaSelected: !!state.ideas.selected,
      evaluationScore: state.evaluation.score
    };
  }

  /**
   * Display current workflow status
   */
  displayStatus() {
    const status = this.getStatus();
    
    logger.title('📊 Workflow Status');
    console.log(`Mode: ${chalk.cyan(status.mode || 'Not set')}`);
    console.log(`Current Stage: ${chalk.cyan(status.currentStage || 'None')}`);
    console.log(`Progress: ${chalk.green(status.progress + '%')} (${status.completedStages.length}/${status.totalStages})`);
    console.log(`Next Step: ${chalk.yellow(status.nextStage)}`);
    
    if (status.ideaSelected) {
      console.log(`Idea Selected: ${chalk.green('Yes')}`);
    }
    
    if (status.evaluationScore !== null) {
      const scoreColor = status.evaluationScore >= 70 ? chalk.green : chalk.red;
      console.log(`Evaluation Score: ${scoreColor(status.evaluationScore + '/100')}`);
    }
    
    return status;
  }

  /**
   * Reset workflow state
   */
  async reset() {
    await this.stateManager.createInitialState();
    this.completedStages = [];
    this.selectedIdea = null;
    this.ideas = [];
    this.context = {};
    logger.success('Workflow state reset');
    return { reset: true };
  }

  /**
   * Get available workflows
   */
  getAvailableWorkflows() {
    return Object.entries(this.workflowConfig?.workflows || {}).map(([key, value]) => ({
      id: key,
      name: value.name,
      description: value.description
    }));
  }

  /**
   * Validate project is ready for workflow
   */
  async validateProject() {
    const issues = [];
    
    const requiredDirs = ['.midi', '.midi/config', 'midi-project'];
    for (const dir of requiredDirs) {
      const dirPath = path.join(this.projectPath, dir);
      if (!(await fileExists(dirPath))) {
        issues.push(`Missing directory: ${dir}`);
      }
    }

    const requiredFiles = [
      '.midi/config/agent-routing.json',
      '.midi/config/midi.config.json',
      'midi-project/PROJECT_STATE.md'
    ];
    for (const file of requiredFiles) {
      const filePath = path.join(this.projectPath, file);
      if (!(await fileExists(filePath))) {
        issues.push(`Missing file: ${file}`);
      }
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  /**
   * Record a custom iteration (for agent-specific decisions)
   */
  async recordIteration(data) {
    return await this.iterationTracker.recordIteration(data);
  }

  /**
   * Get iteration metrics
   */
  async getIterationMetrics() {
    return await this.iterationTracker.getMetrics();
  }

  /**
   * Detect decision patterns
   */
  async detectPatterns() {
    return await this.iterationTracker.detectPatterns();
  }

  /**
   * Export decision log
   */
  async exportDecisionLog(format = 'json') {
    return await this.iterationTracker.export(format);
  }

  /**
   * Revert an iteration
   */
  async revertIteration(iterationId, reason) {
    return await this.iterationTracker.revertIteration(iterationId, reason);
  }

  /**
   * Check if a gate question should be asked (legacy)
   */
  async askGateQuestion(question, context) {
    return new Promise((resolve) => {
      this.emit('gate:question', { question, context, resolve });
    });
  }

  /**
   * Check if user wants to override a recommendation (legacy)
   */
  async confirmOverride(recommendation, reason) {
    return new Promise((resolve) => {
      this.emit('override:confirm', { recommendation, reason, resolve });
    });
  }

  // ============================================================
  // Agent Execution Methods
  // ============================================================

  /**
   * Execute intake agent
   */
  async executeIntakeAgent(answers = {}) {
    logger.title('🎹 Executing Intake Agent');
    
    try {
      const result = await executeIntake({
        projectPath: this.projectPath,
        answers
      });
      
      if (result.success) {
        await this.stateManager.completeStage('intake');
        this.emit('agent:complete', { agent: 'intake', result });
      }
      
      return result;
    } catch (error) {
      logger.error(`Intake agent failed: ${error.message}`);
      this.emit('agent:error', { agent: 'intake', error });
      throw error;
    }
  }

  /**
   * Execute research agent
   */
  async executeResearchAgent(options = {}) {
    logger.title('🔍 Executing Research Agent');
    
    try {
      const result = await executeResearch({
        projectPath: this.projectPath,
        webAccess: options.webAccess || false,
        userInput: options.userInput || {}
      });
      
      if (result.success) {
        await this.stateManager.completeStage('research');
        this.emit('agent:complete', { agent: 'research', result });
      }
      
      return result;
    } catch (error) {
      logger.error(`Research agent failed: ${error.message}`);
      this.emit('agent:error', { agent: 'research', error });
      throw error;
    }
  }

  /**
   * Execute creative agent
   */
  async executeCreativeAgent(options = {}) {
    logger.title('💡 Executing Creative Agent');
    
    try {
      const result = await executeCreative({
        projectPath: this.projectPath,
        minIdeas: options.minIdeas || 10,
        maxIdeas: options.maxIdeas || 15
      });
      
      if (result.success) {
        await this.stateManager.completeStage('creative');
        this.emit('agent:complete', { agent: 'creative', result });
        
        // Store generated ideas
        if (result.ideas) {
          this.ideas = result.ideas;
          await this.stateManager.setTop3Ideas(result.ideas.slice(0, 3).map(i => i.title));
        }
      }
      
      return result;
    } catch (error) {
      logger.error(`Creative agent failed: ${error.message}`);
      this.emit('agent:error', { agent: 'creative', error });
      throw error;
    }
  }

  /**
   * Execute devil advocate agent
   */
  async executeDevilAdvocateAgent() {
    logger.title('😈 Executing Devil Advocate Agent');
    
    try {
      const result = await executeDevilAdvocate({
        projectPath: this.projectPath
      });
      
      if (result.success) {
        await this.stateManager.completeStage('devil-advocate');
        this.emit('agent:complete', { agent: 'devil-advocate', result });
        
        // Check verdict
        if (result.verdict === 'DESCARTAR') {
          logger.warning('Devil advocate recommends discarding the idea');
          this.emit('agent:warning', { agent: 'devil-advocate', verdict: result.verdict });
        }
      }
      
      return result;
    } catch (error) {
      logger.error(`Devil advocate agent failed: ${error.message}`);
      this.emit('agent:error', { agent: 'devil-advocate', error });
      throw error;
    }
  }

  /**
   * Execute evaluator agent
   */
  async executeEvaluatorAgent() {
    logger.title('📊 Executing Evaluator Agent');
    
    try {
      const result = await executeEvaluator({
        projectPath: this.projectPath
      });
      
      if (result.success) {
        await this.stateManager.completeStage('evaluation');
        await this.stateManager.setEvaluationScore(result.score);
        this.emit('agent:complete', { agent: 'evaluator', result });
        
        // Log score
        const scoreColor = result.score >= 70 ? chalk.green : chalk.red;
        console.log(`\n${chalk.bold('Final Score:')}`, scoreColor(`${result.score}/100`));
        console.log(`${chalk.bold('Classification:')}`, scoreColor(result.classification));
        
        // Check if passed
        if (result.score < 70) {
          logger.warning('Score below threshold (70). Iteration recommended.');
          this.emit('agent:warning', { agent: 'evaluator', score: result.score });
        }
      }
      
      return result;
    } catch (error) {
      logger.error(`Evaluator agent failed: ${error.message}`);
      this.emit('agent:error', { agent: 'evaluator', error });
      throw error;
    }
  }

  /**
   * Execute any agent by name
   */
  async executeAgent(agentName, options = {}) {
    const agentMap = {
      'intake': () => this.executeIntakeAgent(options.answers),
      'research': () => this.executeResearchAgent(options),
      'creative': () => this.executeCreativeAgent(options),
      'devil-advocate': () => this.executeDevilAdvocateAgent(),
      'evaluator': () => this.executeEvaluatorAgent()
    };
    
    const executor = agentMap[agentName];
    
    if (!executor) {
      throw new Error(`Unknown agent: ${agentName}`);
    }
    
    return await executor();
  }

  /**
   * Run multiple agents in sequence
   */
  async runAgentSequence(agents, options = {}) {
    const results = [];
    
    for (const agentName of agents) {
      logger.info(`Running agent: ${agentName}`);
      
      try {
        const result = await this.executeAgent(agentName, options[agentName] || {});
        results.push({ agent: agentName, result });
        
        // Stop if agent failed
        if (!result.success) {
          logger.error(`Agent ${agentName} failed, stopping sequence`);
          break;
        }
      } catch (error) {
        results.push({ agent: agentName, error: error.message });
        break;
      }
    }
    
    return results;
  }
}

export default WorkflowExecutor;
