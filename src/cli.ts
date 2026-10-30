#!/usr/bin/env node
import { productName } from './product';

export const VERSION = '0.1.0';

/** Runs the tool: each line it prints goes to `write`, and its exit code comes back. */
export function main(argv: readonly string[], write: (line: string) => void): number {
  if (argv.includes('--version')) {
    write(VERSION);
    return 0;
  }
  if (argv.includes('--help')) {
    write(`Usage: ${productName()} [--help] [--version]`);
    return 0;
  }
  write(`${productName()} ${VERSION}`);
  return 0;
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2), (line) => process.stdout.write(`${line}\n`));
}
