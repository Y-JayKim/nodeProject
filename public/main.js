var topButClass = document.getElementsByClassName('top_but');

// ------------------------------functions-------------------------------------------------
function address_check(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/address_check", true);
	xmlhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = () => {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			if(xmlhttp.responseText == "invalid"){
				alert("invalid address.\nPlesae enter again");
			}
			else if(xmlhttp.responseText == "valid"){
				alert('Great!')
				window.location ='/location';
			}
		}
	}
	xmlhttp.send(`address=${document.getElementById("address_input").value}`);
}
// ------------------------------interaction-------------------------------------------------
for (var ind = 0; ind < topButClass.length; ind++){
	document.getElementById(topButClass[ind].id).addEventListener('click',(ev)=>{
		document.getElementById('contact_display').style.display = 'none'
		document.getElementById('about_display').style.display = 'none'
		document.getElementById('main_display').style.display = 'none'
		document.getElementById(ev.target.id + '_display').style.display='block';
	});
};

document.getElementById("address_submit").addEventListener("click",()=>{
	address_check();
});
document.getElementById("address_input").addEventListener('keydown',(ev)=>{
	if(ev.keyCode == 13){
		address_check();
	}
})

//--------------------------------contact map-----------------------------------------------
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 49.283387, lng: -123.115097 },
        zoom: 15
    });
    var messagebox = new google.maps.InfoWindow({ map: map });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        }, ()=> {
            handleLocationError(true, messagebox, map.getCenter());
        });
    } else {
        handleLocationError(false, messagebox, map.getCenter());
    }
}
