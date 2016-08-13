

// setup server url
const Config = {
    baseURL: process.env.NODE_URL || `https://${location.hostname}`,
    adminEmail: 'admin@server.com.tw'
};

export default Config;
