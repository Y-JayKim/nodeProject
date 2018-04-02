const express = require('express');
const request = require('request');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

//base server
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/',(request, response) =>{
	response.sendFile('public/main.html', {root: __dirname })
});

app.get('/signin', (request, response) => {
	response.sendFile('public/signin.html', {root: __dirname })
});

app.get('/location', (request, response) => {
	response.sendFile('public/location.html', {root: __dirname })
});

app.get('/weather', (request, response) => {
	response.sendFile('public/weather.html', {root: __dirname })
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});