var express = require('express'),
           passport= require('passport'),
            LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//path instead of __dirname
var config = require('./server/config/config')[env];

require('./server/config/express')(app,config);

require('./server/config/routes')(app);

var userDB = require('./server/config/postgresql');
userDB.setup(config);


/*var checkout = userDB.AuthenticateUserPassword('thans@gmail.com','password', config,function(result){
    console.log("in passport");
    var jsonstring = JSON.stringify(result.rows);
    const object = JSON.parse(jsonstring);
    const util = require('util');
    console.dir(object, {depth: null, colors: true});
    if (result.rows.length != 0){
        console.log("username: " + result.rows[0]["username"]);
    }
    else {
        console.log("no user found");
    }
});*/


passport.use(new LocalStrategy(
    function(username, password, done){
        userDB.AuthenticateUserPassword(username,password, config,function(result) {
            var user;
            if (result.rowCount > 0) {
                 user = JSON.stringify(result.rows);
            }
            if (user){

                return done(null,user);
            }
            else{
                return done(null, false);
            }

       });

    }
));

passport.serializeUser(function(user, done ){


   if (user){
       var object = JSON.parse(user);
       var id = object[0].username;
       done(null, id);//rows[0]["username"] )
   }
});

passport.deserializeUser(function(username,done){
        userDB.AuthenticateUserPassword(username,"password", config,function(result) {
            var user = JSON.stringify(result.rows);
            console.dir(user);

            if (user.length != 0) {

                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });

});
/*passport.serializeUser()*/
//console.log("test %s", userDB.sayHelloInEnglish());


app.listen(config.port);
console.log('Listening on port ' + config.port + '...');