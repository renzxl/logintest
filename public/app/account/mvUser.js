angular.module('app').factory('mvuser', function($resource){//this sets up resources for role level security

    var UserResource = $resource('/api/users/:id',{_id: "@id"});

    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return UserResource;
});