//------------------------variable-------------------------------------

//------------------------------function-----------------------

//-----------------------------interaction----------------------
document.getElementById("loginBut").addEventListener("click",()=>{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/login_input", true);
	xmlhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = () => {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			if(xmlhttp.responseText == "invalid"){
				alert("Invalid username or Password");
			}
		}
	}
	xmlhttp.send(`id_input=${document.getElementById("idInput").value}&pass_input=${document.getElementById("passInput").value}`);
});

document.getElementById('register').addEventListener("click",()=>{
    alert("Create Account");
});

document.getElementById('forget').addEventListener('click',()=>{
    alert("Did you forget your password or Username?")
});