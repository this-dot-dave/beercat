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