import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'stream/promises';

const dir = 'files';
const fileToCompress = 'fileToCompress.txt';
const fileCompressed = 'archive.gz';
const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir, fileToCompress);
const compressedFilePath = path.join(path.dirname(fileURLToPath(import.meta.url)), dir, fileCompressed);

const compress = async () => {
    const readStream = createReadStream(filePath);
    const gzipStream = createGzip();
    const writeStream = createWriteStream(compressedFilePath);

    await pipeline(readStream, gzipStream, writeStream);
    
};

await compress();
