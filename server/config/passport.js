var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;




module.exports = function(config){
    var userDB = require('./postgresql');
    userDB.setup(config);

    passport.use(new LocalStrategy(
        function(username, password, done){
            userDB.FindOne(username,password, config,function(result) {
                var user;
                if (result.rowCount > 0) {
                    user = JSON.stringify(result.rows);
                }
                if (user && userDB.checkUserPassword(user, password)){

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
            var pwd = object[0].password;
            done(null, id);//rows[0]["username"] )
        }
    });

    passport.deserializeUser(function(id, done){

        userDB.FindOne(id,null, config,function(result)
        {
            var user;
            var err = null;
            if (result) {
                if (result.rowCount > 0) {
                    user = JSON.stringify(result.rows);
                }
                else {user = null;
                    err = "cannot get user information"}
            }
            else{
                err = "cannot find user: " + id}



            done(err,user);

        });
    });
};


