/* global angular */
/* global appConfig */
/* jshint globalstrict: true */
'use strict';

angular.module('beercatApp', [
    'ngRoute',
    'beercatApp.controllers',
    'beercatApp.services'
]);
angular.module('beercatApp.controllers', []);

angular.module('beercatApp.services', ['ngResource'])
    .constant( 'API_PROXY_URL', appConfig.proxy_url );

angular.module('beercatApp')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/categories', {
                templateUrl: 'views/categories.html',
                controller: 'CategoryListCtrl'
            }).
            when('/categories/:categoryId', {
                templateUrl: 'views/styles.html',
                controller: 'StylesCtrl'
            }).
            when('/categories/:categoryId/style/:styleId', {
                templateUrl: 'views/beer.list.html',
                controller: 'BeerListCtrl'
            }).
            when('/categories/:categoryId/style/:styleId/beer/:beerId', {
                templateUrl: 'views/beer.view.html',
                controller: 'BeerViewCtrl'
            }).
            otherwise({
                redirectTo: '/categories'
            });
    }]);