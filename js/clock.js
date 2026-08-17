const clock = document.getElementById("clock");
const date = document.getElementById("date");

function updateTime() {

    const now = new Date();

    if (clock) {
        clock.textContent =
            now.toLocaleTimeString("id-ID");
    }

    if (date) {
        date.textContent =
            now.toLocaleDateString(
                "id-ID",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );
    }

}

updateTime();

setInterval(updateTime, 1000);