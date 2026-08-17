/* =========================================
   NEXUS GLITCH SYSTEM
========================================= */


function nexusGlitch(element, mode = "light") {

    if (!element) return;


    const className =
        mode === "heavy"
            ? "glitch-heavy"
            : "glitch-light";


    element.classList.remove(className);


    /*
     * Memaksa browser melakukan reflow
     * supaya animasi bisa diputar kembali.
     */

    void element.offsetWidth;


    element.classList.add(className);


    const duration =
        mode === "heavy"
            ? 450
            : 220;


    setTimeout(() => {

        element.classList.remove(
            className
        );

    }, duration);

}


/* =========================================
   GAME INSTRUCTION
========================================= */


function glitchGameInstruction() {

    const box =
        document.getElementById(
            "gameInstructionBox"
        );


    if (!box) return;


    /*
     * Beberapa burst pendek agar
     * terlihat seperti glitch sungguhan.
     */

    nexusGlitch(box, "heavy");


    setTimeout(() => {

        nexusGlitch(box, "heavy");

    }, 180);


    setTimeout(() => {

        nexusGlitch(box, "heavy");

    }, 410);

}


/* =========================================
   ACCESS PANEL
========================================= */


const accessButton =
    document.getElementById(
        "accessBtn"
    );

const accessPanel =
    document.getElementById(
        "accessPanel"
    );


if (
    accessButton &&
    accessPanel
) {

    accessButton.addEventListener(
        "click",
        () => {

            /*
             * Jalankan glitch setelah panel
             * dibuka.
             */

            setTimeout(() => {

                if (
                    accessPanel.classList.contains(
                        "show"
                    )
                ) {

                    nexusGlitch(
                        accessPanel,
                        "light"
                    );

                }

            }, 40);

        }
    );

}


/* =========================================
   ENTER SYSTEM
========================================= */


const enterButton =
    document.getElementById(
        "enterBtn"
    );


if (enterButton) {

    /*
     * Glitch sekali saat tombol
     * sudah siap digunakan.
     */

    setTimeout(() => {

        nexusGlitch(
            enterButton,
            "light"
        );

    }, 1600);


    /*
     * Glitch pendek ketika tombol
     * disentuh/diklik.
     */

    enterButton.addEventListener(
        "click",
        () => {

            nexusGlitch(
                enterButton,
                "light"
            );

        }
    );

}


/* =========================================
   AI CORE
========================================= */


const aiCore =
    document.getElementById(
        "aiCore"
    );


const coreMessage =
    document.getElementById(
        "coreMessage"
    );


if (
    aiCore &&
    coreMessage
) {

    /*
     * Pantau perubahan teks AI Core.
     */

    const coreObserver =
        new MutationObserver(() => {

            nexusGlitch(
                aiCore,
                "light"
            );

        });


    coreObserver.observe(
        coreMessage,
        {
            childList: true,
            characterData: true,
            subtree: true
        }
    );

}


/* =========================================
   HUD STATUS
========================================= */


const systemStatus =
    document.getElementById(
        "systemStatus"
    );


if (systemStatus) {

    const statusObserver =
        new MutationObserver(() => {

            nexusGlitch(
                systemStatus,
                "light"
            );

        });


    statusObserver.observe(
        systemStatus,
        {
            childList: true,
            characterData: true,
            subtree: true
        }
    );

}

/* =========================================
   GENERAL PANEL GLITCH
========================================= */

const panelGlitchSelectors = [

    ".boot-container",
    ".register-card",
    ".glass-panel",

    "#accessPanel",

    "#aiCore",

    ".identity-container",
    ".identity-grid .info-card",
    ".profile-section",

    ".dashboard-container",
    ".clock-card",
    ".dashboard-card",
    ".dashboard-section",

    ".status-box",
    ".music-box",
    ".setting-box",

    "#music-panel",

    ".games-container",
    ".game-card",

    ".game-instruction-box",

    "#radarBox",

    ".memory-game",
    ".target-game",
    ".math-game",

    ".memory-info > div",
    ".target-info > div",
    ".math-info > div",

    ".memory-question-box",
    ".target-arena",
    ".math-question-box"

];


const panelGlitchElements =
    new Set();


function collectPanelGlitchElements() {

    panelGlitchSelectors.forEach(
        selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    element.classList.add(
                        "panel-glitch"
                    );

                    panelGlitchElements.add(
                        element
                    );

                });

        }
    );

}


/* initial */

collectPanelGlitchElements();


/* =========================================
   WATCH DYNAMIC GAME PANELS
========================================= */

const panelObserver =
    new MutationObserver(() => {

        collectPanelGlitchElements();

    });


panelObserver.observe(
    document.body,
    {
        childList: true,
        subtree: true
    }
);


/* =========================================
   TRIGGER
========================================= */

function triggerPanelGlitch(
    element
) {

    if (!element) return;


    element.classList.remove(
        "panel-glitch-active"
    );


    void element.offsetWidth;


    element.classList.add(
        "panel-glitch-active"
    );


    setTimeout(() => {

        element.classList.remove(
            "panel-glitch-active"
        );

    }, 530);

}


/* =========================================
   RANDOM GLITCH
========================================= */

function randomPanelGlitch() {

    collectPanelGlitchElements();


    const visibleElements =
        Array.from(
            panelGlitchElements
        ).filter(element => {

            const style =
                window.getComputedStyle(
                    element
                );

            const rect =
                element.getBoundingClientRect();


            return (
                style.display !== "none" &&
                style.visibility !== "hidden" &&
                Number(style.opacity) > 0 &&
                rect.width > 0 &&
                rect.height > 0
            );

        });


    if (
        visibleElements.length === 0
    ) {

        setTimeout(
            randomPanelGlitch,
            800
        );

        return;

    }


    const target =
        visibleElements[
            Math.floor(
                Math.random() *
                visibleElements.length
            )
        ];


    triggerPanelGlitch(
        target
    );


    setTimeout(
        randomPanelGlitch,
        900 +
        Math.random() * 1500
    );

}



/* =========================================
   START
========================================= */

setTimeout(
    randomPanelGlitch,
    1200
);

