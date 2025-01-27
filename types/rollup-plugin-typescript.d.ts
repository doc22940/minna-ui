// FIXME: Remove this file once upstream PR is merged:
// https://github.com/rollup/rollup-plugin-typescript/pull/138/files

import { Plugin } from 'rollup';
import { CompilerOptionsValue, TsConfigSourceFile } from 'typescript';

interface RollupTypescriptOptions {
  /** Other Typescript compiler options. */
  /* eslint-disable @typescript-eslint/indent */
  [option: string]:
    | CompilerOptionsValue
    | TsConfigSourceFile
    | RollupTypescriptOptions['include']
    | RollupTypescriptOptions['typescript']
    | RollupTypescriptOptions['tslib']
    | undefined;

  /**
   * Determine which files are transpiled by Typescript (all `.ts` and
   * `.tsx` files by default).
   */
  include?: string | RegExp | readonly (string | RegExp)[] | null;
  /**
   * Determine which files are transpiled by Typescript (all `.ts` and
   * `.tsx` files by default).
   */
  exclude?: string | RegExp | readonly (string | RegExp)[] | null;
  /**
   * When set to false, ignores any options specified in the config file.
   * If set to a string that corresponds to a file path, the specified file
   * will be used as config file.
   */
  tsconfig?: string | false;
  /** Overrides TypeScript used for transpilation. */
  typescript?: typeof import('typescript');
  /** Overrides the injected TypeScript helpers with a custom version. */
  tslib?: typeof import('tslib');
}

/** Seamless integration between Rollup and Typescript. */
export default function typescript(options?: RollupTypescriptOptions): Plugin;
