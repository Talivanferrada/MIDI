import fs from 'fs-extra';
import path from 'path';

const REQUIRED_PATHS = [
  '.midi',
  '.midi/config',
  '.midi/agents',
  '.midi/skills',
  '.midi/commands',
  '.midi/templates',
  '.midi/workflows',
  '.midi/docs',
  'midi-project',
  'midi-project/PROJECT_STATE.md',
  '.midi/config/midi.config.json',
];

export async function validateInstall(targetDir) {
  for (const reqPath of REQUIRED_PATHS) {
    const fullPath = path.join(targetDir, reqPath);
    const exists = await fs.pathExists(fullPath);
    if (!exists) {
      return false;
    }
  }

  const configPath = path.join(targetDir, '.midi', 'config', 'midi.config.json');
  try {
    const config = await fs.readJson(configPath);
    if (!config.framework || config.framework !== 'MIDI') {
      return false;
    }
  } catch {
    return false;
  }

  return true;
}
