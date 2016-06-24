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


var checkout = userDB.AuthenticateUserPassword('thanks@gmail.com','password', config,function(result){
    console.log("in passport");
    var jsonstring = JSON.stringify(result.rows);
    const object = JSON.parse(jsonstring);
    const util = require('util');
    console.dir(object, {depth: null, colors: true});

});

/*
passport.use(new LocalStrategy(
    function(username, password, done){
       userDB.AuthenticateUserPassword(username,password).exec(function(err,result){
           console.log("in passport")
       });

    }
))

passport.serializeUser()*/
console.log("test %s", userDB.sayHelloInEnglish());


app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
