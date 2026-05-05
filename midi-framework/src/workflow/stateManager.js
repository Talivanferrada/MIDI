/**
 * Workflow State Manager
 * Manages PROJECT_STATE.md and workflow state tracking
 */

import fs from 'fs-extra';
import path from 'path';
import { fileExists, readJson, writeJson, writeFile } from '../utils/fileSystem.js';

const STATE_FILE = 'PROJECT_STATE.md';
const MIDI_STATE_FILE = '.midi/state.json';

export class StateManager {
  constructor(projectPath) {
    this.projectPath = projectPath;
    this.state = null;
    this.stateFilePath = path.join(projectPath, STATE_FILE);
    this.midiStatePath = path.join(projectPath, MIDI_STATE_FILE);
  }

  /**
   * Initialize or load existing state
   */
  async initialize() {
    const exists = await fileExists(this.stateFilePath);
    
    if (exists) {
      await this.load();
    } else {
      await this.createInitialState();
    }
    
    return this.state;
  }

  /**
   * Create initial state structure
   */
  async createInitialState() {
    this.state = {
      project: {
        name: '',
        created: new Date().toISOString(),
        updated: new Date().toISOString()
      },
      workflow: {
        currentMode: null,
        currentStage: null,
        completedStages: [],
        stageHistory: [],
        gates: {},
        overrides: {}
      },
      ideas: {
        selected: null,
        top3: [],
        backlog: []
      },
      evaluation: {
        score: null,
        passed: false
      },
      metadata: {
        iterations: 0,
        lastCommand: null,
        startedAt: null
      }
    };
    
    await this.save();
  }

  /**
   * Load state from file
   */
  async load() {
    // Try to load from JSON state first (faster)
    const midiStateExists = await fileExists(this.midiStatePath);
    
    if (midiStateExists) {
      try {
        this.state = await readJson(this.midiStatePath);
        return this.state;
      } catch (error) {
        // Fall through to parsing markdown
      }
    }
    
    // Parse from markdown PROJECT_STATE.md
    const content = await fs.readFile(this.stateFilePath, 'utf8');
    this.state = this.parseMarkdownState(content);
    
    return this.state;
  }

  /**
   * Parse markdown state file into structured object
   */
  parseMarkdownState(content) {
    const state = {
      project: { name: '', created: '', updated: '' },
      workflow: {
        currentMode: null,
        currentStage: null,
        completedStages: [],
        stageHistory: [],
        gates: {},
        overrides: {}
      },
      ideas: { selected: null, top3: [], backlog: [] },
      evaluation: { score: null, passed: false },
      metadata: { iterations: 0, lastCommand: null, startedAt: null }
    };

    // Extract sections using regex
    const sections = {
      name: content.match(/\*\*Name:\*\*\s*(.+)/i)?.[1]?.trim() || '',
      created: content.match(/\*\*Created:\*\*\s*(.+)/i)?.[1]?.trim() || '',
      updated: content.match(/\*\*Updated:\*\*\s*(.+)/i)?.[1]?.trim() || '',
      mode: content.match(/\*\*Mode:\*\*\s*(.+)/i)?.[1]?.trim() || null,
      stage: content.match(/\*\*Stage:\*\*\s*(.+)/i)?.[1]?.trim() || null
    };

    state.project.name = sections.name;
    state.project.created = sections.created;
    state.project.updated = sections.updated;
    state.workflow.currentMode = sections.mode;
    state.workflow.currentStage = sections.stage;

    // Parse selected idea
    const selectedMatch = content.match(/## Selected Idea\n([\s\S]*?)(?=##|$)/i);
    if (selectedMatch && !selectedMatch[1].includes('To be filled')) {
      state.ideas.selected = selectedMatch[1].trim();
    }

    // Parse top 3 ideas
    const top3Match = content.match(/## Top 3 Ideas\n([\s\S]*?)(?=##|$)/i);
    if (top3Match) {
      const ideas = top3Match[1]
        .split('\n')
        .filter(line => line.match(/^\d+\./))
        .map(line => line.replace(/^\d+\.\s*/, '').trim());
      state.ideas.top3 = ideas.filter(i => i && !i.includes('['));
    }

    // Parse pending items as completed stages
    const pendingMatch = content.match(/## Pending Analysis\n([\s\S]*?)(?=##|$)/i);
    if (pendingMatch) {
      const pending = pendingMatch[1]
        .split('\n')
        .filter(line => line.includes('[ ]'))
        .map(line => line.replace(/- \[ \] /, '').trim());
      
      // Completed stages are those NOT in pending
      const allStages = ['market-analysis', 'technical-feasibility', 'financial-analysis', 'legal-tax-analysis'];
      state.workflow.completedStages = allStages.filter(s => !pending.includes(s));
    }

    return state;
  }

  /**
   * Save state to both JSON and markdown files
   */
  async save() {
    this.state.project.updated = new Date().toISOString();
    
    // Save to JSON for fast access
    await writeJson(this.midiStatePath, this.state);
    
    // Also update markdown state file
    await this.updateMarkdownState();
  }

  /**
   * Update the markdown PROJECT_STATE.md file
   */
  async updateMarkdownState() {
    const content = await this.generateMarkdownContent();
    await writeFile(this.stateFilePath, content);
  }

  /**
   * Generate markdown content from state
   */
  generateMarkdownContent() {
    const { project, workflow, ideas, evaluation } = this.state;
    
    return `# PROJECT STATE

## Project Information
- **Name:** ${project.name || '[project_name]'}
- **Created:** ${project.created || '[date]'}
- **Updated:** ${project.updated || '[date]'}

## Current Status
- **Mode:** ${workflow.currentMode || '[exploration|financeable]'}
- **Stage:** ${workflow.currentStage || '[current stage]'}

## Selected Idea
${ideas.selected || '[To be filled after selection]'}

## Top 3 Ideas
${ideas.top3.length > 0 
  ? ideas.top3.map((idea, i) => `${i + 1}. ${idea}`).join('\n')
  : '1. [idea 1]\n2. [idea 2]\n3. [idea 3]'
}

## Key Hypotheses
- [hypothesis 1]
- [hypothesis 2]

## Critical Risks
- [risk 1]
- [risk 2]

## Pending Analysis
${this.generatePendingAnalysis(workflow.completedStages)}

## Next Steps
${this.generateNextSteps(workflow)}

## Workflow History
${this.generateWorkflowHistory(workflow.stageHistory)}

## Evaluation Score
${evaluation.score !== null ? `**Score:** ${evaluation.score}/100` : '[Not evaluated yet]'}
`;
  }

  generatePendingAnalysis(completedStages) {
    const allAnalysis = [
      { id: 'market-analysis', label: 'Market analysis' },
      { id: 'technical-feasibility', label: 'Technical feasibility' },
      { id: 'financial-analysis', label: 'Financial analysis' },
      { id: 'legal-tax-analysis', label: 'Legal/tax analysis' }
    ];

    return allAnalysis
      .map(a => `- [${completedStages.includes(a.id) ? 'x' : ' '}] ${a.label}`)
      .join('\n');
  }

  generateNextSteps(workflow) {
    const steps = [];
    
    if (!workflow.currentMode) {
      steps.push('Run /midi-start to begin');
    } else if (workflow.currentMode === 'exploration') {
      if (!workflow.completedStages.includes('intake')) {
        steps.push('Complete intake with /midi-start');
      } else if (!workflow.completedStages.includes('research')) {
        steps.push('Run /midi-explore for research phase');
      } else if (!workflow.completedStages.includes('top3')) {
        steps.push('Generate Top 3 with /midi-top3');
      } else {
        steps.push('Select idea and transition to /midi-financeable');
      }
    } else if (workflow.currentMode === 'financeable') {
      if (!workflow.completedStages.includes('devil-advocate')) {
        steps.push('Run /midi-devil for devil\'s advocate analysis');
      } else if (!workflow.completedStages.includes('evaluation')) {
        steps.push('Run /midi-evaluate for project evaluation');
      } else {
        steps.push('Generate final document with /midi-final');
      }
    }

    return steps.length > 0 
      ? steps.map((s, i) => `${i + 1}. ${s}`).join('\n')
      : '1. [step 1]\n2. [step 2]';
  }

  generateWorkflowHistory(history) {
    if (history.length === 0) {
      return '_No stages completed yet_';
    }

    return history
      .slice(-10) // Last 10 entries
      .map(h => `- ${h.timestamp}: ${h.stage} (${h.status})`)
      .join('\n');
  }

  /**
   * Set current stage
   */
  async setCurrentStage(stage) {
    this.state.workflow.currentStage = stage;
    await this.save();
  }

  /**
   * Mark stage as completed
   */
  async completeStage(stageName) {
    if (!this.state.workflow.completedStages.includes(stageName)) {
      this.state.workflow.completedStages.push(stageName);
    }
    
    this.state.workflow.stageHistory.push({
      stage: stageName,
      status: 'completed',
      timestamp: new Date().toISOString()
    });
    
    await this.save();
  }

  /**
   * Set current mode (exploration/financeable)
   */
  async setMode(mode) {
    this.state.workflow.currentMode = mode;
    await this.save();
  }

  /**
   * Set selected idea
   */
  async setSelectedIdea(idea) {
    this.state.ideas.selected = idea;
    await this.save();
  }

  /**
   * Set top 3 ideas
   */
  async setTop3Ideas(ideas) {
    this.state.ideas.top3 = ideas;
    await this.save();
  }

  /**
   * Set evaluation score
   */
  async setEvaluationScore(score) {
    this.state.evaluation.score = score;
    this.state.evaluation.passed = score >= 70;
    await this.save();
  }

  /**
   * Record gate decision
   */
  async recordGateDecision(gateId, decision) {
    this.state.workflow.gates[gateId] = {
      decision,
      timestamp: new Date().toISOString()
    };
    await this.save();
  }

  /**
   * Set override for a blocking rule
   */
  async setOverride(overrideKey, value = true) {
    this.state.workflow.overrides[overrideKey] = value;
    await this.save();
  }

  /**
   * Check if stage is completed
   */
  isStageCompleted(stageName) {
    return this.state?.workflow?.completedStages?.includes(stageName) || false;
  }

  /**
   * Check if gate has been passed
   */
  isGatePassed(gateId) {
    return this.state?.workflow?.gates?.[gateId]?.decision === 'approved';
  }

  /**
   * Get current mode
   */
  getCurrentMode() {
    return this.state?.workflow?.currentMode || null;
  }

  /**
   * Get current stage
   */
  getCurrentStage() {
    return this.state?.workflow?.currentStage || null;
  }

  /**
   * Get selected idea
   */
  getSelectedIdea() {
    return this.state?.ideas?.selected || null;
  }

  /**
   * Get evaluation score
   */
  getEvaluationScore() {
    return this.state?.evaluation?.score || null;
  }

  /**
   * Check if there's an override
   */
  hasOverride(overrideKey) {
    return this.state?.workflow?.overrides?.[overrideKey] || false;
  }

  /**
   * Get state snapshot
   */
  getState() {
    return this.state;
  }
}

export default StateManager;
