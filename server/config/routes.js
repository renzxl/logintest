
module.exports = function(app){
    //add routes
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.get('*', function (req,res) {

        res.render('index');


    }); //matches all routes. The application will deliver the index page for any route you don't have specified
};
