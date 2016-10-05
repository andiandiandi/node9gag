index.controller('post_controller', function($scope, $http, $window, $routeParams,postTimeCalc) {

    $scope.posts = [];

    (function(username) {

        $http({
            method: 'GET',
            url: 'https://127.0.0.1:3001/post/' + $routeParams.postID
        }).success(function(data) {

            $scope.posts = data;

        })


    })();

    $scope.getTime = postTimeCalc;

});
