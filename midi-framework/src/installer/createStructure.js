import fs from 'fs-extra';
import path from 'path';

const MIDI_DIRS = [
  '.midi',
  '.midi/config',
  '.midi/agents',
  '.midi/skills',
  '.midi/commands',
  '.midi/templates',
  '.midi/workflows',
  '.midi/docs',
];

const PROJECT_DIRS = [
  'midi-project',
  'midi-project/00_intake',
  'midi-project/01_research',
  'midi-project/02_insights',
  'midi-project/03_ideas',
  'midi-project/04_top3',
  'midi-project/05_analysis',
  'midi-project/06_devil_advocate',
  'midi-project/07_iteration',
  'midi-project/08_canvas',
  'midi-project/09_technical_financial_legal',
  'midi-project/10_validation',
  'midi-project/11_funding',
  'midi-project/12_evaluation',
  'midi-project/13_final',
];

export async function createStructure(targetDir) {
  const allDirs = [...MIDI_DIRS, ...PROJECT_DIRS];
  
  for (const dir of allDirs) {
    const fullPath = path.join(targetDir, dir);
    await fs.ensureDir(fullPath);
  }
}
