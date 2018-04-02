var topButClass = document.getElementsByClassName('top_but');
var buttonsClass = document.getElementsByClassName('buttons');
// is this okay to use?
for (var ind = 0; ind < topButClass.length; ind++){
	document.getElementById(topButClass[ind].id).addEventListener('click',(ev)=>{
		document.getElementById('food_display').style.display = 'none'
		document.getElementById('etc1_display').style.display = 'none'
		document.getElementById('etc2_display').style.display = 'none'
		document.getElementById('etc3_display').style.display = 'none'
		document.getElementById('main_display').style.display = 'none'
		document.getElementById(ev.target.id + '_display').style.display='block';
	});
};

for (var buttonInd = 0; buttonInd < buttonsClass.length; buttonInd++){
	document.getElementById(buttonsClass[buttonInd].id).addEventListener('click',()=>{
		document.getElementById("login_option").style.display = 'block';
		document.getElementById('login_option').style.zIndex = '1';
	});
};
 
document.getElementById('signIn').addEventListener('click', ()=>{
	document.location.href = "./signin.html";
});

document.getElementById('guest').addEventListener('click', ()=>{
	document.location.href = "./location.html";
});

document.getElementById('close').addEventListener('click', ()=>{
	document.getElementById('login_option').style.display="none";
})