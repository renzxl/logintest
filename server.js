var express = require('express');
       

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//path instead of __dirname
var config = require('./server/config/config')[env];

require('./server/config/express')(app,config);

require('./server/config/passport')(config);

require('./server/config/routes')(app, config);



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
//userDB.addUser('Mike','Johnson','test@gmail.com','horsesfly',config);
//userDB.addUser('John','Doe','Doe@gmail.com','unicorns',config);
//userDB.addUser('Ruth','Boaz','rboaz@gmail.com','sunset',config);



/*passport.serializeUser()*/
//console.log("test %s", userDB.sayHelloInEnglish());


app.listen(config.port);
console.log('Listening on port ' + config.port + '...');