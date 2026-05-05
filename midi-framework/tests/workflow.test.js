/**
 * Tests for MIDI Workflow Commands
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { WorkflowExecutor, STAGES } from '../src/workflow/executor.js';
import { ProgressDisplay } from '../src/cli/progress.js';
import fs from 'fs-extra';
import path from 'path';

// Mock fs-extra
vi.mock('fs-extra', () => ({
  default: {
    pathExists: vi.fn().mockResolvedValue(true),
    readFile: vi.fn().mockResolvedValue(''),
    readJson: vi.fn().mockResolvedValue({}),
    ensureDir: vi.fn().mockResolvedValue(undefined),
    writeJson: vi.fn().mockResolvedValue(undefined),
    writeFile: vi.fn().mockResolvedValue(undefined),
    copy: vi.fn().mockResolvedValue(undefined),
  },
  pathExists: vi.fn().mockResolvedValue(true),
  readFile: vi.fn().mockResolvedValue(''),
  readJson: vi.fn().mockResolvedValue({}),
  ensureDir: vi.fn().mockResolvedValue(undefined),
  writeJson: vi.fn().mockResolvedValue(undefined),
  writeFile: vi.fn().mockResolvedValue(undefined),
  copy: vi.fn().mockResolvedValue(undefined),
}));

// Mock inquirer
vi.mock('inquirer', () => ({
  default: {
    prompt: vi.fn().mockResolvedValue({ mode: 'full', ideaId: 1, continue: true }),
  },
}));

// Mock ora
vi.mock('ora', () => ({
  default: vi.fn(() => ({
    start: vi.fn().mockReturnThis(),
    stop: vi.fn().mockReturnThis(),
    text: '',
  })),
}));

describe('WorkflowExecutor', () => {
  let workflow;
  let tempDir;

  beforeEach(async () => {
    vi.clearAllMocks();
    tempDir = '/tmp/test-midi-project';
    workflow = new WorkflowExecutor(tempDir);
    
    // Mock initialize to return basic state
    workflow.stateManager = {
      initialize: vi.fn().mockResolvedValue(undefined),
      getState: vi.fn().mockReturnValue({
        workflow: {
          currentMode: null,
          currentStage: null,
          completedStages: [],
        },
        ideas: {
          top3: [],
          selected: null,
        },
        evaluation: {
          score: null,
        },
      }),
      setCurrentStage: vi.fn().mockResolvedValue(undefined),
      completeStage: vi.fn().mockResolvedValue(undefined),
      recordGateDecision: vi.fn().mockResolvedValue(undefined),
      createInitialState: vi.fn().mockResolvedValue(undefined),
    };
    
    workflow.validator = {
      initialize: vi.fn().mockResolvedValue(undefined),
      checkPrerequisites: vi.fn().mockResolvedValue({ met: true, missing: [] }),
      checkBlockingRules: vi.fn().mockResolvedValue({ blocked: false, errors: [] }),
    };
  });

  afterEach(() => {
    workflow.removeAllListeners();
  });

  describe('constructor', () => {
    it('should initialize with project path', () => {
      expect(workflow.projectPath).toBe(tempDir);
      expect(workflow.currentStage).toBeNull();
      expect(workflow.completedStages).toEqual([]);
      expect(workflow.ideas).toEqual([]);
      expect(workflow.selectedIdea).toBeNull();
    });

    it('should accept config options', () => {
      const config = { funding: { type: 'corfo-semilla' } };
      const wf = new WorkflowExecutor(tempDir, config);
      expect(wf.config).toEqual(config);
    });
  });

  describe('runExploration', () => {
    it('should emit stage:start event', async () => {
      const startHandler = vi.fn();
      workflow.on('stage:start', startHandler);

      await workflow.runExploration();

      expect(startHandler).toHaveBeenCalledWith({ stage: STAGES.EXPLORATION });
    });

    it('should emit stage:progress events', async () => {
      const progressHandler = vi.fn();
      workflow.on('stage:progress', progressHandler);

      await workflow.runExploration();

      expect(progressHandler).toHaveBeenCalled();
    });

    it('should emit stage:complete event', async () => {
      const completeHandler = vi.fn();
      workflow.on('stage:complete', completeHandler);

      await workflow.runExploration();

      expect(completeHandler).toHaveBeenCalledWith({
        stage: STAGES.EXPLORATION,
        result: { ideasCount: 3 },
      });
    });

    it('should generate 3 ideas', async () => {
      await workflow.runExploration();
      expect(workflow.ideas).toHaveLength(3);
    });

    it('should generate ideas with required fields', async () => {
      await workflow.runExploration();

      workflow.ideas.forEach(idea => {
        expect(idea).toHaveProperty('id');
        expect(idea).toHaveProperty('title');
        expect(idea).toHaveProperty('description');
        expect(idea).toHaveProperty('score');
        expect(idea).toHaveProperty('strengths');
        expect(idea).toHaveProperty('challenges');
      });
    });

    it('should add exploration to completed stages', async () => {
      await workflow.runExploration();
      expect(workflow.completedStages).toContain(STAGES.EXPLORATION);
    });
  });

  describe('runIdeaSelection', () => {
    beforeEach(async () => {
      await workflow.runExploration();
    });

    it('should emit stage:start event', async () => {
      const startHandler = vi.fn();
      workflow.on('stage:start', startHandler);

      await workflow.runIdeaSelection();

      expect(startHandler).toHaveBeenCalledWith({ stage: STAGES.IDEA_SELECTION });
    });

    it('should emit ideas:ready event', async () => {
      const readyHandler = vi.fn();
      workflow.on('ideas:ready', readyHandler);

      await workflow.runIdeaSelection();

      expect(readyHandler).toHaveBeenCalled();
      const { ideas } = readyHandler.mock.calls[0][0];
      expect(ideas).toHaveLength(3);
    });

    it('should sort ideas by score', async () => {
      const readyHandler = vi.fn();
      workflow.on('ideas:ready', readyHandler);

      await workflow.runIdeaSelection();

      const { ideas } = readyHandler.mock.calls[0][0];
      expect(ideas[0].score).toBeGreaterThanOrEqual(ideas[1].score);
      expect(ideas[1].score).toBeGreaterThanOrEqual(ideas[2].score);
    });

    it('should throw error when no ideas available', async () => {
      workflow.ideas = [];
      await expect(workflow.runIdeaSelection()).rejects.toThrow('No ideas available');
    });
  });

  describe('selectIdea', () => {
    beforeEach(async () => {
      await workflow.runExploration();
    });

    it('should select an idea by ID', () => {
      const idea = workflow.selectIdea(1);
      expect(idea.id).toBe(1);
      expect(workflow.selectedIdea).toBe(idea);
    });

    it('should throw error for invalid ID', () => {
      expect(() => workflow.selectIdea(999)).toThrow('Idea with ID 999 not found');
    });

    it('should emit idea:selected event', () => {
      const selectHandler = vi.fn();
      workflow.on('idea:selected', selectHandler);

      const idea = workflow.selectIdea(1);

      expect(selectHandler).toHaveBeenCalledWith({ idea });
    });
  });

  describe('runFinanceable', () => {
    beforeEach(async () => {
      await workflow.runExploration();
      workflow.selectIdea(workflow.ideas[0].id);
    });

    it('should emit stage:start event', async () => {
      const startHandler = vi.fn();
      workflow.on('stage:start', startHandler);

      await workflow.runFinanceable();

      expect(startHandler).toHaveBeenCalledWith({ stage: STAGES.FINANCEABLE });
    });

    it('should emit stage:progress events', async () => {
      const progressHandler = vi.fn();
      workflow.on('stage:progress', progressHandler);

      await workflow.runFinanceable();

      expect(progressHandler).toHaveBeenCalled();
    });

    it('should emit stage:complete event', async () => {
      const completeHandler = vi.fn();
      workflow.on('stage:complete', completeHandler);

      await workflow.runFinanceable();

      expect(completeHandler).toHaveBeenCalled();
    });

    it('should create financeable context', async () => {
      await workflow.runFinanceable();

      expect(workflow.context.financeable).toBeDefined();
      expect(workflow.context.financeable.idea).toBe(workflow.selectedIdea);
      expect(workflow.context.financeable.businessModel).toBeDefined();
      expect(workflow.context.financeable.marketAnalysis).toBeDefined();
      expect(workflow.context.financeable.fundingProposal).toBeDefined();
    });

    it('should throw error when no idea selected', async () => {
      workflow.selectedIdea = null;
      await expect(workflow.runFinanceable()).rejects.toThrow('No idea selected');
    });
  });

  describe('startFull', () => {
    it('should emit workflow:start event with mode full', async () => {
      const startHandler = vi.fn();
      workflow.on('workflow:start', startHandler);
      
      // Mock loadWorkflow to set workflow
      workflow.loadWorkflow = vi.fn().mockImplementation(async () => {
        workflow.workflow = {
          name: 'Full MIDI',
          description: 'Test',
          stages: [],
        };
        return workflow.workflow;
      });

      await workflow.startFull();

      expect(startHandler).toHaveBeenCalledWith({ mode: 'full' });
    });
  });

  describe('startExploration', () => {
    it('should emit workflow:start event with mode exploration', async () => {
      const startHandler = vi.fn();
      workflow.on('workflow:start', startHandler);

      workflow.loadWorkflow = vi.fn().mockImplementation(async () => {
        workflow.workflow = {
          name: 'Exploration',
          description: 'Test',
          stages: [],
        };
        return workflow.workflow;
      });

      await workflow.startExploration();

      expect(startHandler).toHaveBeenCalledWith({ mode: 'exploration' });
    });
  });

  describe('startFinanceable', () => {
    it('should throw error when no idea selected', async () => {
      await expect(workflow.startFinanceable()).rejects.toThrow('No idea selected');
    });

    it('should emit workflow:error when no idea selected', async () => {
      const errorHandler = vi.fn();
      workflow.on('workflow:error', errorHandler);

      await expect(workflow.startFinanceable()).rejects.toThrow();

      expect(errorHandler).toHaveBeenCalled();
    });
  });
});

describe('ProgressDisplay', () => {
  let progress;
  let consoleSpy;

  beforeEach(() => {
    progress = new ProgressDisplay();
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    progress.stopSpinner();
  });

  describe('showWorkflowStart', () => {
    it('should display workflow start message', () => {
      progress.showWorkflowStart('full');

      expect(consoleSpy).toHaveBeenCalled();
      const output = consoleSpy.mock.calls.map(c => c[0]).join(' ');
      expect(output).toContain('MIDI Workflow Starting');
      expect(output).toContain('Mode: full');
    });
  });

  describe('showWorkflowComplete', () => {
    it('should display workflow complete message', () => {
      progress.showWorkflowComplete('full', {});

      expect(consoleSpy).toHaveBeenCalled();
      const output = consoleSpy.mock.calls.map(c => c[0]).join(' ');
      expect(output).toContain('MIDI Workflow Complete');
    });

    it('should show ideas count when available', () => {
      progress.showWorkflowComplete('exploration', { ideas: [1, 2, 3] });

      const output = consoleSpy.mock.calls.map(c => c[0]).join(' ');
      expect(output).toContain('Ideas generated');
    });

    it('should show selected idea when available', () => {
      progress.showWorkflowComplete('financeable', {
        selectedIdea: { title: 'Test Idea' },
      });

      const output = consoleSpy.mock.calls.map(c => c[0]).join(' ');
      expect(output).toContain('Selected idea');
    });
  });

  describe('showStageStart', () => {
    it('should display stage start message', () => {
      progress.showStageStart(STAGES.EXPLORATION, 'Exploration Mode');

      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('showStageComplete', () => {
    it('should mark stage as complete', () => {
      progress.showStageComplete(STAGES.EXPLORATION, { ideasCount: 3 });

      expect(progress.completedStages.has(STAGES.EXPLORATION)).toBe(true);
    });
  });

  describe('showIdeasList', () => {
    it('should display formatted ideas list', () => {
      const ideas = [
        { id: 1, title: 'Idea 1', description: 'Desc 1', score: 85, strengths: ['S1'], challenges: ['C1'] },
        { id: 2, title: 'Idea 2', description: 'Desc 2', score: 80, strengths: ['S2'], challenges: ['C2'] },
        { id: 3, title: 'Idea 3', description: 'Desc 3', score: 75, strengths: ['S3'], challenges: ['C3'] },
      ];

      progress.showIdeasList(ideas);

      expect(consoleSpy).toHaveBeenCalled();
      const output = consoleSpy.mock.calls.map(c => c[0]).join(' ');
      expect(output).toContain('Top Ideas Generated');
      expect(output).toContain('Idea 1');
      expect(output).toContain('Idea 2');
      expect(output).toContain('Idea 3');
    });
  });

  describe('showError', () => {
    it('should display error message', () => {
      const error = new Error('Test error');
      progress.showError(error, STAGES.EXPLORATION);

      expect(consoleSpy).toHaveBeenCalled();
      const output = consoleSpy.mock.calls.map(c => c[0]).join(' ');
      expect(output).toContain('Error in workflow');
      expect(output).toContain('Test error');
    });
  });

  describe('showBlockingMessage', () => {
    it('should display blocking message', () => {
      progress.showBlockingMessage('Waiting for user input');

      expect(consoleSpy).toHaveBeenCalled();
      const output = consoleSpy.mock.calls.map(c => c[0]).join(' ');
      expect(output).toContain('Blocked');
      expect(output).toContain('Waiting for user input');
    });
  });
});

describe('CLI Integration', () => {
  it('should export start function', async () => {
    const { start } = await import('../src/cli/workflow.js');
    expect(typeof start).toBe('function');
  });

  it('should export explore function', async () => {
    const { explore } = await import('../src/cli/workflow.js');
    expect(typeof explore).toBe('function');
  });

  it('should export financeable function', async () => {
    const { financeable } = await import('../src/cli/workflow.js');
    expect(typeof financeable).toBe('function');
  });
});
