const heroSection =
    document.querySelector(".hero");

const identitySection =
    document.getElementById("identity-section");

const dashboardSection =
    document.getElementById("dashboard-section");

const accessBtn =
    document.getElementById("accessBtn");

const accessPanel =
    document.getElementById("accessPanel");

const gamesSection =
    document.getElementById("games-section");


function hideAllSections() {

    heroSection?.classList.remove("active");

    identitySection?.classList.remove("active");

    dashboardSection?.classList.remove("active");

    gamesSection?.classList.remove("active");

}


function openSection(section) {


        const gameInstruction =
        document.getElementById("gameInstruction");

    if (gameInstruction) {

        gameInstruction.classList.remove("show");

    }

    hideAllSections();


    if (section === "home") {

        heroSection?.classList.add("active");

    }


    if (section === "identity") {

        identitySection?.classList.add("active");

    }


    if (section === "dashboard") {

        dashboardSection?.classList.add("active");

    }


    accessPanel?.classList.remove("show");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (section === "games") {

    gamesSection?.classList.add("active");

}

}


function openPage(page) {

    if (page === "about.html") {

        openSection("identity");

        return;

    }


    if (page === "dashboard.html") {

        openSection("dashboard");

        return;

    }

    if (page === "games.html") {

    openSection("games");

    return;

}

}


if (accessBtn) {

    accessBtn.addEventListener(
        "click",
        () => {

            accessPanel?.classList.toggle("show");

        }
    );

}


document
    .querySelectorAll(".access-buttons button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    button.textContent
                        .trim()
                        .toLowerCase();


                if (target === "identity") {

                    openSection("identity");

                }


                if (target === "dashboard") {

                    openSection("dashboard");

                }


                if (target === "games") {

                    openSection("games");

                }

            }
        );

    });

document
    .querySelectorAll(".page-back")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openSection(
                    button.dataset.target
                );

            }
        );

    });


heroSection?.classList.add("active");