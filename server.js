const express = require('express');
const request = require('request');
const fs = require('fs');

//base server
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/',(request, response) =>{
	response.send('<script>window.location.href = "http://localhost:8080/main.html"</script>');
});

app.listen(8080, () => {
    console.log('Server is up on the port 8080');
});