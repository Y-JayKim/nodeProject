var info = [];
var strInfo = "";
var localname = localStorage.getItem("name");
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
    for (var l = 0; l < localStorage.length; l++) {
        if(localStorage.key(l)==document.getElementById("username").value){
            alert("The username is already exist");
            return false;
        }
    }
    if(username.value.indexOf(';') > -1){
        alert("You cannot use ';' for your username");
        return false;
    }
    if(username.value=='whoIsLogging' ||username.value=="justClicked"||username.value=="guest"){
        alert("Please use other username")
        return false;
    }
    return true;
}

function localSaving(){
    for(var i in document.getElementsByClassName("q")){
        if(document.getElementById(i) !=null){
            info.push(document.getElementById(i).value);
            strInfo = info.join(';')
        }
    }
    localStorage.setItem(info[2],strInfo);
    localStorage.setItem('whoIsLogging','');
    localStorage.setItem('whoIsLogging',info[2]);   

}
//------------------interaction-------------------------------
document.getElementById("submit").addEventListener("click",function(){
    if(errorTest()){
        localSaving();
        document.location.href = "../login.html";
    }
})
