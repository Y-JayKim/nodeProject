//------------------------variable-------------------------------------

//------------------------------function-----------------------

//-----------------------------interaction----------------------
document.getElementById("loginBut").addEventListener("click",()=>{
    document.location.href = "./location.html";
});

document.getElementById("passInput").addEventListener("keypress",(ev)=>{
    if(ev.keyCode == 13){
    	document.location.href = "./location.html";
    };
});

document.getElementById('register').addEventListener("click",()=>{
    alert("Create Account");
});

document.getElementById('forget').addEventListener('click',()=>{
    alert("Did you forget your password or Username?")
});