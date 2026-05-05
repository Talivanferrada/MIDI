/**
 * MIDI Run Command
 * Starts the workflow executor
 */

import chalk from 'chalk';
import inquirer from 'inquirer';
import { logger } from './logger.js';
import { WorkflowExecutor } from '../workflow/executor.js';

export default async function run(options) {
  const workflowName = options.workflow || 'full-midi';
  const projectPath = process.cwd();

  logger.title('🎹 MIDI Workflow Executor');

  try {
    // Create and initialize executor
    const executor = new WorkflowExecutor(projectPath);
    await executor.initialize();

    // Validate project
    const validation = await executor.validateProject();
    if (!validation.valid) {
      logger.error('Project validation failed:');
      validation.issues.forEach(issue => logger.error(`  • ${issue}`));
      console.log(chalk.yellow('\nRun `midi init` first to set up the project.'));
      process.exit(1);
    }

    // Load workflow
    await executor.loadWorkflow(workflowName);

    // Display status
    executor.displayStatus();

    // Get available workflows for selection if not specified
    if (!options.workflow) {
      const workflows = executor.getAvailableWorkflows();
      console.log(chalk.cyan('\nAvailable workflows:'));
      workflows.forEach(w => {
        console.log(`  • ${w.id}: ${w.name} - ${w.description}`);
      });
      console.log(chalk.gray('\nUse --workflow <name> to select a specific workflow.'));
    }

    // Run workflow
    const result = await executor.run(workflowName);

    if (result.complete) {
      logger.success('🎉 Workflow complete!');
      console.log(chalk.green('\nAll stages have been completed successfully.'));
      return;
    }

    if (result.blocked) {
      logger.error('Workflow blocked:');
      if (result.missing) {
        result.missing.forEach(m => logger.error(`  • ${m}`));
      }
      process.exit(1);
    }

    if (result.nextStage) {
      console.log(chalk.cyan('\n📋 Next step:'));
      console.log(chalk.white(`  Stage: ${result.nextStage.name}`));
      console.log(chalk.white(`  Command: ${result.nextStage.command}`));
      
      if (result.gate) {
        console.log(chalk.yellow('\n⚠️  Gate pending:'));
        console.log(chalk.white(`  Question: ${result.gate.question}`));
      }
    }

  } catch (error) {
    logger.error(`Failed to run workflow: ${error.message}`);
    if (options.verbose) {
      console.error(error);
    }
    process.exit(1);
  }
}

/**
 * Handle workflow status command
 */
export async function status(options) {
  const projectPath = process.cwd();

  try {
    const executor = new WorkflowExecutor(projectPath);
    await executor.initialize();

    const validation = await executor.validateProject();
    if (!validation.valid) {
      logger.error('Project validation failed:');
      validation.issues.forEach(issue => logger.error(`  • ${issue}`));
      process.exit(1);
    }

    executor.displayStatus();

    // Show completed stages
    const status = executor.getStatus();
    if (status.completedStages.length > 0) {
      console.log(chalk.green('\n✓ Completed stages:'));
      status.completedStages.forEach(stage => {
        console.log(`  • ${stage}`);
      });
    }

    // Check blocking rules for final document
    console.log(chalk.cyan('\n📋 Blocking rules check (final document):'));
    const blockingResult = await executor.checkBlockingRules('final_document');
    
    if (blockingResult.blocked) {
      console.log(chalk.red('  ❌ Blocked - requirements not met'));
    } else {
      console.log(chalk.green('  ✓ All requirements met'));
    }

  } catch (error) {
    logger.error(`Failed to get status: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Reset workflow state
 */
export async function reset(options) {
  const projectPath = process.cwd();
  
  const { confirm } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message: 'This will reset all workflow progress. Continue?',
    default: false
  }]);

  if (!confirm) {
    console.log(chalk.yellow('Reset cancelled.'));
    return;
  }

  try {
    const executor = new WorkflowExecutor(projectPath);
    await executor.initialize();
    await executor.reset();
    logger.success('Workflow state has been reset.');
  } catch (error) {
    logger.error(`Failed to reset: ${error.message}`);
    process.exit(1);
  }
}
