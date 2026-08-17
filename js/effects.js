const coordinate =
document.getElementById("coordinates");


function updateCoordinates(){

    let x =
    Math.floor(Math.random()*999);


    let y =
    Math.floor(Math.random()*999);



    coordinate.innerHTML =

    `X:${x} Y:${y}`;

}



setInterval(

updateCoordinates,

700

);