import { access, unlink, readdir, copyFile, constants } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';
const file = 'fileToRemove.txt';
const dir = 'files';
const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir, file);

const remove = async () => {
    try {
        await unlink(filePath);
    } catch {
       console.error('FS operation failed');
       process.exit(1);
    }
};

await remove();