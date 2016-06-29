//store current user and keep the fact that the user is logged in
angular.module('app').factory('mvIdentity', function ($window,mvuser) {

        var currentUser;
        if(!!window.bootstrappedUserObject){
            currentUser = new mvuser();
            angular.extend(currentUser, $window.bootstrappedUserObject);
        }
        return {
            currentUser: currentUser,
            isAuthenticated: function(){ //checks for if we have a logged-in user
                return !! this.currentUser;

            }
        }



});