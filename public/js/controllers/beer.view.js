angular.module('beercatApp.controllers')
    .controller('BeerViewCtrl', ['$scope', '$rootScope', '$routeParams', 'Category', 'Style', 'Beer', 'image', function ($scope, $rootScope, $routeParams, Category, Style, Beer, image){
        $rootScope.homePage = false;

        $scope.beer = Beer.get({beerId: $routeParams.beerId}, function (response) {
            $scope.beer = response.data;
        });

        $scope.breweries = Beer.getBreweries({beerId: $routeParams.beerId}, function (response) {
            $scope.breweries = response.data;
        });

        $scope.fallbackProvider = image.fallbackProvider;

    }]);