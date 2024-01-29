import { access, mkdir, readdir, copyFile, constants } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const oldDir = 'files';
const newDir = 'files-copy';
const oldDirPath = path.join(path.dirname(fileURLToPath(import.meta.url)), oldDir);
const newDirPath = path.join(path.dirname(fileURLToPath(import.meta.url)), newDir);

const copy = async () => {
    //check and handle "oldPath (files) doesn't exists" case
    try {
        await access(oldDirPath, constants.R_OK);
       
    } catch {
       console.error('FS operation failed');
       process.exit(1);
    }
    //then check and handle "newPath (files-copy) already exists" case
    try {
        await access(newDirPath, constants.R_OK);
        console.error('FS operation failed');
        process.exit(1);
    } catch {
        //read old files
        const oldFiles = await readdir(oldDirPath);

        await mkdir(newDirPath);
        
        for (const file of oldFiles) {
            const oldFilePath = path.join(oldDirPath, file);
            const newFilePath = path.join(newDirPath, file);
            await copyFile(oldFilePath, newFilePath);
        }

        console.log('done!');

    }
};

await copy();
