index.controller('index_controller', function($scope, $http, $window, $location,commentFetcher,logout,postTimeCalc,Lightbox,$uibModal) {

    $scope.login = function() {
        $window.location.href = '#/login';
    }

    $scope.logout = function() {
        logout();
    }

    $scope.openLoginModal = function(){
            var modalInstance = $uibModal.open({
                templateUrl: 'partials/index/login.html',
                controller: "login_controller"
            });

            modalInstance.result.then(function () {
                // Redirect to the logged-in area of your site
            }, function () {
                // optional function. Do something if the user cancels.
            });
    };

    $scope.openRegisterModal = function(){
            var modalInstance = $uibModal.open({
                templateUrl: 'partials/index/Register.html',
                controller: "login_controller"
            });

            modalInstance.result.then(function () {
                // Redirect to the logged-in area of your site
            }, function () {
                // optional function. Do something if the user cancels.
            });
    };


    $scope.posts = [];

    (function() {

        $http({
            method: 'GET',
            url: 'https://127.0.0.1:3001/user/' + "aaaaaa",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {

            if (data.err)
                console.log(data.message)
            else
                $scope.posts = data;
            console.log(data)

        });

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
