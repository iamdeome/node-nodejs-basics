import { access, rename as renameFile, constants } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const dir = 'files';
const wrongName = 'wrongFilename.txt';
const properName = 'properFilename.txt';
const wrongFilePath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir, wrongName);
const properFilePath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir, properName);

const rename = async () => {
    try {
        await access(wrongFilePath, constants.R_OK);
    } catch {
        console.error('FS operation failed:');
        process.exit(1);
    }
    try {
        await access(properFilePath, constants.F_OK);
        console.error('FS operation failed');
        process.exit(1);
    } catch {
        await renameFile(wrongFilePath, properFilePath);
        console.log('File renamed successfully!');
    }

};

await rename();