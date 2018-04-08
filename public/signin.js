//------------------------variable-------------------------------------

//------------------------------function-----------------------
function login_submit(validity){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/login_input", true);
	xmlhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = () => {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			if(xmlhttp.responseText == "invalid"){
				alert("Invalid username or Password");
			}
			else if(xmlhttp.responseText == "valid"){
				alert('It is Valid');
				window.location = '/';
			}
		}
	}
	xmlhttp.send(`id_input=${document.getElementById("idInput").value}&pass_input=${document.getElementById("passInput").value}&validity=${validity}`);
}

//-----------------------------interaction----------------------
document.getElementById("loginBut").addEventListener("click",()=>{
	login_submit(1);
});

document.getElementById('register').addEventListener("click",()=>{
    window.location="/register";
});
document.getElementById('forget').addEventListener("click",()=>{
    window.location="/findid";
});

document.getElementById('forget').addEventListener('click',()=>{
    alert("Did you forget your password or Username?")
});