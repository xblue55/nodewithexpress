var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

var handlebars = require('express3-handlebars').create({defaultLayout : 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//set static diretory
app.use(express.static(__dirname + '/public'));

//dinamic content in view
var fortunes = [
    'Conquer your fears or they will conquer you.',
    'Rivers need springs.',
    'Do not fear what you don\'t know.',
    'You will have a pleasant surprise.',
    'Whenever possible, keep it simple',
];

app.get('/', function(req, res) {
    res.render('home');
})

app.get('/about', function(req, res) {

    console.log(Math.random());
    var randomFortune =  fortunes[Math.floor(Math.random() * fortunes.length)];

    res.render('about', {fortune: randomFortune});
})


// custom 404 page

app.use(function(req, res, next){
    // res.type('text/plain');
    // res.status(404);
    // res.send('404 - Not Found');
    res.status(404);
    res.render('404');
});

// custom 500 page

app.use(function(req, res, next){
    // res.type('text/plain');
    // res.status(500);
    // res.send('500 - Internal server');
    res.status(500);
    res.render('500');
})
app.listen(app.get('port'), function(){
    console.log('Express start on http://localhost:' + app.get('port') + '; press ctrl + c to terminal stop serve');
})