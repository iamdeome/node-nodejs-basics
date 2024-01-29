import process from 'node:process';

const parseEnv = () => {
    const rssVars = Object.keys(process.env)
    .filter(key => key.startsWith('RSS_'))
    .map(key => `RSS_${key}=${process.env[key]}`)
    .join('; ');;
    
    if (rssVars) {
        console.log(rssVars);
    } else {
        console.error('there is no Rss varibales');
        process.exit;
    }
};

parseEnv();