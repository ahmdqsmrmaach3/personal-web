const boot = document.getElementById("boot-screen");
const register = document.getElementById("register-screen");
const main = document.getElementById("main-interface");

const progress = document.getElementById("progress");
const status = document.getElementById("status");

const input = document.getElementById("username");
const saveBtn = document.getElementById("saveBtn");

const welcome = document.getElementById("welcomeText");

const heroName = document.getElementById("heroName");
const heroWelcome = document.getElementById("heroWelcome");

const enterBtn = document.getElementById("enterBtn");
const glassPanel = document.getElementById("glassPanel");


let value = 0;
let loading = null;
let systemStarted = false;


/* =========================
   START SYSTEM
========================= */

function startSystem() {

    if (systemStarted) return;

    systemStarted = true;

    if (enterBtn) {
        enterBtn.style.display = "none";
    }

    status.innerHTML =
        "INITIALIZING SYSTEM...";


    loading = setInterval(() => {

        value += Math.floor(
            Math.random() * 6
        ) + 3;


        if (value >= 100) {

            value = 100;

            clearInterval(loading);

            status.innerHTML =
                "ACCESS GRANTED";


            setTimeout(() => {

                boot.style.display = "none";

                checkUser();

            }, 1000);

        }


        progress.style.width =
            value + "%";


    }, 300);

}


/* =========================
   CHECK USER
========================= */

function checkUser() {

    const user =
        localStorage.getItem("nexus-user");


    if (user) {

        showMain(user);

    } else {

        register.classList.remove("hidden");

    }

}


/* =========================
   SAVE NAME
========================= */

saveBtn.addEventListener("click", () => {

    const name =
        input.value.trim();


    if (name === "") {

        alert("Please enter your name");

        return;

    }


    localStorage.setItem(
        "nexus-user",
        name
    );


    register.style.display = "none";

    showMain(name);

});


/* =========================
   TYPEWRITER
========================= */

function typeWriter(
    text,
    element,
    speed,
    callback
) {

    let i = 0;

    element.textContent = "";


    const typing =
        setInterval(() => {

            element.textContent +=
                text.charAt(i);

            i++;


            if (i >= text.length) {

                clearInterval(typing);

                if (callback) {
                    callback();
                }

            }

        }, speed);

}


/* =========================
   MAIN SCREEN
========================= */

function showMain(name) {

    heroName.textContent = "";
    welcome.textContent = "";
    heroWelcome.textContent = "";

    main.classList.remove("hidden");


    typeWriter(
        "WELCOME!!!",
        welcome,
        45,
        () => {

            typeWriter(
                name,
                heroName,
                100,
                () => {

                    heroWelcome.textContent =
                        "Welcome to my personal interface";
                        triggerTextGlitch(heroName)


                    if (glassPanel) {

                        glassPanel.classList.add("show");

                    }

                }
            );

        }
    );

}


/* =========================
   ENTER SYSTEM
========================= */

if (enterBtn) {

    enterBtn.addEventListener(
        "click",
        () => {

            startMusic();

            startSystem();

        }
    );

}

function triggerTextGlitch(element) {

    if (!element) return;


    element.classList.remove(
        "is-glitching"
    );


    void element.offsetWidth;


    element.classList.add(
        "is-glitching"
    );


    setTimeout(() => {

        element.classList.remove(
            "is-glitching"
        );

    }, 180);

}