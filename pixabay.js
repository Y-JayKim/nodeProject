const request = require('request');

var API_KEY = '7246674-b37ac3e55b379cef1f626bb09';

var pixa = (item) => {
        // return new Promise
        return new Promise((resolve, reject) => {
            request({
                url: "https://pixabay.com/api/?username=mjweaver01&key=1631539-db8210cabd2636c6df59812df&q=" + encodeURIComponent(item) + "&image_type=photo",
                // url: "https://pixabay.com/api/?key="+'7246674-b37ac3e55b379cef1f626bb09'+"&q="+encodeURIComponent(item)
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject('Cannot connect');
                } else if (body.status == 'ZERO_RESULTS') {
                    reject('Cannot find');
                } else if (body.status == 'OK') {
                    resolve({
                        body
                    })
                }
            });
        });
    };

module.exports = {
    pixa
}