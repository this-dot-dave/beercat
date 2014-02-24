'use strict';

module.exports = {
    db: process.env.MONGO_DB,
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