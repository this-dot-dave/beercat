/* Services */

angular.module('beercatApp.services')
    .factory('Category', ['$resource', 'API_PROXY_URL', function ($resource, API_PROXY_URL){

        return $resource( API_PROXY_URL + 'categories/', null, {
            get: {method: 'GET', cache: true},
            query: {method: 'GET', url: API_PROXY_URL + 'category/:categoryId', isArray: false, cache: true}
        });

    }])

    .factory('Style', ['$resource', 'API_PROXY_URL', function ($resource, API_PROXY_URL){

        return $resource( API_PROXY_URL + 'styles/', null, {
            get: {method: 'GET', cache: true},
            query: {method: 'GET', url: API_PROXY_URL + 'style/:styleId', isArray: false, cache: true}
        });

    }])

    .factory('Beer', ['$resource', 'API_PROXY_URL', function ($resource, API_PROXY_URL){

        return $resource( API_PROXY_URL + 'beers/', null, {
            get: {method: 'GET', cache: true},
            query: {method: 'GET', url: API_PROXY_URL + 'beer/:beerId', isArray: false, cache: true},
            getBreweries: {method: 'GET', url: API_PROXY_URL + 'beer/:beerId/breweries', isArray: false, cache: true}
        });

    }])

    .service('image', function(){
        var svc = this;

        svc.fallbackProvider = function(label){
            if (label) {
                return label;
            } else {
                return '/images/beer-glass-64.png';
            }
        };

        return svc;
    });