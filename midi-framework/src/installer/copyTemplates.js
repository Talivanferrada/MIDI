import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function copyTemplates(templatesDir, targetDir, platform) {
  const baseDir = path.join(templatesDir, 'base');
  
  await fs.copy(path.join(baseDir, '.midi'), path.join(targetDir, '.midi'));
  await fs.copy(path.join(baseDir, 'midi-project'), path.join(targetDir, 'midi-project'));

  const platformInstructions = getPlatformInstructions(platform);
  if (platformInstructions) {
    for (const [filename, content] of Object.entries(platformInstructions)) {
      await fs.writeFile(path.join(targetDir, filename), content);
    }
  }
}

function getPlatformInstructions(platform) {
  const instructions = {
    'opencode': {
      'AGENTS.md': `# MIDI Framework Instructions

This project uses MIDI (Modelo Inteligente de Desarrollo de Innovación).

## Getting Started

1. Read the framework documentation: \`.midi/docs/README.md\`
2. Check the main configuration: \`.midi/config/midi.config.json\`
3. Follow the workflow: \`.midi/workflows/full-midi.workflow.md\`

## Available Commands

- \`/midi-start\` - Start a new MIDI project
- \`/midi-explore\` - Enter exploration mode
- \`/midi-top3\` - Generate top 3 ideas
- \`/midi-financeable\` - Enter financeable mode
- \`/midi-devil\` - Run devil's advocate analysis
- \`/midi-canvas\` - Generate business canvases
- \`/midi-evaluate\` - Evaluate the project
- \`/midi-final\` - Generate final document

## Agent Platform

This project is configured for **OpenCode**.

Always read the configuration files before starting any MIDI workflow.
`
    },
    'claude-code': {
      'CLAUDE.md': `# MIDI Framework Instructions

This project uses MIDI (Modelo Inteligente de Desarrollo de Innovación).

## Getting Started

1. Read the framework documentation: \`.midi/docs/README.md\`
2. Check the main configuration: \`.midi/config/midi.config.json\`
3. Follow the workflow: \`.midi/workflows/full-midi.workflow.md\`

## Available Commands

- \`/midi-start\` - Start a new MIDI project
- \`/midi-explore\` - Enter exploration mode
- \`/midi-top3\` - Generate top 3 ideas
- \`/midi-financeable\` - Enter financeable mode
- \`/midi-devil\` - Run devil's advocate analysis
- \`/midi-canvas\` - Generate business canvases
- \`/midi-evaluate\` - Evaluate the project
- \`/midi-final\` - Generate final document

## Agent Platform

This project is configured for **Claude Code**.

Always read the configuration files before starting any MIDI workflow.
`
    },
    'cursor': {
      '.cursorrules': `# MIDI Framework Instructions

This project uses MIDI (Modelo Inteligente de Desarrollo de Innovación).

## Getting Started

1. Read the framework documentation: .midi/docs/README.md
2. Check the main configuration: .midi/config/midi.config.json
3. Follow the workflow: .midi/workflows/full-midi.workflow.md

## Agent Platform

This project is configured for **Cursor**.

Always read the configuration files before starting any MIDI workflow.
`,
      'AGENTS.md': `# MIDI Framework Instructions

This project uses MIDI (Modelo Inteligente de Desarrollo de Innovación).

Read .midi/docs/README.md, .midi/config/midi.config.json and .midi/workflows/full-midi.workflow.md to get started.
`
    },
    'windsurf': {
      '.windsurfrules': `# MIDI Framework Instructions

This project uses MIDI (Modelo Inteligente de Desarrollo de Innovación).

## Getting Started

1. Read the framework documentation: .midi/docs/README.md
2. Check the main configuration: .midi/config/midi.config.json
3. Follow the workflow: .midi/workflows/full-midi.workflow.md

## Agent Platform

This project is configured for **Windsurf**.

Always read the configuration files before starting any MIDI workflow.
`
    },
    'generic': {
      'AGENTS.md': `# MIDI Framework Instructions

This project uses MIDI (Modelo Inteligente de Desarrollo de Innovación).

## Getting Started

1. Read the framework documentation: \`.midi/docs/README.md\`
2. Check the main configuration: \`.midi/config/midi.config.json\`
3. Follow the workflow: \`.midi/workflows/full-midi.workflow.md\`

## Available Commands

- \`/midi-start\` - Start a new MIDI project
- \`/midi-explore\` - Enter exploration mode
- \`/midi-top3\` - Generate top 3 ideas
- \`/midi-financeable\` - Enter financeable mode
- \`/midi-devil\` - Run devil's advocate analysis
- \`/midi-canvas\` - Generate business canvases
- \`/midi-evaluate\` - Evaluate the project
- \`/midi-final\` - Generate final document

## Agent Platform

This project is configured for a **generic** agent platform.

Always read the configuration files before starting any MIDI workflow.
`
    }
  };

  return instructions[platform] || instructions['generic'];
}
