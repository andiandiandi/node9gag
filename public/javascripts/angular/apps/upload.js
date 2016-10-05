// declare a module
var upload = angular.module('upload', ["ngRoute","ngFileUpload"]);

upload.config(['$routeProvider', function($routeProvider) {
    $routeProvider.

    when('/', {
        templateUrl: "partials/upload/upload.html",
        controller: 'upload_controller'
    }).


    otherwise({
        redirectTo: '/'
    });

}]);
