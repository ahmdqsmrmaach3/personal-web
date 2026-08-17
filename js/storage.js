const user =
    document.getElementById("dashboardUser");


function loadUser() {

    const saved =
        localStorage.getItem("nexus-user");

    if (user) {

        user.textContent =
            saved || "UNKNOWN";

    }


    const heroName =
        document.getElementById("heroName");

    if (heroName) {

        heroName.textContent =
            saved || "UNKNOWN";

    }

}


loadUser();


function changeName() {

    const input =
        document.getElementById("changeName");

    if (!input) return;


    const name =
        input.value.trim();


    if (name === "") return;


    localStorage.setItem(
        "nexus-user",
        name
    );


    if (user) {
        user.textContent = name;
    }


    const heroName =
        document.getElementById("heroName");

    if (heroName) {
        heroName.textContent = name;
    }


    input.value = "";

}