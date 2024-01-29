import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'stream/promises';

const dir = 'files';
const fileToCompress = 'fileToCompress123.txt';
const fileCompressed = 'archive.gz';
const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir, fileToCompress);
const compressedFilePath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir, fileCompressed);

const decompress = async () => {
    const readStream = createReadStream(compressedFilePath);
    const gunzipStream = createGunzip();
    const writeStream = createWriteStream(filePath);
    
    await pipeline(readStream, gunzipStream, writeStream);
};

await decompress();
