const dashboardMusic =
    document.getElementById("dashboardMusic");

const musicToggle =
    document.getElementById("musicToggle");

const musicVolume =
    document.getElementById("musicVolume");

const currentSong =
    document.getElementById("currentSong");

const songOptions =
    document.querySelectorAll(".song-option");


const MUSIC_PATH = "../assets/music/";


const defaultSong = {
    file: "default.mp3",
    name: "Default Song"
};


let savedSong =
    localStorage.getItem("nexus-song");

let savedName =
    localStorage.getItem("nexus-song-name");


let activeSong = {

    file: savedSong || defaultSong.file,

    name: savedName || defaultSong.name

};


let savedVolume =
    localStorage.getItem("nexus-volume");


dashboardMusic.volume =
    savedVolume !== null
        ? Number(savedVolume)
        : 0.35;


musicVolume.value =
    dashboardMusic.volume;


/* =========================
   LOAD SONG
========================= */

function loadSong(
    file,
    name,
    autoPlay = false
) {

    dashboardMusic.src =
        MUSIC_PATH + file;

    dashboardMusic.load();


    currentSong.textContent =
        name;


    localStorage.setItem(
        "nexus-song",
        file
    );


    localStorage.setItem(
        "nexus-song-name",
        name
    );


    songOptions.forEach(option => {

        option.classList.toggle(

            "active",

            option.dataset.song === file

        );

    });


    if (autoPlay) {

        dashboardMusic.play()
            .then(() => {

                musicToggle.textContent =
                    "⏸";

            })
            .catch(() => {

                musicToggle.textContent =
                    "▶";

            });

    }

}


/* =========================
   PLAY / PAUSE
========================= */

musicToggle.addEventListener(
    "click",
    () => {

        if (dashboardMusic.paused) {

            dashboardMusic.play()
                .then(() => {

                    musicToggle.textContent =
                        "⏸";

                });

        } else {

            dashboardMusic.pause();

            musicToggle.textContent =
                "▶";

        }

    }
);


/* =========================
   VOLUME
========================= */

musicVolume.addEventListener(
    "input",
    () => {

        dashboardMusic.volume =
            Number(musicVolume.value);


        localStorage.setItem(
            "nexus-volume",
            musicVolume.value
        );

    }
);


/* =========================
   SONG SELECTION
========================= */

songOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            loadSong(
                option.dataset.song,
                option.dataset.name,
                true
            );

        }
    );

});


/* =========================
   LOOP
========================= */

dashboardMusic.addEventListener(
    "ended",
    () => {

        dashboardMusic.currentTime = 0;

        dashboardMusic.play();

    }
);


/* =========================
   INITIAL LOAD
========================= */

loadSong(
    activeSong.file,
    activeSong.name,
    false
);