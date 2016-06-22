var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser');



//var pg = require('pg');

//var conString = "postgres://renzxl:password@localhost/renzxl";

//var client = new pg.Client(conString);
//client.connect(function(err) {
//    if(err) {
//        return console.error('could not connect to postgres', err);
//    }
//     client.query('SELECT * from company', function(err, result) {
//        if(err) {
//            return console.error('error running query', err);
//        }
//        var jsonstring = JSON.stringify(result.rows);
//        const object = JSON.parse(jsonstring);
//        const util = require('util') ;
//        console.dir(object,{depth: null, colors:true});
//        //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//        client.end();
//    });
//});




var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(express.static(__dirname + '/public'));

//add routes
app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function (req,res) {

    res.render('index');


}); //matches all routes. The application will deliver the index page for any route you don't have specified


var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
