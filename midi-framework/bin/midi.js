#!/usr/bin/env node

import { program } from 'commander';
import init from '../src/cli/init.js';
import doctor from '../src/cli/doctor.js';
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

program.parse();
