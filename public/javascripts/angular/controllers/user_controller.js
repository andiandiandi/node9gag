index.controller('user_controller', function($scope, $http, $window, $routeParams, $location,commentFetcher,postTimeCalc,Lightbox) {

    $scope.posts = [];
    $scope.currentUser;
    (function(username) {
      $scope.currentUser=$routeParams.username;
        $http({
            method: 'GET',
            url: 'https://127.0.0.1:3001/user/' + $routeParams.username
        }).success(function(data) {

            $scope.posts = data;

        })


    })();

    $scope.getTime = postTimeCalc;

    $scope.comments = [];

    $scope.getComments = function(id) {

      if ($scope.postID != id) {
          $scope.comments = [];
          $scope.postID = id;
          commentFetcher.getComments(id).then(function(data) {
            $scope.comments = data.data.comments;
          });
      }

    }

    $scope.postID;
    $scope.username;

    $scope.showComments = function() {
        return Object.keys($scope.username).length > 0 && $scope.postID;
    }

    $scope.$on('$locationChangeStart', function(event) {
        $scope.postID = undefined;
    });

    $scope.openLightboxModal = function (index) {
      Lightbox.openModal($scope.posts, index);
    };


});
