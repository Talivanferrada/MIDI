/**
 * Workflow CLI Commands
 * MIDI workflow commands for the CLI
 */

import path from 'path';
import { WorkflowExecutor, STAGES, STAGE_NAMES } from '../workflow/executor.js';
import { ProgressDisplay } from './progress.js';
import { 
  selectIdeaPrompt, 
  continueToFinanceablePrompt,
  selectModePrompt,
  getFundingDetailsPrompt,
} from './workflowPrompts.js';
import { logger } from './logger.js';
import { fileExists } from '../utils/fileSystem.js';
import chalk from 'chalk';

/**
 * Check if MIDI is initialized in current directory
 */
async function checkMIDIInitialized() {
  const cwd = process.cwd();
  const midiDir = path.join(cwd, '.midi');
  const configFile = path.join(midiDir, 'config', 'midi.config.json');
  
  const isInitialized = await fileExists(midiDir) && await fileExists(configFile);
  
  if (!isInitialized) {
    console.log(chalk.yellow('\n⚠️  MIDI is not initialized in this directory.'));
    console.log(chalk.gray('Run `midi init` first to initialize MIDI framework.\n'));
    return false;
  }
  
  return true;
}

/**
 * Start full MIDI workflow
 */
export async function start(options) {
  const isInitialized = await checkMIDIInitialized();
  if (!isInitialized) {
    process.exit(1);
  }

  const workflow = new WorkflowExecutor(process.cwd());
  const progress = new ProgressDisplay();

  try {
    // Initialize the executor
    await workflow.initialize();

    // Set up event listeners
    setupEventListeners(workflow, progress);

    // If no specific mode provided, ask user
    if (!options.explore && !options.financeable) {
      const mode = await selectModePrompt();
      
      if (mode === 'exploration') {
        await explore(options);
        return;
      } else if (mode === 'financeable') {
        await financeable(options);
        return;
      }
    }

    logger.title('🎹 MIDI Workflow - Full Mode');
    progress.showWorkflowStart('full');

    // Run exploration
    await workflow.runExploration();
    
    // Show ideas and let user select
    progress.showIdeasList(workflow.ideas.slice(0, 3));
    const ideaId = await selectIdeaPrompt(workflow.ideas.slice(0, 3));
    workflow.selectIdea(ideaId);

    // Ask if user wants to continue
    const shouldContinue = await continueToFinanceablePrompt(workflow.selectedIdea);
    
    if (shouldContinue) {
      // Get funding details
      const fundingDetails = await getFundingDetailsPrompt();
      workflow.config.funding = fundingDetails;
      
      // Run financeable mode
      await workflow.runFinanceable();
      progress.showWorkflowComplete('full', workflow.context);
    } else {
      progress.showWorkflowComplete('exploration', workflow.context);
    }

  } catch (error) {
    progress.showError(error, workflow.currentStage);
    process.exit(1);
  }
}

/**
 * Run exploration mode only
 */
export async function explore(options) {
  const isInitialized = await checkMIDIInitialized();
  if (!isInitialized) {
    process.exit(1);
  }

  const workflow = new WorkflowExecutor(process.cwd());
  const progress = new ProgressDisplay();

  try {
    // Initialize the executor
    await workflow.initialize();
    
    setupEventListeners(workflow, progress);

    logger.title('🎹 MIDI Workflow - Exploration Mode');
    progress.showWorkflowStart('exploration');

    // Run exploration
    await workflow.runExploration();

    // Show ideas
    progress.showIdeasList(workflow.ideas.slice(0, 3));

    // If in interactive mode, let user select an idea
    if (!options.nonInteractive) {
      const ideaId = await selectIdeaPrompt(workflow.ideas.slice(0, 3));
      workflow.selectIdea(ideaId);

      // Ask what to do next
      const shouldContinue = await continueToFinanceablePrompt(workflow.selectedIdea);
      
      if (shouldContinue) {
        progress.showWorkflowComplete('exploration', workflow.context);
        console.log(chalk.cyan('\nRun `midi financeable` to continue with this idea.'));
        return;
      }
    }

    progress.showWorkflowComplete('exploration', workflow.context);

  } catch (error) {
    progress.showError(error, workflow.currentStage);
    process.exit(1);
  }
}

/**
 * Run financeable mode only
 */
export async function financeable(options) {
  const isInitialized = await checkMIDIInitialized();
  if (!isInitialized) {
    process.exit(1);
  }

  const workflow = new WorkflowExecutor(process.cwd());
  const progress = new ProgressDisplay();

  try {
    // Initialize the executor
    await workflow.initialize();
    
    setupEventListeners(workflow, progress);

    logger.title('🎹 MIDI Workflow - Financeable Mode');
    
    // Check if idea is provided
    if (!options.idea && !options.ideaId && !workflow.selectedIdea) {
      // No idea provided, need to get one
      console.log(chalk.yellow('\nNo idea selected. Options:'));
      console.log(chalk.gray('  1. Run `midi explore` first to generate ideas'));
      console.log(chalk.gray('  2. Provide an idea with --idea option'));
      console.log();
      
      if (!options.nonInteractive) {
        // Ask if user wants to run exploration first
        const inquirer = await import('inquirer');
        const { runExplore } = await inquirer.default.prompt([
          {
            type: 'confirm',
            name: 'runExplore',
            message: 'Do you want to run exploration mode first?',
            default: true,
          },
        ]);

        if (runExplore) {
          await explore(options);
          return;
        }
      }
      
      throw new Error('No idea selected. Run `midi explore` first or provide --idea option.');
    }

    // Set the selected idea
    if (options.ideaId) {
      workflow.selectIdea(parseInt(options.ideaId));
    } else if (options.idea) {
      // Use provided idea
      workflow.selectedIdea = {
        id: 0,
        title: options.idea,
        description: options.description || 'User-provided idea',
        score: 0,
      };
    }

    progress.showWorkflowStart('financeable');

    // Get funding details if not provided
    if (!options.fundingType) {
      const fundingDetails = await getFundingDetailsPrompt();
      workflow.config.funding = fundingDetails;
    } else {
      workflow.config.funding = {
        fundingType: options.fundingType,
        requestedAmount: options.amount || 50000,
      };
    }

    // Run financeable mode
    await workflow.runFinanceable();

    progress.showWorkflowComplete('financeable', workflow.context);

  } catch (error) {
    progress.showError(error, workflow.currentStage);
    process.exit(1);
  }
}

/**
 * Set up event listeners for workflow
 */
function setupEventListeners(workflow, progress) {
  workflow.on('workflow:start', ({ mode }) => {
    progress.showWorkflowStart(mode);
  });

  workflow.on('workflow:complete', ({ mode }) => {
    // Handled in individual commands
  });

  workflow.on('workflow:error', ({ error, stage }) => {
    progress.showError(error, stage);
  });

  workflow.on('stage:start', ({ stage }) => {
    progress.showStageStart(stage, STAGE_NAMES[stage]);
  });

  workflow.on('stage:progress', ({ stage, message }) => {
    progress.showStageProgress(stage, message);
  });

  workflow.on('stage:complete', ({ stage, result }) => {
    progress.showStageComplete(stage, result);
  });

  workflow.on('ideas:ready', ({ ideas }) => {
    progress.showIdeasList(ideas);
  });

  workflow.on('idea:selected', ({ idea }) => {
    console.log(chalk.green(`\n✓ Selected: ${idea.title}`));
  });

  workflow.on('gate:question', async ({ question, context, resolve }) => {
    progress.showGateQuestion(question, context);
    const inquirer = await import('inquirer');
    const { answer } = await inquirer.default.prompt([
      {
        type: 'confirm',
        name: 'answer',
        message: question,
        default: false,
      },
    ]);
    resolve(answer);
  });

  workflow.on('override:confirm', async ({ recommendation, reason, resolve }) => {
    progress.showOverrideConfirmation(recommendation, reason);
    const inquirer = await import('inquirer');
    const { confirm } = await inquirer.default.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Override this recommendation?',
        default: false,
      },
    ]);
    resolve(confirm);
  });
}

export default {
  start,
  explore,
  financeable,
};
