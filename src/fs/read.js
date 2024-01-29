import { access, readFile, constants } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';
const file = 'fileToRead.txt';
const dir = 'files';
const dirPath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir, file);

const read = async () => {
    try {
        await access(dirPath, constants.R_OK);

        const content = await readFile(dirPath, 'utf-8');
        console.log(content);

    } catch {
        console.error('FS operation failed:');
        process.exit(1);
    }
};

await read();