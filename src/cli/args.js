import process from 'node:process';

const parseArgs = () => {
    if (process.argv.length === 2) {
        console.error('please enter at least one argument');
        process.exit;
    }

    
};

parseArgs();