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