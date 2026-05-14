#!/usr/bin/env node

import { program } from 'commander';
import init from '../src/cli/init.js';
import doctor from '../src/cli/doctor.js';
import { start, explore, financeable } from '../src/cli/workflow.js';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

// Banner de bienvenida
function showBanner() {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║                                                           ║');
  console.log('║          MIDI Framework v' + packageJson.version.padEnd(10) + '                        ║');
  console.log('║     Modelo Inteligente de Desarrollo de Innovación       ║');
  console.log('║                                                           ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
}

// Mostrar instrucciones después de init
function showPostInitInstructions(projectName) {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║               ✓ PROYECTO INICIALIZADO                     ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('📚 PRÓXIMOS PASOS:');
  console.log('');
  console.log('  1. Iniciar el workflow:');
  console.log('     midi start');
  console.log('');
  console.log('  2. O ejecutar solo exploración:');
  console.log('     midi explore');
  console.log('');
  console.log('  3. Verificar instalación:');
  console.log('     midi doctor');
  console.log('');
  console.log('📖 COMANDOS DISPONIBLES:');
  console.log('');
  console.log('  midi start          - Workflow completo (exploración + análisis)');
  console.log('  midi explore        - Generar y evaluar ideas');
  console.log('  midi financeable    - Análisis profundo de proyecto');
  console.log('  midi doctor         - Verificar instalación');
  console.log('  midi status         - Ver estado del proyecto');
  console.log('');
  console.log('💡 ¿Qué deseas hacer?');
  console.log('');
  console.log('  Para EXPLORAR IDEAS desde cero:');
  console.log('    → Ejecuta: midi start');
  console.log('    → Selecciona: "Explorar ideas desde cero"');
  console.log('');
  console.log('  Para ANALIZAR un proyecto existente:');
  console.log('    → Ejecuta: midi start');
  console.log('    → Selecciona: "Analizar proyecto para financiamiento"');
  console.log('');
  console.log('  Para POSTULAR a un fondo específico:');
  console.log('    → Ejecuta: midi start');
  console.log('    → Selecciona: "Postular a fondo concursable"');
  console.log('    → Ten listo el link a las bases oficiales');
  console.log('');
  console.log('🌐 Más información:');
  console.log('   GitHub: https://github.com/Talivanferrada/MIDI');
  console.log('   Manual: .midi/docs/MANUAL_DE_USO.md');
  console.log('');
}

program
  .name('midi')
  .description('MIDI - Modelo Inteligente de Desarrollo de Innovación')
  .version(packageJson.version)
  .hook('preAction', (thisCommand, actionCommand) => {
    // Mostrar banner solo para comandos principales (no para --help o --version)
    if (actionCommand.name() !== '--help' && actionCommand.name() !== '--version') {
      showBanner();
    }
  });

// Comando setup - instalación completa en uno
program
  .command('setup')
  .description('Complete setup: install dependencies, create project, show instructions')
  .option('-n, --project-name <name>', 'Project name (default: current directory name)')
  .option('-c, --country <country>', 'Country (default: Chile)')
  .option('-s, --start', 'Start workflow after setup')
  .action(async (options) => {
    const projectName = options.projectName || process.cwd().split('/').pop() || 'midi-project';
    
    console.log('⚙️  Configurando MIDI Framework...');
    console.log('');
    
    // Ejecutar init
    await init({
      yes: true,
      projectName: projectName,
      country: options.country || 'Chile',
      mode: 'full',
      platform: 'generic'
    });
    
    // Mostrar instrucciones
    showPostInitInstructions(projectName);
    
    // Si se solicitó iniciar workflow
    if (options.start) {
      console.log('');
      console.log('🚀 Iniciando workflow...');
      console.log('');
      await start({});
    }
  });

program
  .command('init')
  .description('Initialize MIDI framework in the current directory')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .option('-n, --project-name <name>', 'Project name')
  .option('-c, --country <country>', 'Country (default: Chile)')
  .option('-r, --region <region>', 'Region')
  .option('-m, --mode <mode>', 'Mode: full, exploration, or financeable', 'full')
  .option('-p, --platform <platform>', 'Agent platform: opencode, claude-code, cursor, codex, windsurf, gemini-cli, generic')
  .option('-s, --start', 'Start workflow after initialization')
  .action(async (options) => {
    await init(options);
    
    const projectName = options.projectName || process.cwd().split('/').pop() || 'midi-project';
    showPostInitInstructions(projectName);
    
    // Si se solicitó iniciar workflow
    if (options.start) {
      console.log('');
      console.log('🚀 Iniciando workflow...');
      console.log('');
      await start({});
    }
  });

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
