const request = require('request');

var weather = (lat, lng) => {
	return new Promise((resolve, reject)=> {
		request({
		    url: 'https://api.darksky.net/forecast/fb2d78ddaa5b88137bda186278187c8d/'+lat+','+lng,
		    json: true
		}, (error, response, body) => {
			if (error){
				reject('Cannot connect to Darksky.net');
				//console.log('Cannot connnect to Google Maps');
			}else if(body.code == 400){
				reject('Cannot find weather form the address');
				//console.log('Cannot find requested address');
			}else{
				resolve(body.currently);
			}
		});
	});
};

module.exports = {
	weather
}