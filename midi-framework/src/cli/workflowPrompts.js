/**
 * Workflow Prompts
 * Handles interactive prompts for MIDI workflow decisions
 */

import inquirer from 'inquirer';
import chalk from 'chalk';

/**
 * Ask user to select an idea from the top 3
 */
export async function selectIdeaPrompt(ideas) {
  console.log(chalk.cyan('\n💡 Select an idea to develop:\n'));
  
  const choices = ideas.map((idea, index) => {
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
    return {
      name: `${medal} ${idea.title} (Score: ${idea.score})`,
      value: idea.id,
      short: idea.title,
    };
  });

  const { ideaId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'ideaId',
      message: 'Which idea do you want to develop?',
      choices,
      pageSize: 10,
    },
  ]);

  return ideaId;
}

/**
 * Ask gate question
 */
export async function askGateQuestion(question, context) {
  console.log(chalk.yellow('\n⚡ Gate Question'));
  console.log(chalk.gray(`Context: ${context}\n`));

  const { answer } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'answer',
      message: question,
      default: false,
    },
  ]);

  return answer;
}

/**
 * Ask user to confirm an override
 */
export async function confirmOverridePrompt(recommendation, reason) {
  console.log(chalk.yellow('\n⚠️  Override Confirmation'));
  console.log(chalk.gray(`Recommendation: ${recommendation}`));
  console.log(chalk.gray(`Reason: ${reason}\n`));

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Do you want to override the recommendation?',
      default: false,
    },
  ]);

  return confirm;
}

/**
 * Ask which mode to run
 */
export async function selectModePrompt() {
  const { mode } = await inquirer.prompt([
    {
      type: 'list',
      name: 'mode',
      message: 'Which MIDI mode do you want to run?',
      choices: [
        { name: 'Full Workflow (Exploration + Financeable)', value: 'full' },
        { name: 'Exploration Mode Only', value: 'exploration' },
        { name: 'Financeable Mode Only', value: 'financeable' },
      ],
      default: 'full',
    },
  ]);

  return mode;
}

/**
 * Ask if user wants to continue with financeable mode after exploration
 */
export async function continueToFinanceablePrompt(idea) {
  console.log(chalk.cyan('\n✨ Selected Idea:'));
  console.log(chalk.white(`  ${idea.title}`));
  console.log(chalk.gray(`  ${idea.description}\n`));

  const { continue: proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: 'Do you want to continue to Financeable Mode with this idea?',
      default: true,
    },
  ]);

  return proceed;
}

/**
 * Ask for project details if not initialized
 */
export async function getProjectDetailsPrompt(defaults = {}) {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: defaults.projectName || 'Mi Proyecto MIDI',
      validate: (input) => input.length > 0 || 'Project name is required',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Brief description:',
      default: defaults.description || '',
    },
  ]);

  return answers;
}

/**
 * Show results and ask what to do next
 */
export async function whatNextPrompt(options) {
  const choices = [];
  
  if (options.canExplore) {
    choices.push({ name: 'Run Exploration Mode again', value: 'explore' });
  }
  
  if (options.canFinanceable) {
    choices.push({ name: 'Continue to Financeable Mode', value: 'financeable' });
  }
  
  choices.push({ name: 'View detailed results', value: 'view' });
  choices.push({ name: 'Exit', value: 'exit' });

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do next?',
      choices,
    },
  ]);

  return action;
}

/**
 * Ask about funding requirements
 */
export async function getFundingDetailsPrompt(defaults = {}) {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'fundingType',
      message: 'What type of funding are you seeking?',
      choices: [
        { name: 'CORFO - Corfo Capital Semilla', value: 'corfo-semilla' },
        { name: 'CORFO - Corfo Capital Semilla Inicia', value: 'corfo-inicia' },
        { name: 'Startup Competition', value: 'competition' },
        { name: 'Angel Investment', value: 'angel' },
        { name: 'Venture Capital', value: 'vc' },
        { name: 'Bootstrapping', value: 'bootstrap' },
      ],
      default: defaults.fundingType || 'corfo-semilla',
    },
    {
      type: 'number',
      name: 'requestedAmount',
      message: 'Requested funding amount (USD):',
      default: defaults.requestedAmount || 50000,
      validate: (input) => input > 0 || 'Amount must be greater than 0',
    },
  ]);

  return answers;
}

export default {
  selectIdeaPrompt,
  askGateQuestion,
  confirmOverridePrompt,
  selectModePrompt,
  continueToFinanceablePrompt,
  getProjectDetailsPrompt,
  whatNextPrompt,
  getFundingDetailsPrompt,
};
