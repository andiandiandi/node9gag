index.controller('login_controller', function($scope,$http,$httpParamSerializer,$window) {
    $scope.formData = {};

    $scope.submit_form_login = function(formData) {
      $http({
        method: 'POST',
        url: 'https://127.0.0.1:3001/login',
        data: $httpParamSerializer(formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function(data){

          if(data.valid){
          $window.location.href = '/';
          }
          else
            $scope.status = data.message;

      })

    };


    $scope.register_config = {
        username: {
            min: 2,
            max: 10
        },
        password: {
            min: 1,
            max: 20
        }
    }

    $scope.formData_register = {
      username: "",
      password: ""
    }

    $scope.submit_form_register = function(formData) {

        $http({
            method: 'POST',
            url: 'https://127.0.0.1:3001/register',
            data: $httpParamSerializer(formData),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {

          if(data.valid)
            $window.location.href = data.redirect || "/";
          else
            $scope.status = data.message;


        })

    };



});
