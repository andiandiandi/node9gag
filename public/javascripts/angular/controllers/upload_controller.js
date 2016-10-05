index.controller('upload_controller', function($scope, $http, Upload, $timeout, $window,logout,Lightbox) {

    $scope.imageConfig = {
        min_height: 100,
        max_height: 1000,
        min_width: 100,
        max_width: 1000
    };

    $scope.uploadPic = function(file) {

        file.upload = Upload.upload({
            url: 'https://127.0.0.1:3001/upload',
            data: {
                title: $scope.title,
                file: file
            },
        });

        file.upload.then(function(response) {
            if (response.data.valid){
                $window.location.href = '/#/user/' + response.data.username;
              }
            $timeout(function() {
                file.result = response.data;
            });
        }, function(response) {
            if (response.status > 0)
                $scope.status = response.title;
        }, function(evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }
    $scope.status = "";

    $scope.click = function(){
      document.getElementById('selectedFile').click();
    }


    $scope.imageInserted = false;

    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.imageInserted = true;
        }
    });

    $scope.dropImage = function(){
      $scope.file=undefined;
      $scope.imageInserted = false;
    }


});
