import path from 'path';

export function joinPaths(...segments) {
  return path.join(...segments);
}

export function getDirname(filePath) {
  return path.dirname(filePath);
}

export function getBasename(filePath) {
  return path.basename(filePath);
}

export function getExtname(filePath) {
  return path.extname(filePath);
}

export function resolvePath(...segments) {
  return path.resolve(...segments);
}

export function relativePath(from, to) {
  return path.relative(from, to);
}
