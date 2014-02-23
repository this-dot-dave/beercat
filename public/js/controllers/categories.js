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