import { spawn } from 'child_process';
import { stdin, stdout } from 'process';

import path from 'path';
import { fileURLToPath } from 'node:url';

const dir = 'files';
const file = 'script.js';
const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir, file);

const spawnChildProcess = async (args) => {
  const childProcess = spawn('node', [filePath, ...args], { stdio: 'pipe' });

  stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(stdout); 
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2', '3']);
