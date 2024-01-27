import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const dir = 'files';
const file = 'fileToWrite.txt';
const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir, file);

const write = async () => {
    const stream = createWriteStream(filePath, {encoding: 'utf-8'});

    process.stdin.pipe(stream);

    stream.on('finish', () => {
        console.log("done");
    })

    stream.on('error', (err) => {
        console.error('FS operation failed');
    });
};

await write();