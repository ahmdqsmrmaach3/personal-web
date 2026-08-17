const busCanvas = document.getElementById("busCanvas");
const busCtx = busCanvas.getContext("2d");

let busPaths = [];
let packets = [];

function resizeBus() {

    busCanvas.width = window.innerWidth;
    busCanvas.height = window.innerHeight;

    createBusPaths();
}


function createBusPaths() {

    const w = busCanvas.width;
    const h = busCanvas.height;

    /*
        Jalur dibuat berdasarkan ukuran layar.
        Jadi tetap cocok di HP maupun laptop.
    */

    busPaths = [

        [
            {x: -50, y: h * 0.20},
            {x: w * 0.18, y: h * 0.20},
            {x: w * 0.18, y: h * 0.32},
            {x: w * 0.42, y: h * 0.32},
            {x: w * 0.42, y: h * 0.18},
            {x: w * 0.72, y: h * 0.18},
            {x: w * 0.72, y: h * 0.27},
            {x: w + 50, y: h * 0.27}
        ],


        [
            {x: w + 50, y: h * 0.48},
            {x: w * 0.78, y: h * 0.48},
            {x: w * 0.78, y: h * 0.58},
            {x: w * 0.55, y: h * 0.58},
            {x: w * 0.55, y: h * 0.45},
            {x: w * 0.25, y: h * 0.45},
            {x: w * 0.25, y: h * 0.52},
            {x: -50, y: h * 0.52}
        ],


        [
            {x: -50, y: h * 0.76},
            {x: w * 0.15, y: h * 0.76},
            {x: w * 0.15, y: h * 0.66},
            {x: w * 0.38, y: h * 0.66},
            {x: w * 0.38, y: h * 0.82},
            {x: w * 0.65, y: h * 0.82},
            {x: w * 0.65, y: h * 0.70},
            {x: w + 50, y: h * 0.70}
        ],


        [
            {x: w * 0.05, y: -50},
            {x: w * 0.05, y: h * 0.25},
            {x: w * 0.12, y: h * 0.25},
            {x: w * 0.12, y: h * 0.55},
            {x: w * 0.08, y: h * 0.55},
            {x: w * 0.08, y: h + 50}
        ]

    ];
}


function drawPath(path) {

    busCtx.beginPath();

    busCtx.moveTo(
        path[0].x,
        path[0].y
    );


    for(let i = 1; i < path.length; i++){

        busCtx.lineTo(
            path[i].x,
            path[i].y
        );

    }


    busCtx.strokeStyle =
        "rgba(255,255,255,0.09)";

    busCtx.lineWidth = 1;

    busCtx.stroke();
}


function createPacket(pathIndex) {

    packets.push({

        path: pathIndex,

        segment: 0,

        progress: 0,

        speed:
            0.0015 +
            Math.random() * 0.0015

    });

}


for(let i = 0; i < 7; i++){

    createPacket(
        i % 4
    );

}


function movePacket(packet) {

    const path =
        busPaths[packet.path];


    if(!path || path.length < 2)
        return;


    const start =
        path[packet.segment];


    const end =
        path[packet.segment + 1];


    packet.progress +=
        packet.speed;


    if(packet.progress >= 1){

        packet.progress = 0;

        packet.segment++;

        if(packet.segment >= path.length - 1){

            packet.segment = 0;

        }

    }


    const x =
        start.x +
        (end.x - start.x) *
        packet.progress;


    const y =
        start.y +
        (end.y - start.y) *
        packet.progress;


    busCtx.beginPath();

    busCtx.arc(
        x,
        y,
        2.2,
        0,
        Math.PI * 2
    );


    busCtx.fillStyle =
        "rgba(255,255,255,0.65)";

    busCtx.shadowBlur = 8;

    busCtx.shadowColor =
        "rgba(255,255,255,0.5)";

    busCtx.fill();

    busCtx.shadowBlur = 0;

}


function drawBus(){

    busCtx.clearRect(
        0,
        0,
        busCanvas.width,
        busCanvas.height
    );


    for(const path of busPaths){

        drawPath(path);

    }


    for(const packet of packets){

        movePacket(packet);

    }


    requestAnimationFrame(drawBus);

}


resizeBus();

window.addEventListener(
    "resize",
    resizeBus
);


drawBus();