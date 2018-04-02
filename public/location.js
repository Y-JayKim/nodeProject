function initMap(lati=49.2829581, lngi=-123.1181001) {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: {lat: lati , lng: lngi}
        });

        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
        
        var marker = new google.maps.Marker({
          position: map.center,
          map: map,
        });
}

document.getElementById('address').addEventListener('keyup',(ev)=>{
    if(ev.keyCode==13){
        initMap(49.249126,-122.8909287);
    }
});

document.getElementById('submit').addEventListener("click",()=>{
	document.location.href = "./weather.html";
});