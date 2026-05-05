import fs from 'fs-extra';
import path from 'path';
import { logger } from './logger.js';
import chalk from 'chalk';

const REQUIRED_DIRS = [
  '.midi',
  '.midi/config',
  '.midi/agents',
  '.midi/skills',
  '.midi/commands',
  '.midi/templates',
  '.midi/workflows',
  '.midi/docs',
  'midi-project',
];

const REQUIRED_CONFIG_FILES = [
  '.midi/config/midi.config.json',
  'midi-project/PROJECT_STATE.md',
];

export default async function doctor() {
  logger.title('🎹 MIDI Framework - Doctor');
  
  const targetDir = process.cwd();
  let hasErrors = false;
  let hasWarnings = false;

  console.log(chalk.white('Checking MIDI installation...\n'));

  console.log(chalk.white.bold('Directory Structure:'));
  for (const dir of REQUIRED_DIRS) {
    const dirPath = path.join(targetDir, dir);
    const exists = await fs.pathExists(dirPath);
    if (exists) {
      console.log(chalk.green(`  ✓ ${dir}`));
    } else {
      console.log(chalk.red(`  ✗ ${dir} (missing)`));
      hasErrors = true;
    }
  }

  console.log(chalk.white.bold('\nConfiguration Files:'));
  for (const file of REQUIRED_CONFIG_FILES) {
    const filePath = path.join(targetDir, file);
    const exists = await fs.pathExists(filePath);
    if (exists) {
      console.log(chalk.green(`  ✓ ${file}`));
    } else {
      console.log(chalk.red(`  ✗ ${file} (missing)`));
      hasErrors = true;
    }
  }

  const configPath = path.join(targetDir, '.midi', 'config', 'midi.config.json');
  if (await fs.pathExists(configPath)) {
    console.log(chalk.white.bold('\nConfiguration:'));
    try {
      const config = await fs.readJson(configPath);
      console.log(chalk.gray(`  Project: ${config.project_name || '(not set)'}`));
      console.log(chalk.gray(`  Country: ${config.country || '(not set)'}`));
      console.log(chalk.gray(`  Region: ${config.region || '(not set)'}`));
      console.log(chalk.gray(`  Mode: ${config.default_mode || '(not set)'}`));
      console.log(chalk.gray(`  Platform: ${config.agent_platform || '(not set)'}`));
      console.log(chalk.gray(`  Version: ${config.version || '(not set)'}`));
    } catch (e) {
      console.log(chalk.red(`  ✗ Error reading config: ${e.message}`));
      hasErrors = true;
    }
  }

  const agentsDir = path.join(targetDir, '.midi', 'agents');
  if (await fs.pathExists(agentsDir)) {
    const agents = await fs.readdir(agentsDir);
    console.log(chalk.white.bold('\nAgents installed:'));
    console.log(chalk.gray(`  ${agents.length} agent files found`));
    if (agents.length < 5) {
      console.log(chalk.yellow(`  ⚠ Expected at least 5 agents, found ${agents.length}`));
      hasWarnings = true;
    }
  }

  console.log(chalk.white.bold('\nPlatform Detection:'));
  const platformFiles = [
    { file: 'AGENTS.md', platforms: ['opencode', 'generic'] },
    { file: 'CLAUDE.md', platforms: ['claude-code'] },
    { file: '.cursorrules', platforms: ['cursor'] },
    { file: '.windsurfrules', platforms: ['windsurf'] },
  ];
  
  for (const pf of platformFiles) {
    const exists = await fs.pathExists(path.join(targetDir, pf.file));
    if (exists) {
      console.log(chalk.green(`  ✓ ${pf.file} (${pf.platforms.join(', ')})`));
    }
  }

  console.log('\n' + chalk.white.bold('Summary:'));
  if (!hasErrors && !hasWarnings) {
    console.log(chalk.green.bold('  ✓ MIDI installation is healthy\n'));
    process.exit(0);
  } else if (hasErrors) {
    console.log(chalk.red.bold('  ✗ MIDI installation has errors. Run `midi init` to fix.\n'));
    process.exit(1);
  } else {
    console.log(chalk.yellow.bold('  ⚠ MIDI installation has warnings.\n'));
    process.exit(0);
  }
}
