import fs from 'fs-extra';
import path from 'path';

/**
 * Detects the agent platform by checking for platform-specific configuration files.
 * @param {string} targetDir - The target directory to check
 * @returns {string|null} - Detected platform or null if not detected
 */
export function detectPlatform(targetDir) {
  const platformFiles = [
    { file: 'AGENTS.md', platforms: ['opencode', 'generic'] },
    { file: 'CLAUDE.md', platform: 'claude-code' },
    { file: '.cursorrules', platform: 'cursor' },
    { file: '.windsurfrules', platform: 'windsurf' },
    { file: '.codex', platform: 'codex' },
  ];

  // Check synchronously since this is a simple file check
  for (const pf of platformFiles) {
    const filePath = path.join(targetDir, pf.file);
    try {
      if (fs.existsSync(filePath)) {
        return pf.platform;
      }
    } catch {
      // Ignore errors, continue checking
    }
  }

  return null;
}
