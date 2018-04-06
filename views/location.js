const request = require('request');

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 49.283387, lng: -123.115097 },
        zoom: 12
    });
    var messagebox = new google.maps.InfoWindow({ map: map });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var str_pos = JSON.stringify(position.coords.latitude + ',' + position.coords.longitude);

            getAddress(str_pos, (errorMessage, results) => {
                if (errorMessage) {
                  var mesg_response = JSON.stringify(errorMessage);
                } else {
                  var mesg_response = JSON.stringify(results);
                }
            });
            messagebox.setPosition(pos);
            // messagebox.setContent(mesg_response);
            map.setCenter(pos);

        }, function() {
            handleLocationError(true, messagebox, map.getCenter());
        });
    } else {
        handleLocationError(false, messagebox, map.getCenter());
    }
}