function glitchType(element, text, speed = 100, callback = null) {

    const chars = "!@#$%^&*()_+=-<>?/[]{}ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let iteration = 0;

    let index = 0;

    let finalText = "";

    const interval = setInterval(() => {

        let display = finalText;

        for (let i = index; i < text.length; i++) {
            display += chars[Math.floor(Math.random() * chars.length)];
        }

        element.innerHTML = display;

        iteration++;

        if (iteration >= 3) {

            finalText += text[index];

            index++;

            iteration = 0;

        }

        if (index >= text.length) {

            clearInterval(interval);

            element.innerHTML = text;

            if (callback) callback();

        }

    }, speed);

}

