'use strict';

module.exports = {
    mongoDB: {
        host: process.env.MONGODB_HOST,
        local: process.env.LOCAL_MONGO,
        mongoLab: process.env.MONGOLAB_URI
    },
    app: {
        name: "BeerCat - Production"
    },
    brewerydb: {
        apiKey: process.env.BREWERYDB_API_KEY,
        apiURL: process.env.BREWERYDB_API_URL,
        proxyURL: process.env.BREWERYDB_PROXY_URL,
        localCaching: process.env.LOCAL_API_CACHE_ENABLED
    }
};