/* Controllers */

angular.module('beercatApp.controllers')
    .controller('CategoryListCtrl', ['$scope', '$rootScope', 'Category', 'Style', function ($scope, $rootScope, Category, Style) {

        $rootScope.homePage = true;

        $scope.categories = Category.get( function (response) {
            $scope.categories = response.data;
        });

        $scope.styles = Style.get( function (response) {
            $scope.styles = response.data;
        });

        $scope.styleCountByCategory = function(categoryId, styles){
            return _.filter(styles, function(i){ return i.categoryId == categoryId; }).length;
        };

    }]);

angular.module('beercatApp.controllers')
    .controller('StylesCtrl', ['$scope', '$rootScope', '$routeParams', 'Category', 'Style', function ($scope, $rootScope, $routeParams, Category, Style) {

        $rootScope.homePage = false;

        $scope.category = Category.query({categoryId: $routeParams.categoryId}, function (response) {
            $scope.category = response.data;
        });

        $scope.stylesByCategory = [];

        $scope.styles = Style.get( function (response) {
            $scope.styles = response.data;

            $scope.stylesByCategory = _.filter($scope.styles, function (i){ return i.categoryId == $routeParams.categoryId; });
        });

    }]);

angular.module('beercatApp.controllers')
    .controller('BeerListCtrl', ['$scope', '$rootScope', '$routeParams', '$cacheFactory', 'Category', 'Style', 'Beer', 'image', function ($scope, $rootScope, $routeParams, $cacheFactory, Category, Style, Beer, image) {
        $rootScope.homePage = false;

        $scope.style = Style.query({styleId: $routeParams.styleId}, function (response) {
            $scope.style = response.data;
        });

        // init paging
        var initPaging = function(){
            var cache = $cacheFactory.get('style_' + $routeParams.styleId);
            // check cache for existing page state
            if (angular.isDefined( cache )) {
                $scope.pageCache = cache;
                $scope.gotoPage( $scope.pageCache.get('currentPage') );

            } else {
                $scope.beersByStyle = Beer.get({styleId: $routeParams.styleId}, function (response) {
                    $scope.beersByStyle = response.data;

                    setPages($routeParams.styleId, response.currentPage, response.numberOfPages, response.totalResults);
                });
            }
        };

        $scope.gotoPage = function(pageNum){
            Beer.get({styleId: $routeParams.styleId, p: pageNum}, function (response) {
                $scope.beersByStyle = response.data;

                setPages($routeParams.styleId, response.currentPage, response.numberOfPages, response.totalResults);
            });
        };

        var setPages = function(styleId, currentPage, numberOfPages, totalResults){
            $scope.pages = {
                currentPage: currentPage,
                numberOfPages: numberOfPages,
                totalResults: totalResults,
                list: _.range(1, numberOfPages + 1)
            };

            managePaginationState( styleId, currentPage );

        };

        var managePaginationState = function(styleId, currentPage){
            if (angular.isUndefined( $cacheFactory.get('style_' + styleId) )) {
                $scope.pageCache = $cacheFactory('style_' + styleId);
            }
            $scope.pageCache.put('currentPage', currentPage);
            // console.log(' $scope.pageCache --> ' + $scope.pageCache.info().id + ': currentPage: ' + $scope.pageCache.get('currentPage') );
        };

        $scope.fallbackProvider = image.fallbackProvider;

        initPaging();
    }]);

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