var pg = require('pg'),
    crypto = require('crypto'); //cryptography module built into node


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
               //console.dir(object, {depth: null, colors: true});

               client.end();
               
           });
       });




   };

var checkUserPassword =  function(user, passwordToMatch) {
    var match = false;
    var jsonContent = JSON.parse(user);
    if (jsonContent[0].salt){
        var hashpasswordcheck = hashPwd(jsonContent[0].salt, passwordToMatch);
        var user_pwd = jsonContent[0].hashed_pwd;
        match =  hashPwd(jsonContent[0].salt, passwordToMatch) === jsonContent[0].hashed_pwd;
    }

    return match;
};

var FindOne =  function(user, password,config,callback) {
    var conString = config.db;
    var searchuser = "'" + user + "'";
    var searchpassword = "'"+ password + "'";


    var client = new pg.Client(conString);
    client.connect();

    var querystring = 'SELECT * from user_login where username= ' + searchuser;
    var query = client.query(querystring);

    query.on('row', function(row, result) {
        //todo add exception handling
        //console.log("in postgress");
         result.addRow(row);

       

    });
    query.on('end', function(result) {
        //todo close client connection
        console.log("leaving postgress");
       // client.end();
       callback(result);

       

    });



};

var FindAll =  function(config,callback) {
    var conString = config.db;
    


    var client = new pg.Client(conString);
    client.connect();

    var querystring = 'SELECT * from user_login';
    var query = client.query(querystring);

    query.on('row', function(row, result) {
        //todo add exception handling
        //console.log("in postgress");
        result.addRow(row);



    });
    query.on('end', function(result) {
        //todo close client connection
        console.log("leaving postgress");
        // client.end();
        callback(result);



    });



};

var addUser = function(firstName, lastName, userName, pwd,config){
    //todo return success or failure
    var conString = config.db;
    var client = new pg.Client(conString);
    client.connect();

    var salt, hash;
    salt=createSalt();
    hash=hashPwd(salt,pwd);
    client.query("INSERT INTO user_login(firstname, lastname, username, password, salt, hashed_pwd) values($1, $2, $3, $4, $5, $6)",
        [firstName, lastName, userName, pwd, salt, hash],function(err, res){
            if (err){
                console.log(err);
            }
            else
                console.log('User Created Successfully');

        });
    client.end();
};



function createSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();

}


module.exports.setup = setup;
module.exports.sayHelloInEnglish = sayHelloInEnglish;
module.exports.FindOne = FindOne;
module.exports.addUser = addUser;
module.exports.checkUserPassword = checkUserPassword;
module.exports.FindAll = FindAll;








