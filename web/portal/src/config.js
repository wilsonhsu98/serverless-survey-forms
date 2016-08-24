

// setup server url
const Config = {
    baseURL: process.env.NODE_URL || `https://${location.hostname}`,
    adminEmail: 'AllofTWGaiaServerLead@trendmicro.com',
    surveyFormat: 'v1'
};

export default Config;
