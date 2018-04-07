const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const request = require('request');
// const yargs = require('yargs');

// const apis = require('./requesting.js');
// const location = require("./views/location.js");
// const main = require("./views/location.js");
// const signin = require("./views/signin.js");
// const weather = require("./views/weather.js");

var app = express();

const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//------------------------------------------main page ----------------------------------------//

// weather.getAddress(argv.address, (errorMessage, results) =>{
// 	if (errorMessage){
// 		console.log(errorMessage);
// 	} else{
// 		var lat = JSON.stringify(results.lat, undefined, 2),
// 			lng = JSON.stringify(results.lng, undefined, 2);

// 		weather.getWeather(lat, lng, (errorMessage, results) => {
// 			if (errorMessage){
// 				console.log(errorMessage);
// 			} else{
// 				var outcome = results;
// 				console.log(outcome.icon +'\n'+outcome.summary+'\n'+outcome.temperature+'\n'+outcome.pressure);
// 			}
// 		});
// 	}
// });

// // --------------------------location API--------------------------------------------------------------
// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     messagebox.setPosition(pos);
//     messagebox.setContent(browserHasGeolocation ?
//         'Error: The Geolocation service failed.' :
//         'Error: Your browser doesn\'t support geolocation.');
// }

// function getAddress(address, callback) {
//     messagebox.setPosition(pos);
//     request({
//         url: 'https://maps.googleapis.com/maps/api/geocode/json' + '?address=' + encodeURIComponent(address),
//         json: true
//     }, (error, response, body) => {
//         if (error) {
//           callback('Can not connect to google maps');
//         } else if (body.status === 'ZERO_RESULTS') {
//           callback('Can not find requested address');
//         } else if (body.status === 'OK') {
//           var messs_d=body.results[0].formatted_address
//           callback(undefined, body.results[0].formatted_address);
//         }
//     });
//     messagebox.setContent(messs_d);
// };

//------------------------------------------------------------------------------------------------------


app.get('/',(request, response) =>{
	response.render('main.hbs', {root: __dirname })
});

app.get('/signin', (request, response) => {
	response.render('signin.hbs', {root: __dirname })
});

app.get('/location', (request, response) => {
	response.render('location.hbs', {root: __dirname })
});

app.get('/weather', (request, response) => {
	response.render('weather.hbs', {root: __dirname })
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});