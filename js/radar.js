const radar = document.getElementById("radarCanvas");
const rctx = radar.getContext("2d");
const radarText = document.getElementById("radarText");

radar.width = 180;
radar.height = 180;

let angle = 0;

const dots = [];

for(let i=0;i<10;i++){

    dots.push({

        angle:Math.random()*Math.PI*2,

        radius:20+Math.random()*60,

        alpha:Math.random()

    });

}

const statusList=[

"SCANNING...",
"TARGET FOUND",
"NO SIGNAL",
"TRACKING...",
"LINK STABLE"

];

setInterval(()=>{

    radarText.textContent =
    statusList[Math.floor(Math.random()*statusList.length)];

},3500);

function drawRadar(){

    rctx.clearRect(0,0,180,180);

    const cx=90;
    const cy=90;

    // Lingkaran
    rctx.strokeStyle="rgba(255,0,60,.25)";
    rctx.lineWidth=1;

    for(let i=1;i<=3;i++){

        rctx.beginPath();
        rctx.arc(cx,cy,i*25,0,Math.PI*2);
        rctx.stroke();

    }

    // Garis silang
    rctx.beginPath();
    rctx.moveTo(90,0);
    rctx.lineTo(90,180);
    rctx.moveTo(0,90);
    rctx.lineTo(180,90);
    rctx.stroke();

    // Sweep
    angle+=0.02;

    const grad = rctx.createRadialGradient(cx,cy,0,cx,cy,90);

    grad.addColorStop(0,"rgba(255,0,60,.35)");
    grad.addColorStop(1,"rgba(255,0,60,0)");

    rctx.save();

    rctx.translate(cx,cy);
    rctx.rotate(angle);

    rctx.fillStyle=grad;

    rctx.beginPath();

    rctx.moveTo(0,0);

    rctx.arc(0,0,90,-0.08,0.08);

    rctx.closePath();

    rctx.fill();

    rctx.restore();

    // Titik target
    dots.forEach(dot=>{

        const x = cx + Math.cos(dot.angle)*dot.radius;
        const y = cy + Math.sin(dot.angle)*dot.radius;

        dot.alpha += 0.03;

        if(dot.alpha>1){

            dot.alpha=.2;

        }

        rctx.beginPath();

        rctx.arc(x,y,2,0,Math.PI*2);

        rctx.fillStyle=`rgba(255,255,255,${dot.alpha})`;

        rctx.fill();

    });

    requestAnimationFrame(drawRadar);

}

drawRadar();