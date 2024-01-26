import { access, writeFile, constants } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';
const file = 'fresh.txt';
const dir = 'files';
const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir, file);

const create = async () => {

    try {
        await access(filePath, constants.R_OK);
        console.error(`FS operation failed`);
    } catch {
        await writeFile(filePath, 'I am fresh and young');
        console.log(`File '${file}' created successfully in the 'files' folder.`);
    } 
};

await create();