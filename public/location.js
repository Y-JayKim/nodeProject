var map;
var infowindow;

function initMap() {
    var pyrmont = { lat: 49.283387, lng: -123.115097 };

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pyrmont,
        radius: 500,
        type: ['restaurant']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);

        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name+
            '<button onclick="myFunction()">SELECT</button>');
        infowindow.open(map, this);
        // addtodiv(place)
    });
}

function myFunction() {
    infowindow.setContent('<div style="background-color: yellow">' + infowindow.getContent() + "</div>");
  // var newDiv = document.createElement("div");
  // var newContent = document.createTextNode("Hi there and greetings!");

  // newDiv.appendChild(newContent);

  // document.getElementById('explanation').appendChild(newDiv);
}

function addtodiv(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    var newDiv = document.createElement("div");
    var newContent = document.createTextNode(place.name);
    newDiv.appendChild(newContent);
    document.getElementById('explanation').appendChild(newDiv);
}
