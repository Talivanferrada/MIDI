#!/usr/bin/env node

import { program } from 'commander';
import init from '../src/cli/init.js';
import doctor from '../src/cli/doctor.js';
import { start, explore, financeable } from '../src/cli/workflow.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

program
  .name('midi')
  .description('MIDI - Modelo Inteligente de Desarrollo de Innovación')
  .version(packageJson.version);

program
  .command('init')
  .description('Initialize MIDI framework in the current directory')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .option('-n, --project-name <name>', 'Project name')
  .option('-c, --country <country>', 'Country (default: Chile)')
  .option('-r, --region <region>', 'Region')
  .option('-m, --mode <mode>', 'Mode: full, exploration, or financeable', 'full')
  .option('-p, --platform <platform>', 'Agent platform: opencode, claude-code, cursor, codex, windsurf, gemini-cli, generic')
  .action(init);

program
  .command('doctor')
  .description('Check MIDI installation and configuration')
  .action(doctor);

program
  .command('start')
  .description('Start full MIDI workflow (exploration + financeable)')
  .option('-e, --explore', 'Run exploration mode only')
  .option('-f, --financeable', 'Run financeable mode only')
  .action(start);

program
  .command('explore')
  .description('Run exploration mode only (generate and evaluate ideas)')
  .option('-n, --non-interactive', 'Run without interactive prompts')
  .action(explore);

program
  .command('financeable')
  .description('Run financeable mode (requires idea selected)')
  .option('-i, --idea <idea>', 'Idea title to develop')
  .option('-d, --description <description>', 'Idea description')
  .option('--idea-id <id>', 'ID of previously explored idea')
  .option('-t, --funding-type <type>', 'Funding type: corfo-semilla, corfo-inicia, competition, angel, vc, bootstrap')
  .option('-a, --amount <amount>', 'Requested funding amount in USD', parseInt)
  .option('-n, --non-interactive', 'Run without interactive prompts')
  .action(financeable);

program
  .command('run')
  .description('Run the workflow executor with stage validation')
  .option('-w, --workflow <name>', 'Workflow to run: full-midi, exploration, or financeable', 'full-midi')
  .option('-v, --verbose', 'Show verbose output')
  .action(async (options) => {
    const { default: runWorkflow } = await import('../src/cli/run.js');
    await runWorkflow(options);
  });

program
  .command('status')
  .description('Show current workflow status and check blocking rules')
  .action(async () => {
    const { status } = await import('../src/cli/run.js');
    await status({});
  });

program
  .command('reset-workflow')
  .description('Reset workflow state and start over')
  .action(async () => {
    const { reset } = await import('../src/cli/run.js');
    await reset({});
  });

program.parse();
