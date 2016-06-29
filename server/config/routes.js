//tips for route file: This file should not do a whole lot of logic. For example, the following would be too much logic.
/* To simplify - moved logic to auth.js

         app.post('/login', function(req, res,next){
             var auth = passport.authenticate('local', function(err, user){
                 if (err) { return next(err);}
                 if (!user) {res.send({success:false})}
                 req.logIn(user, function(err){
                 if(err) { return next(err);}
                 res.send({success:true, user: user});

                });

             });
             auth(req, res, next);

         });

 */
var auth = require('./auth');

module.exports = function(app, config, userDB){
    //add routes

    app.get('/api/users', auth.requiresAPILogin, function(req, res){//protect user authorization on the server side

        var userDB = require('./postgresql');
        userDB.setup(config);

        userDB.FindAll(config,function(result){
            var collection = null;
            if (result.rowCount > 0) {
                collection  = JSON.stringify(result.rows);

            }
            res.send(collection);
        });


    });
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);//pass in the function auth.authenticate
    app.post('/logout', function(req, res){
        req.logout(); //added by the passport module
        res.end();
    });//pass in the function auth.authenticate

    app.get('*', function (req,res) {

        res.render('index',{
            bootstrappedUser: req.user //this provides the index page with the server's req.user
        });


    }); //matches all routes. The application will deliver the index page for any route you don't have specified
};
