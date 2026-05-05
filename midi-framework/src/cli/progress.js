/**
 * CLI Progress Display
 * Shows progress bars, spinners, and status messages for MIDI workflow
 */

import chalk from 'chalk';
import ora from 'ora';

export class ProgressDisplay {
  constructor() {
    this.spinner = null;
    this.completedStages = new Set();
    this.currentStage = null;
  }

  /**
   * Show workflow start message
   */
  showWorkflowStart(mode) {
    console.log();
    console.log(chalk.cyan.bold('🎹 MIDI Workflow Starting'));
    console.log(chalk.gray(`Mode: ${mode}`));
    console.log();
  }

  /**
   * Show workflow complete message
   */
  showWorkflowComplete(mode, context) {
    this.stopSpinner();
    console.log();
    console.log(chalk.green.bold('✅ MIDI Workflow Complete!'));
    console.log();
    
    if (context.ideas) {
      console.log(chalk.white(`Ideas generated: ${context.ideas.length}`));
    }
    if (context.selectedIdea) {
      console.log(chalk.white(`Selected idea: ${context.selectedIdea.title}`));
    }
    if (context.financeable) {
      console.log(chalk.white(`Funding proposal ready for: ${context.financeable.idea.title}`));
    }
    console.log();
  }

  /**
   * Show stage start
   */
  showStageStart(stage, stageName) {
    this.currentStage = stage;
    const icon = this.completedStages.has(stage) ? '✓' : '○';
    console.log(chalk.cyan(`\n${icon} ${stageName}`));
  }

  /**
   * Show stage progress with spinner
   */
  showStageProgress(stage, message) {
    if (this.spinner) {
      this.spinner.text = message;
    } else {
      this.spinner = ora(message).start();
    }
  }

  /**
   * Show stage complete
   */
  showStageComplete(stage, result) {
    this.stopSpinner();
    this.completedStages.add(stage);
    console.log(chalk.green(`  ✓ Stage complete`));
    
    if (result) {
      if (result.ideasCount) {
        console.log(chalk.gray(`    Generated ${result.ideasCount} ideas`));
      }
      if (result.businessModel) {
        console.log(chalk.gray(`    Business model: ${result.businessModel.revenue}`));
      }
    }
  }

  /**
   * Show workflow error
   */
  showError(error, stage) {
    this.stopSpinner();
    console.log();
    console.log(chalk.red.bold('✗ Error in workflow'));
    console.log(chalk.red(`  Stage: ${stage || 'unknown'}`));
    console.log(chalk.red(`  Message: ${error.message}`));
    console.log();
  }

  /**
   * Show blocking message
   */
  showBlockingMessage(message) {
    this.stopSpinner();
    console.log();
    console.log(chalk.yellow.bold('⏸ Blocked'));
    console.log(chalk.yellow(`  ${message}`));
    console.log();
  }

  /**
   * Show ideas list for selection
   */
  showIdeasList(ideas) {
    this.stopSpinner();
    console.log();
    console.log(chalk.cyan.bold('💡 Top Ideas Generated'));
    console.log(chalk.gray('─'.repeat(50)));
    
    ideas.forEach((idea, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
      console.log();
      console.log(`${medal} ${chalk.bold(idea.title)} (Score: ${chalk.green(idea.score)})`);
      console.log(chalk.gray(`   ${idea.description}`));
      console.log(chalk.green(`   Strengths: ${idea.strengths.join(', ')}`));
      console.log(chalk.yellow(`   Challenges: ${idea.challenges.join(', ')}`));
    });
    
    console.log();
  }

  /**
   * Show overall progress bar
   */
  showOverallProgress(current, total, stage) {
    const percentage = Math.round((current / total) * 100);
    const filled = Math.round((percentage / 100) * 20);
    const empty = 20 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    
    console.log(chalk.gray(`\nProgress: [${chalk.cyan(bar)}] ${percentage}% - ${stage}`));
  }

  /**
   * Stop spinner if running
   */
  stopSpinner() {
    if (this.spinner) {
      this.spinner.stop();
      this.spinner = null;
    }
  }

  /**
   * Show gate question
   */
  showGateQuestion(question, context) {
    this.stopSpinner();
    console.log();
    console.log(chalk.yellow.bold('⚡ Gate Question'));
    console.log(chalk.gray(`Context: ${context}`));
    console.log(chalk.white(`Question: ${question}`));
    console.log();
  }

  /**
   * Show override confirmation
   */
  showOverrideConfirmation(recommendation, reason) {
    this.stopSpinner();
    console.log();
    console.log(chalk.yellow.bold('⚠️ Override Confirmation'));
    console.log(chalk.gray(`Recommendation: ${recommendation}`));
    console.log(chalk.gray(`Reason for override: ${reason}`));
    console.log();
  }

  /**
   * Show summary of completed stages
   */
  showSummary() {
    console.log();
    console.log(chalk.cyan.bold('📊 Workflow Summary'));
    console.log(chalk.gray('─'.repeat(50)));
    
    const allStages = ['Exploration', 'Idea Selection', 'Financeable', 'Complete'];
    allStages.forEach((stage, index) => {
      const completed = this.completedStages.has(index.toString());
      const icon = completed ? '✓' : '○';
      const color = completed ? chalk.green : chalk.gray;
      console.log(color(`  ${icon} ${stage}`));
    });
    
    console.log();
  }
}

export default ProgressDisplay;
