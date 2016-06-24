angular.module('app').controller('mvNavBarLoginCtrl',function($scope){
    $scope.signin = function(username, password){
        console.log("I'm your signin function");
    }
});