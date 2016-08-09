/**
 * @module Config
 * Config of API path
 **/

// setup api url
const Config = {
    baseURL: process.env.NODE_URL || `https://${location.hostname}`
};

export default Config;
