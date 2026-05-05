import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import chalk from 'chalk';
import { getInitOptions } from './prompts.js';
import { logger } from './logger.js';
import { createStructure } from '../installer/createStructure.js';
import { copyTemplates } from '../installer/copyTemplates.js';
import { writeConfig } from '../installer/writeConfig.js';
import { detectPlatform } from '../installer/detectPlatform.js';
import { validateInstall } from '../installer/validateInstall.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function init(options) {
  const answers = await getInitOptions(options);
  const targetDir = process.cwd();

  logger.title('🎹 MIDI Framework - Initializing');

  logger.step(1, 5, 'Detecting platform and environment...');
  const detectedPlatform = detectPlatform(targetDir);
  const platform = answers.platform || detectedPlatform || 'generic';
  logger.success(`Platform: ${platform}`);

  logger.step(2, 5, 'Creating directory structure...');
  await createStructure(targetDir);
  logger.success('Directory structure created');

  logger.step(3, 5, 'Copying templates...');
  const templatesDir = path.join(__dirname, '..', '..', 'templates');
  await copyTemplates(templatesDir, targetDir, platform);
  logger.success('Templates copied');

  logger.step(4, 5, 'Writing configuration...');
  await writeConfig(targetDir, answers);
  logger.success('Configuration written');

  logger.step(5, 5, 'Validating installation...');
  const isValid = await validateInstall(targetDir);
  if (isValid) {
    logger.success('Installation validated');
  } else {
    logger.warning('Installation may have issues. Run `midi doctor` for details.');
  }

  logger.title('✅ MIDI Framework initialized successfully!');
  console.log('\nNext steps:');
  console.log(chalk.cyan('  1. Review .midi/config/midi.config.json'));
  console.log(chalk.cyan('  2. Read .midi/docs/README.md'));
  console.log(chalk.cyan('  3. Start your agent and use /midi-start'));
  console.log(chalk.cyan('  4. Run `midi doctor` to verify installation'));
  console.log(chalk.cyan('  5. Run `midi run` to start the workflow executor\n'));

  // Offer to start workflow
  if (!options.yes) {
    const inquirer = await import('inquirer');
    const { startWorkflow } = await inquirer.default.prompt([
      {
        type: 'confirm',
        name: 'startWorkflow',
        message: 'Would you like to start the workflow now?',
        default: false,
      },
    ]);

    if (startWorkflow) {
      console.log(chalk.cyan('\nStarting workflow executor...\n'));
      const { default: runWorkflow } = await import('./run.js');
      await runWorkflow({ workflow: answers.mode === 'full' ? 'full-midi' : answers.mode });
    }
  }
}
