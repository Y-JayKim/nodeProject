const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const request = require('request');
const bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response, next) => {
    response.render('main', { condition: true });
});

app.post('/address_input', (request, response) => {
	console.log(request.body.add_input);
    var address = request.body.add_input;

});
app.get('/signin', (request, response) => {
    response.render('signin');
});

app.post('/login_input', (request, response) => {
	username = request.body.id_input;
	password = request.body.pass_input;
	console.log(username);
	console.log(password);
	response.send("invalid");
});
app.get('/location', (request, response) => {
    response.render('location.hbs', { output: request.params.id });
});

app.get('/weather', (request, response) => {
    response.render('weather.hbs', { root: __dirname })
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});