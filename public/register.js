
var info = [];
var strInfo = "";
var username = document.getElementById("username");
//-----------------------------function----------------------
function errorTest(){
    if(parseInt(document.getElementById("day").value)>31 || parseInt(document.getElementById("year").value)>2010){
        alert("Wrong Brithday Input")
        return false;
    }
    for(var i in document.getElementsByClassName("q")){
        if(document.getElementById(i) !=null){
            if(document.getElementById(i).value == ''){
                alert("You have to fill everything out");
                return false;
            } 
        }    
    }
    if(document.getElementById("password1").value != document.getElementById("password2").value){
        alert("These passwords don't match");
        return false;
    }
    if(username.value.indexOf(';') > -1){
        alert("You cannot use ';' for your username");
        return false;
    }
    if(username.value=="guest" || username.value=="Guest" ){
        alert("Username cannot be guest please use other")
        return false;
    }
    return true;
}

function login_submit(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/register_check", true);
    xmlhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            if(xmlhttp.responseText == "invalid"){
                alert("Invalid username please use other username");
            }
            else{
                window.location = '/signin';
            }
        }
    }
    xmlhttp.send(`username=${document.getElementById("username").value}&password=${document.getElementById("password1").value}`);
}
//------------------interaction-------------------------------
document.getElementById('submit').addEventListener('click',()=>{
    if(errorTest()){
        login_submit();
    }
});