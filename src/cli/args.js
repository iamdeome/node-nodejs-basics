import process from 'node:process';

const parseArgs = () => {
    let args = process.argv;

    // Check if there is at least one argument
    if (args.length <= 2) {
        console.error('Please ensert at least on arg');
        process.exit;
    }

    // remove system data
    args = args.slice(2);

    let currentPropName = null;
    let currentPropValue = null;

    for (const arg of args) {
        // If there is a flag, lets set it as property
        if (arg.startsWith('--')) {
            if (currentPropName !== null) {
                console.log(`${currentPropName} is ${currentPropValue || 'undefined'}`);
            }
            currentPropName = arg.substring(2);
            currentPropValue = '';
        } else {
            //If its not a flag, lets add it to the value
            currentPropValue += arg + ' ';
        }
    }
    //Output for the last flag
    if (currentPropName !== null) {
        console.log(`${currentPropName} is ${currentPropValue.trim() || 'undefined'}`);
    }
};

parseArgs();