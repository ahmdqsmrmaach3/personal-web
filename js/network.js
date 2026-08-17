const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

let w, h;


function resize(){

    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize",resize);



const TOTAL = window.innerWidth < 600 ? 55 : 90;


const points = [];
let pulse = 0;


for(let i=0;i<TOTAL;i++){

    points.push({

        x:Math.random()*w,
        y:Math.random()*h,
        alpha:Math.random(),

        ox:0,
        oy:0,

        vx:(Math.random()-.5)*0.4,
        vy:(Math.random()-.5)*0.4,

        size:Math.random()*2+1

        

    });

}



let touch = {

    x:null,
    y:null,
    power:0

};



function createTouch(x,y){

    touch.x=x;
    touch.y=y;
    touch.power=1;

}



window.addEventListener(

"touchstart",

(e)=>{

    createTouch(

        e.touches[0].clientX,

        e.touches[0].clientY

    );

}



);



window.addEventListener(

"mousedown",

(e)=>{

    createTouch(

        e.clientX,

        e.clientY

    );

}

);





function update() {

    ctx.clearRect(0, 0, w, h);

    ctx.shadowBlur = 0;

    points.forEach(p => {

        p.x += p.vx;
        p.y += p.vy;


        if (p.x < 0 || p.x > w) {
            p.vx *= -1;
        }


        if (p.y < 0 || p.y > h) {
            p.vy *= -1;
        }


        if (touch.x !== null) {

            let dx = touch.x - p.x;
            let dy = touch.y - p.y;

            let distance =
                Math.sqrt(dx * dx + dy * dy);


            if (distance < 220) {

                let force =
                    (220 - distance) / 220;

                p.x -= dx * 0.002 * force;
                p.y -= dy * 0.002 * force;

            }

        }


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );


        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ffffff";

        ctx.fillStyle =
            "rgba(255,255,255,.85)";

        ctx.fill();

    });


    ctx.shadowBlur = 0;


    for (let i = 0; i < points.length; i++) {

        for (let j = i + 1; j < points.length; j++) {

            const a = points[i];
            const b = points[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);


            if (distance < 150) {

                ctx.beginPath();

                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);

                ctx.strokeStyle =
                    `rgba(255,255,255,${
                        (1 - distance / 150) * 0.22
                    })`;

                ctx.lineWidth = 0.8;

                ctx.stroke();

            }

        }

    }


    if (touch.power > 0 && touch.x !== null) {

        ctx.beginPath();

        ctx.arc(
            touch.x,
            touch.y,
            (1 - touch.power) * 180,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle =
            `rgba(255,0,60,${touch.power})`;

        ctx.lineWidth = 2;

        ctx.stroke();

        touch.power -= 0.025;

    }


    requestAnimationFrame(update);

}


update();