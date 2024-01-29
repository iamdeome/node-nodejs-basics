import { access, readdir, constants } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';
const dir = 'files';
const dirPath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir);

const list = async () => {
    try {
        await access(dirPath, constants.R_OK);
        const files = await readdir(dirPath);
        console.log(files);

    } catch {
        console.error('FS operation failed');
        process.exit(1);

    }
};

await list();