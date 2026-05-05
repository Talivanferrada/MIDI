import inquirer from 'inquirer';
import chalk from 'chalk';

const PLATFORMS = [
  { name: 'OpenCode', value: 'opencode' },
  { name: 'Claude Code', value: 'claude-code' },
  { name: 'Cursor', value: 'cursor' },
  { name: 'Codex', value: 'codex' },
  { name: 'Windsurf', value: 'windsurf' },
  { name: 'Gemini CLI', value: 'gemini-cli' },
  { name: 'Generic (AGENTS.md)', value: 'generic' },
];

const MODES = [
  { name: 'Full MIDI (Exploration + Financeable)', value: 'full' },
  { name: 'Exploration Mode (Ideas generation)', value: 'exploration' },
  { name: 'Financeable Mode (Project development)', value: 'financeable' },
];

const COUNTRIES = [
  { name: 'Chile', value: 'Chile' },
  { name: 'Argentina', value: 'Argentina' },
  { name: 'México', value: 'México' },
  { name: 'Colombia', value: 'Colombia' },
  { name: 'Perú', value: 'Perú' },
  { name: 'España', value: 'España' },
  { name: 'Other', value: 'other' },
];

const CHILE_REGIONS = [
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Metropolitana',
  'O\'Higgins',
  'Maule',
  'Ñuble',
  'Biobío',
  'Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén',
  'Magallanes',
];

export async function getInitOptions(options) {
  if (options.yes) {
    return {
      projectName: options.projectName || 'Mi Proyecto MIDI',
      country: options.country || 'Chile',
      region: options.region || 'Metropolitana',
      mode: options.mode || 'full',
      platform: options.platform || 'generic',
    };
  }

  console.log(chalk.cyan('\n🎹 MIDI Framework Initialization\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: options.projectName || 'Mi Proyecto MIDI',
    },
    {
      type: 'list',
      name: 'country',
      message: 'Country:',
      choices: COUNTRIES,
      default: options.country || 'Chile',
    },
    {
      type: 'list',
      name: 'region',
      message: 'Region:',
      choices: CHILE_REGIONS,
      default: options.region || 'Metropolitana',
      when: (answers) => answers.country === 'Chile',
    },
    {
      type: 'input',
      name: 'region',
      message: 'Region/State:',
      default: options.region || '',
      when: (answers) => answers.country !== 'Chile',
    },
    {
      type: 'list',
      name: 'mode',
      message: 'MIDI mode:',
      choices: MODES,
      default: options.mode || 'full',
    },
    {
      type: 'list',
      name: 'platform',
      message: 'Agent platform:',
      choices: PLATFORMS,
      default: options.platform || 'generic',
    },
  ]);

  return answers;
}
