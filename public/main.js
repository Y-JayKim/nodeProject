var topButClass = document.getElementsByClassName('top_but');
var buttonsClass = document.getElementsByClassName('list_buttons');
var address_input = "abc";


//-------------------------functions----------------------------------------------------
function display_choice(option){
	document.getElementById('western_display').style.display = 'none'
	document.getElementById('korean_display').style.display = 'none'
	document.getElementById('chinese_display').style.display = 'none'
	document.getElementById('japanese_display').style.display = 'none'
	document.getElementById('main_display').style.display = 'none'
	document.getElementById(option + '_display').style.display='block';
}

for (var ind = 0; ind < topButClass.length; ind++){
	document.getElementById(topButClass[ind].id).addEventListener('click',(ev)=>{
		display_choice(ev.target.id);
	});
};

for (var buttonInd = 0; buttonInd < buttonsClass.length; buttonInd++){
	document.getElementById(buttonsClass[buttonInd].id).addEventListener('click',()=>{
		document.getElementById("login_option").style.display = 'block';
		document.getElementById('login_option').style.zIndex = '1';
	});
};
 
 // -----------------------features inside -----------------------------------------------------
document.getElementById('address_submit').addEventListener('click', ()=>{
	if(document.getElementById('address_input').value == ""){
		alert("Empty Value!");
	}else{
		alert("Thank you for entering your address")
		address_input = document.getElementById('address_input').value;
	}
});

// --------------------------options for next page ----------------------------------------
document.getElementById('signIn').addEventListener('click', ()=>{
	document.location.href = "./signin";
});

document.getElementById('guest').addEventListener('click', ()=>{
	if(address_input == "abc"){
		alert("Please enter your address in order to use guest")
	}else{
		display_choice("main");
		document.location.href = "./location";
	}
	
});

document.getElementById('close').addEventListener('click', ()=>{
	document.getElementById('login_option').style.display="none";
});