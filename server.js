const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const request = require('request');
const bodyParser = require('body-parser')

const address_finder = require('./address_finder.js')

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
//-----------------------------------------------------------------------------------------------
var lat = '',
	lng = '',
	username = 'Guest',
	address = 'BCIT',
	validity = 0;
//-----------------------------------main page--------------------------------------------------
app.get('/', (request, response) => {
    response.render('main', {
    	validity: validity,
    	username: username,
    	address: address
    });
});

app.post('/address_check', (request, response) => {
	address = request.body.address;
	if(request.body.validity == 1){
		address_finder.getAddress(address, (errorMessage, results) =>{
			if (errorMessage){
				response.send('invalid');
			} else{
				lat = JSON.stringify(results.lat, undefined, 2)
				lng = JSON.stringify(results.lng, undefined, 2)
				response.send('valid');
				validity = 1;
			}
		});
	}else if(request.body.validity == 0){
		validity = 0;
		response.send('reload');
	}
	
	
});
//-----------------------------------signin page--------------------------------------------------
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

//-----------------------------------location page--------------------------------------------------
app.get('/location', (request, response) => {
    response.render('location', { output: request.params.id });
});

app.get('/weather', (request, response) => {
    response.render('weather', { root: __dirname })
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});