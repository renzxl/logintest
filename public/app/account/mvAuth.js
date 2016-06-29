angular.module('app').factory('mvAuth', function($http,mvIdentity,$q, mvuser){ //added in the $q service so that promise in the controller can be used
    return{
        authenticateUser: function(username, password){
            var dfd = $q.defer();
            $http.post('/login',{username: username, password: password}).then(function(response){
                if (response.data.success){

                    var user = new mvuser();
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = user; //this will give the current user and isAdmin function
                    dfd.resolve(true);

                }else{

                    dfd.resolve(false);

                }
            });
            return dfd.promise;
        },

        logoutUser: function(){
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        }
    }
});