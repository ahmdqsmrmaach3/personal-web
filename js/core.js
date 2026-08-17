const aiCore=document.getElementById("aiCore");
const coreMessage=document.getElementById("coreMessage");

const messages=[

"SCANNING USER...",

"VERIFYING SYSTEM...",

"NETWORK STABLE",

"LOADING PROFILE",

"SYNC COMPLETED",

"MEMORY LINKED",

"AI READY",

"ACCESS VERIFIED"

];

function randomMessage(){

    aiCore.classList.add("show");

    coreMessage.textContent=
    messages[Math.floor(Math.random()*messages.length)];

    setTimeout(()=>{

        aiCore.classList.remove("show");

    },2800);

}

setInterval(randomMessage,7000);

setTimeout(randomMessage,2000);