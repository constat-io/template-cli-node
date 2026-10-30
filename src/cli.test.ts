import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { main } from './cli';
import { productName } from './product';

/** The tool run in this process: what it printed, and its exit code. */
function run(argv: string[]): { code: number; printed: string } {
  const lines: string[] = [];
  const code = main(argv, (line) => lines.push(line));
  return { code, printed: lines.join('\n') };
}

describe('foundation', () => {
  it('installs and tests', () => {
    // The check that a fresh checkout installs and runs: it is this suite running at all.
    expect(run(['--version']).code).toBe(0);
  });

  it('prints its name', () => {
    // The tool runs and prints its own name. Yours to make it your own name.
    expect(run([]).printed).toContain(productName());
    // And as a person runs it: the built command, in a process of its own.
    const printed = execFileSync(process.execPath, [join(__dirname, '..', 'dist', 'cli.js')], { encoding: 'utf8' });
    expect(printed).toContain(productName());
  });
});
