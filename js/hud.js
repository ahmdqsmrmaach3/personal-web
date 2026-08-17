const hud = document.getElementById("hudCanvas");
const hctx = hud.getContext("2d");

function resizeHUD(){

    hud.width = window.innerWidth;
    hud.height = window.innerHeight;

}

resizeHUD();

window.addEventListener("resize",resizeHUD);

const groups=[];

function createGroup(){

    const cx=Math.random()*hud.width;
    const cy=Math.random()*hud.height;

    const radius=40+Math.random()*60;

    const total=5+Math.floor(Math.random()*3);

    const pts=[];

    for(let i=0;i<total;i++){

        const angle=(Math.PI*2/total)*i;

        pts.push({

            x:cx+Math.cos(angle)*radius,

            y:cy+Math.sin(angle)*radius

        });

    }

    groups.push({

        pts,

        alpha:1,

        life:180

    });

}

setInterval(()=>{

    if(groups.length<8){

        createGroup();

    }

},900);

function draw(){

    hctx.clearRect(0,0,hud.width,hud.height);

    for(let g=groups.length-1;g>=0;g--){

        const obj=groups[g];

        const p=obj.pts;

        hctx.strokeStyle=
        `rgba(255,255,255,${obj.alpha*.15})`;

        hctx.lineWidth=1;

        for(let i=0;i<p.length;i++){

            let a=p[i];
            let b=p[(i+1)%p.length];

            hctx.beginPath();
            hctx.moveTo(a.x,a.y);
            hctx.lineTo(b.x,b.y);
            hctx.stroke();

            hctx.beginPath();
            hctx.arc(a.x,a.y,2,0,Math.PI*2);

            hctx.fillStyle=
            `rgba(255,255,255,${obj.alpha})`;

            hctx.fill();

        }

        obj.life--;

        obj.alpha-=0.004;

        if(obj.life<=0){

            groups.splice(g,1);

        }

    }

    requestAnimationFrame(draw);

}

draw();