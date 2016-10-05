// declare a module
var index = angular.module('index', ["ngRoute", "ngFileUpload","bootstrapLightbox","ngMessages",'ui.bootstrap']);

index.config(['$routeProvider', function($routeProvider) {
    $routeProvider.

    when('/', {
        templateUrl: "partials/index/index.html",
        controller: 'index_controller'
    }).

    when('/login', {
        templateUrl: "partials/index/login.html",
        controller: 'login_controller'
    }).

    when('/upload', {
        templateUrl: "partials/index/upload.html",
        controller: 'upload_controller'
    }).

    when('/user/:username', {
        templateUrl: "partials/index/user.html",
        controller: 'user_controller'
    }).

    when('/post/:postID', {
        templateUrl: "partials/index/post.html",
        controller: 'post_controller'
    }).

    otherwise({
        redirectTo: '/'
    });

}]);






index.service('commentFetcher', ['$http', function($http) {

    this.getComments = function(id) {

        return $http({
            method: 'GET',
            url: 'https://127.0.0.1:3001/comment/' + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(response) {
            return response.data;

        });

    }

}]);

index.service("logout", ["$http","$window", function($http,$window) {

    return function() {

         $http({
            method: 'POST',
            url: 'https://127.0.0.1:3001/logout',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
                if(data.valid)
                  $window.location.href = '/';
        });
    }

}]);

index.service("postTimeCalc",function() {



      return function(postTime_ms) {

          var diff = (new Date().getTime() - postTime_ms) / 1000;

          if (diff / 60 > 0 && diff / 60 < 60)
              return Math.floor(diff / 60) + " min";
          else if (diff / 60 * 60 > 0 && diff / (60 * 60) < 24)
              if (Math.floor(diff / (60 * 60)) <= 1)
                  return Math.floor(diff / (60 * 60)) + " hour";
              else
                  return Math.floor(diff / (60 * 60)) + " hours";
          else if (diff / 60 * 60 * 24 > 0 && diff / (60 * 60 * 24) < 24)
              if (Math.floor(diff / (60 * 60 * 24)) <= 1)
                  return Math.floor(diff / (60 * 60 * 24)) + " day";
              else
                  return Math.floor(diff / (60 * 60 * 24)) + " days";

      }

});

index.config(function (LightboxProvider) {
  LightboxProvider.getImageUrl = function (post) {
    return post.imagePath;
  };

  LightboxProvider.getImageCaption = function (post) {
    return post.title;
  };

  LightboxProvider.templateUrl = 'partials/lightbox/lightbox_template.html';

   LightboxProvider.fullScreenMode = true;

});
