console.log("BINARY JS BERHASIL JALAN");


const binaryCanvas = document.getElementById("binaryCanvas");

if (!binaryCanvas) {

    console.error("binaryCanvas tidak ditemukan");

} else {

    const binaryCtx = binaryCanvas.getContext("2d");

    function resizeBinary() {

        binaryCanvas.width = window.innerWidth;
        binaryCanvas.height = window.innerHeight;

    }

    resizeBinary();

    window.addEventListener(
        "resize",
        resizeBinary
    );


    const binaryFontSize = 14;

    let binaryColumns =
        Math.floor(
            binaryCanvas.width /
            binaryFontSize
        );

    let binaryDrops = [];


    function resetBinary() {

        binaryColumns =
            Math.floor(
                binaryCanvas.width /
                binaryFontSize
            );

        binaryDrops = [];

        for (
            let i = 0;
            i < binaryColumns;
            i++
        ) {

            binaryDrops[i] =
                Math.random() * -50;

        }

    }


    resetBinary();


    function drawBinary() {

        binaryCtx.fillStyle =
            "rgba(0,0,0,0.08)";

        binaryCtx.fillRect(
            0,
            0,
            binaryCanvas.width,
            binaryCanvas.height
        );


        binaryCtx.fillStyle =
            "rgba(90,220,130,0.18)";

        binaryCtx.font =
            binaryFontSize +
            "px monospace";


        for (
            let i = 0;
            i < binaryColumns;
            i++
        ) {

            const binary =
                Math.random() > 0.5
                ? "1"
                : "0";


            binaryCtx.fillText(
                binary,
                i * binaryFontSize,
                binaryDrops[i] *
                binaryFontSize
            );


            binaryDrops[i] += 0.20;


            if (
                binaryDrops[i] *
                binaryFontSize >
                binaryCanvas.height
            ) {

                if (
                    Math.random() > 0.9
                ) {

                    binaryDrops[i] = -10;

                }

            }

        }


        requestAnimationFrame(
            drawBinary
        );

    }


    drawBinary();

}