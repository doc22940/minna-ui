/* eslint-disable security/detect-object-injection */

import { statSync } from 'fs';
import { join } from 'path';

/**
 * @param cwd - Current working directory.
 * @returns Path to the matching entry file.
 */
export function resolveEntryFile(cwd: string): string {
  const files = [
    'index.js',
    'index.ts',
    'index.jsx',
    'index.tsx',
    'src/index.js',
    'src/index.ts',
    'src/index.jsx',
    'src/index.tsx',
  ];
  let result = '';
  let index = 0;

  while (!result && index < files.length) {
    index += 1;

    const file = join(cwd, files[index]);

    try {
      if (statSync(file)) result = file;
    } catch (err) {}
  }

  if (!result) {
    throw new Error(
      "Couldn't find an entry file. Add entry src path to the `build-lib` cli.",
    );
  }

  return result;
}
