// Builds the tool before the checks run: a check that runs the command must run the code as it is now.
// And makes the folder the check report is written to: jest's --outputFile does not make it.
const { execFileSync } = require('node:child_process');
const { mkdirSync } = require('node:fs');

module.exports = () => {
  mkdirSync('.constat/check-report', { recursive: true });
  execFileSync(process.execPath, [require.resolve('typescript/bin/tsc'), '-p', '.'], { stdio: 'inherit' });
};
