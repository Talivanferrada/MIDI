import fs from 'fs-extra';
import path from 'path';

export async function ensureDir(dirPath) {
  await fs.ensureDir(dirPath);
}

export async function writeFile(filePath, content) {
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, 'utf8');
}

export async function readJson(filePath) {
  return fs.readJson(filePath);
}

export async function writeJson(filePath, data) {
  await fs.writeJson(filePath, data, { spaces: 2 });
}

export async function fileExists(filePath) {
  return fs.pathExists(filePath);
}

export async function copyDir(src, dest) {
  await fs.copy(src, dest, { overwrite: true });
}
