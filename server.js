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
var userlog = '',
	userlog1 = '{"jay":"123"}';
//---------------------------------------functions-----------------------------------------------
function readJsonFile(inputFile) {
 //    fs.readFile(inputFile, (err, data) =>{
	//     if (err) {
	//         throw err;
	//     }
	//     userlog = JSON.parse(data);
	//     console.log(typeof userlog);   
	// })
	userlog = JSON.parse(userlog1);
}
//-----------------------------------main page--------------------------------------------------
app.get('/', (request, response) => {
	readJsonFile(__dirname + '/username.json');
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
	readJsonFile(__dirname + '/username.json');
    response.render('signin');
});

app.post('/login_input', (request, response, next) => {
    username_check = request.body.id_input;
	password_check = request.body.pass_input;
	validity_check = request.body.validity;
	console.log(userlog[username_check]);
	if (String(username_check) in userlog && String(password_check) == userlog[username_check]){
		username = username_check;
		password = password_check;
		validity = validity_check;
		response.send('valid');
	}else{
		response.send("invalid");
	}
});

app.get("/register", (request, response) =>{
	response.render("register");
});

app.post("/register_check", (request, reponse) => {
	reponse.send('valid')
})
app.get("/findid", (request, response) =>{
	response.render('findid');
});
//-----------------------------------location page--------------------------------------------------
app.get('/location', (request, response) => {
    response.render('location', {latitu:49.2834511, longitu:-123.1174435});
});

app.get('/weather', (request, response) => {
    response.render('weather', { root: __dirname })
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});