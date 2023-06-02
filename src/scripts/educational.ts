export function fadeInText(Title:HTMLElement, Text:HTMLElement ) {
    const Container = document.getElementById("fadeInContainer");
    const hitBottom = document.getElementById("hitBottomContainer")
    Container.style.opacity = "1";
    Title.style.opacity = "0";
    Text.style.opacity = "0";
    
    function animate() {
        let titleOpacity = parseFloat(Title.style.opacity);
        let textOpacity = parseFloat(Text.style.opacity);

        if (titleOpacity < 1) {
            titleOpacity += 0.01;
            Title.style.opacity = titleOpacity.toString();
        }

        if (textOpacity < 1) {
            textOpacity += 0.01;
            Text.style.opacity = textOpacity.toString();
        }

        if (titleOpacity < 1 || textOpacity < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

export function addEdTextStyle(flag) {
    const Text = document.getElementById("fadeInText");
    const Title = document.getElementById("fadeInTitle");
    const Container = document.getElementById("fadeInContainer");
    const textEls = [Text, Title, Container];
    const textElStrings = ["Text", "Title", "Container"];
    Container.style.opacity = "1";

    // reset classList
    textEls.forEach((textEl, idx) => {
        const className = "fadeIn" + textElStrings[idx];
        textEl.classList.add(className);
    });

    textEls.forEach((textEl, idx) => {
        const className = flag + "Style" + textElStrings[idx];
        textEl.classList.add(className);
    });
    fadeInText(Title, Text);
}

export function changeEducationalText(newText) {
    const title = document.getElementById("fadeInTitle");
    const text = document.getElementById("fadeInText");

    title.textContent = newText.title;
    text.textContent = newText.text;

    fadeInText(title, text);
}

export function fadeOutText(callback) {
    const container = document.getElementById("fadeInContainer");
    container.style.opacity = "1";

    function animate() {
        let opacity = parseFloat(container.style.opacity);
        if (opacity > 0) {
            opacity -= 0.05;
            container.style.opacity = opacity.toString();
            requestAnimationFrame(animate);
        } else {
            container.style.display = "none";
            callback();
        }
    }

    animate();
}
