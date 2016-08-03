

// setup server url
const Config = {
    baseURL: process.env.NODE_ENV === 'production' ? `https://${location.hostname}` : 'https://d55l5c44l96fo.cloudfront.net'
};

export default Config;
