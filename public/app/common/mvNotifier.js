//wrap toaster inside a service
angular.module('app').value('mvToastr',toastr);

//create notifier service based on toastr
angular.module('app').factory('mvNotifier', function(mvToastr){
    return {
        notify: function(msg){
            mvToastr.success(msg); //have toaster show the message
            console.log(msg);


        }
    }
});