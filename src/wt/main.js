import { Worker } from 'worker_threads';
import { cpus } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const worker = 'worker.js';
const workerPath = path.join(path.dirname(fileURLToPath(import.meta.url)), worker);

const performCalculations = async () => {
  const cores = cpus().length;

  const createWorker = (data) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerPath, { workerData: data });
 
    worker.on('message', (message) => {
        resolve(message);
        worker.terminate();
      });

    worker.on('error', (error) => {
        resolve({ status: 'error', data: null });
        worker.terminate();
      });
    });
  };

  const workerPromises = [];

  for (let i = 0; i < cores; i++) {
    workerPromises.push(createWorker(10 + i));
  }

  const results = await Promise.all(workerPromises);
  console.log(results);
};

performCalculations();
