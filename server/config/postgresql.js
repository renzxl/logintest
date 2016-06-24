var pg = require('pg');

var sayHelloInEnglish =  function() {
    return "Hello";
};



var setup =  function(config) {
    var conString = config.db;//"postgres://renzxl:password@localhost/renzxl";



        var client = new pg.Client(conString);
       client.connect(function(err) {
           if (err) {
               return console.error('could not connect to postgres', err);
           }
           client.query('SELECT * from user_login', function (err, result) {
               if (err) {
                   return console.error('error running query', err);
               }

               var jsonstring = JSON.stringify(result.rows);
               const object = JSON.parse(jsonstring);
               const util = require('util');
               console.dir(object, {depth: null, colors: true});

               client.end();
               
           });
       });




   };



var AuthenticateUserPassword =  function(user, password,config,callback) {
    var conString = config.db;//"postgres://renzxl:password@localhost/renzxl";
    var searchuser = "'" + user + "'";
    var searchpassword = "'"+ password + "'";


    var client = new pg.Client(conString);
    client.connect();


    var query = client.query('SELECT count(*) validuser from user_login where username= ' + searchuser + ' and password=' + searchpassword);

    query.on('row', function(row, result) {
        //todo add exception handling
        console.log("in postgress");
         result.addRow(row);

       

    });
    query.on('end', function(result) {
        //todo close client connection
        console.log("leaving postgress");
       callback(result);

       

    });



};





module.exports.setup = setup;
module.exports.sayHelloInEnglish = sayHelloInEnglish;
module.exports.AuthenticateUserPassword = AuthenticateUserPassword;






