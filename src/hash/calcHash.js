import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'node:url';

const dir = 'files';
const file = 'fileToCalculateHashFor.txt';
const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir, file);
const hash = createHash('sha256');

const calculateHash = async () => {
    const fileStream = createReadStream(filePath);

    try {
        await access(filePath, constants.R_OK);
    } catch {
        console.error('FS operation failed:');
        process.exit(1);
    }

    return new Promise((resolve, reject) => {
        fileStream.on('data', (data) => {
            hash.update(data);
        });

        fileStream.on('end', () => {
            const finalHash = hash.digest('hex');
            console.log(finalHash);
            resolve();
        });

        fileStream.on('error', (error) => {
            reject(error);
        });
    });
    
};

await calculateHash();