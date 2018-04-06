const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
	var time = new Date().toString();
	// console.log(`${time}: ${request.method} ${request.url}`);
	var log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + '\n', (error)=>{
		if (error) {
			console.log('Unable to log message');
		}
	});
	next();
});

app.get('/', (request, response) => {
	// response.send('<h1>Hello Express</h1>');
	response.send({
		name: 'Your Name',
		school: [
			'BCIT',
			'SFU',
			'UBC'
		]
	})
});

// app.get('/',(request, response) =>{
// 	response.render('main.hbs', {root: __dirname })
// });

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