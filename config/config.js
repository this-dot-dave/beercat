'use strict';

var _  = require('underscore');

var node_env = process.env.NODE_ENV || 'development';

// Extend the base configuration in all.js with environment
// specific configuration
module.exports = _.extend(
    require(__dirname + '/../config/env/all.js'),
    require(__dirname + '/../config/env/' + node_env + '.js') || {}
);
