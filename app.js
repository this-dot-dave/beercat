/* jslint node: true */
/* exported mongo */
/* exported ejs */
'use strict';

/* MODULE DEPENDENCIES */

var common = require('./common'),
    config = common.config();

var express = require('express'),
    http = require('http'),
    path = require('path'),
    request = require('request'),
    ejs = require('ejs');

var mongo = require('mongodb'),
    mongoskin = require('mongoskin'),
    db = mongoskin.db('localhost:27017/beercat', {safe: true});

// Utilities
var _  = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string');

// var moment = require('moment');


// internet connection check
var exec = require('child_process').exec,
    child;
child = exec('ping -c 1 8.8.8.8', function(error){
    if (error !== null) {
        console.log(" - OFFLINE - Not available");
    } else {
        console.log("- ONLINE - Available");
    }
});

var app = module.exports = express();


/* CONFIGURATION */

// all environments
app.set('port', process.env.PORT || 3000);

//app.engine('.ejs', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}


/* ROUTES */


// reverse proxy, since the BreweryDB API does not support JSONP or CORS
app.get(config.brewerydb.proxy_url + '*', function(req, res){

    var externalApiCall = function(){

        var querystring,
        serialize = function(obj){
            var str = [];
            for(var p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        };

        _.extend(req.query, {key: config.brewerydb.api_key});

        querystring = serialize(req.query);

        req.url = config.brewerydb.api_url + _(req.path).strRight(config.brewerydb.proxy_url) + '?' + querystring;

        // api response to cache
        request(req.url, function(error, response, body){
            if (!error && response.statusCode == 200 && config.local_api_cache_enabled) {
                console.log( '- api response -' );
                setCache(req.originalUrl, body);
            }
        }).pipe(res);

        console.log('PROXY ' + req.originalUrl + ' --> ' + req.url);

    };

    var setCache = function(queryPath, responseBody){
        var record = {
            query: queryPath,
            response: responseBody
        };

        db.collection('apicache').insert( record, {}, function(err, results, next){
            if (err) { return next(err); }
            console.log('- cache success: ' + results[0].query);
        });
    };


    if (config.local_api_cache_enabled) {

        db.collection('apicache').findOne({ query: req.originalUrl }, function(err, cache){

            if (cache) { // !null
                console.log( 'response from cache:');
                //console.log( cache.response );
                res.set('Content-Type', 'application/json');
                res.send( cache.response );

            } else {
                console.log( 'cache is: ' + cache);
                externalApiCall();
            }

        });
    } else {
        console.log( '- api caching disabled -');
        externalApiCall();
    }

});


var clientSideConfigs = config;

// serve index and view partials
app.get('/', function(req, res){
    res.render('index.ejs', { config: clientSideConfigs });
});

// data

app.param('collectionName', function(req, res, next, collectionName){
    req.collection = db.collection(collectionName);
    return next();
});

app.get('/collections/:collectionName', function(req, res){
    req.collection.find( {}, {limit: 10, sort: [['_id', -1]]} ).toArray(function(err, results, next){
        if (err) { return next(err); }
        res.send(results);
    });
});
app.post('/collections/:collectionName', function(req, res){

    console.log( req.body );

    req.collection.insert( req.body, {}, function(err, results, next){
        if (err) { return next(err); }
        res.send(results);
    });
});


// redirect all others to the index (HTML5 history)
app.get('*', function(req, res){
    res.redirect('/');
});


/* START SERVER */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});