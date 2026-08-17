const bgMusic =
    document.getElementById("bgMusic");

const musicDisc =
    document.getElementById("music-disc");

const musicPanel =
    document.getElementById("music-panel");

const closeMusic =
    document.getElementById("closeMusic");

const musicToggle =
    document.getElementById("musicToggle");

const musicVolume =
    document.getElementById("musicVolume");

const currentSong =
    document.getElementById("currentSong");

const songOptions =
    document.querySelectorAll(".song-option");


const MUSIC_PATH = "assets/music/";


let savedSong =
    localStorage.getItem("nexus-song")
    || "default.mp3";

let savedName =
    localStorage.getItem("nexus-song-name")
    || "Default Song";

let savedVolume =
    localStorage.getItem("nexus-volume");


if (bgMusic) {

    bgMusic.volume =
        savedVolume !== null
            ? Number(savedVolume)
            : 0.35;

}


if (musicVolume && bgMusic) {

    musicVolume.value =
        bgMusic.volume;

}


function loadSong(file, name, play = false) {

    if (!bgMusic) return;


    bgMusic.src =
        MUSIC_PATH + file;

    bgMusic.load();


    if (currentSong) {

        currentSong.textContent =
            name;

    }


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


    if (play) {

        bgMusic.play()
            .then(() => {

                if (musicToggle) {
                    musicToggle.textContent = "⏸";
                }

            })
            .catch(error => {

                console.log(
                    "AUDIO WAITING:",
                    error
                );

            });

    }

}


function startMusic() {

    if (!bgMusic) return;


    if (!bgMusic.src) {

        loadSong(
            "default.mp3",
            "Default Song",
            false
        );

    }


    bgMusic.play()
        .then(() => {

            if (musicToggle) {
                musicToggle.textContent = "⏸";
            }

        })
        .catch(error => {

            console.log(
                "NEXUS AUDIO ERROR:",
                error
            );

        });

}


if (musicDisc && musicPanel) {

    musicDisc.addEventListener(
        "click",
        () => {

            musicPanel.classList.toggle("show");

        }
    );


    musicDisc.addEventListener(
        "touchend",
        event => {

            event.preventDefault();

            musicPanel.classList.toggle(
                "show"
            );

        },
        { passive: false }
    );

}


if (closeMusic && musicPanel) {

    closeMusic.addEventListener(
        "click",
        () => {

            musicPanel.classList.remove("show");

        }
    );

}


if (musicToggle) {

    musicToggle.addEventListener(
        "click",
        () => {

            if (!bgMusic) return;


            if (bgMusic.paused) {

                startMusic();

            } else {

                bgMusic.pause();

                musicToggle.textContent = "▶";

            }

        }
    );

}


if (musicVolume && bgMusic) {

    musicVolume.addEventListener(
        "input",
        () => {

            bgMusic.volume =
                Number(musicVolume.value);

            localStorage.setItem(
                "nexus-volume",
                musicVolume.value
            );

        }
    );

}


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


if (bgMusic) {

    bgMusic.addEventListener(
        "play",
        () => {

            musicDisc?.classList.add(
                "playing"
            );

        }
    );


    bgMusic.addEventListener(
        "pause",
        () => {

            musicDisc?.classList.remove(
                "playing"
            );

        }
    );

}


loadSong(
    savedSong,
    savedName,
    false
);