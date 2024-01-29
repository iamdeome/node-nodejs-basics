import { Transform  } from 'stream';

const transform = async () => {
    const revers = new Transform ({
        transform(c, e, cb) { 
            cb(null, c.toString().split('').reverse().join(''));
        }
    })
    process.stdin.pipe(revers).pipe(process.stdout);
};

await transform();