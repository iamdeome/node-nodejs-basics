import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const dir = 'files';
const file = 'fileToRead.txt';
const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir, file);

const read = async () => {
    const fileStream = createReadStream(filePath, { encoding: 'utf-8' });
    fileStream.pipe(process.stdout);

    fileStream.on('end', () => {
        console.log('\n');
      });

    fileStream.on('error', (err) => {
        console.error('FS operation failed', err);
    });

};

await read();