const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const request = require('request');
const bodyParser = require('body-parser')

const address_finder = require('./address_finder.js')
const weather_file = require('./public/weather.js');

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
var lat = '49.2834444',
	lng = '-123.1196331',
	username = 'Guest',
	address = '',
	validity = 0;
var userlog = {jay:{password:"123",address:"204-460 Westview St, Coquitlam, BC, Canada"},min:{password:"123",address:"minsu st, vancouver, BC, Canada"},Guest:{}};
//---------------------------------------functions-----------------------------------------------
function readJsonFile() {
	fs.readFile('./username.json', (err, data)=> {
	    if (err) {
	        throw err;
	    }
	    userlog = JSON.parse(data);
	});
}
function writeJsonFile(){
	fs.writeFile('./username.json', JSON.stringify(userlog));
}
//-----------------------------------main page--------------------------------------------------
app.get('/', (request, response) => {
	readJsonFile();
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
				address = request.body.address;
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
	console.log(String(username_check) in userlog);
	console.log(userlog[String(username_check)]);
	if (String(username_check) in userlog && String(password_check) == userlog[String(username_check)].password){
		username = username_check;
		password = password_check;
		validity = validity_check;
		address = userlog[username_check].address;
		response.send('valid');
	}else{
		response.send("invalid");
	}
});

app.get("/register", (request, response) =>{
	response.render("register");
});

// app.post("/register_check", (request, reponse) => {
// 	response.send('valid')
// })
app.get("/findid", (request, response) =>{
	response.render('findid');
});

app.post("/register_check", (request, response) =>{
	user_info = request.body;

	if(!(request.body.username in userlog)){
		userlog[String(user_info.username)]= {password:String(user_info.password),address:String(user_info.address)+', '+ String(user_info.city) +", "+ "BC" +", "+"Canada"};
		console.log(userlog)
		address = String(user_info.address)+', '+ String(user_info.city) +", "+ "BC" +", "+"Canada";
		writeJsonFile();
		response.send('valid');
		
	}else{
   		response.send('invalid');
	}
		

});
//-----------------------------------location page--------------------------------------------------
app.get('/location', (request, response) => {
    response.render('location', {latitu:49.2834511, longitu:-123.1174435});
});

//-----------------------------------weather Page-----------------------------------------------------
app.get('/weather', (request, response) => {
	weather_file.weather(lat, lng).then((result)=>{
		weather_body = result;
		response.render('weather', {summary: weather_body.summary,icon:weather_body.icon,temp:weather_body.temperature,humid:weather_body.humidity,winds:weather_body.windSpeed})
	}).catch((error)=>{
		console.log(error)
	})
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});