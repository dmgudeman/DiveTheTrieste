export function fadeInText() {
    const container = document.getElementById("fadeInContainer");
    container.style.opacity = "1";

    const title = document.getElementById("fadeInTitle");
    const text = document.getElementById("fadeInText");

    title.style.opacity = "0";
    text.style.opacity = "0";

    function animate() {
        let titleOpacity = parseFloat(title.style.opacity);
        let textOpacity = parseFloat(text.style.opacity);

        if (titleOpacity < 1) {
            titleOpacity += 0.01;
            title.style.opacity = titleOpacity.toString();
        }

        if (textOpacity < 1) {
            textOpacity += 0.01;
            text.style.opacity = textOpacity.toString();
        }

        if (titleOpacity < 1 || textOpacity < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

const textElStyles = ["upper", "middle", "lower"];

export function addEdTextStyle(flag) {
    const Text = document.getElementById("fadeInText");
    const Title = document.getElementById("fadeInTitle");
    const Container = document.getElementById("fadeInContainer");
    const textEls = [Text, Title, Container];
    const textElStrings = ['Text', 'Title', 'Container'];
    const textElStyles = ["upper", "middle", "lower"];
    Container.style.opacity = "1";

    // remove all class lists 
    textEls.forEach((textEl, idx) => {
        const className = "fadeIn" + textElStrings[idx];
        textEl.classList = className;         
    });


    textEls.forEach((textEl, idx) => {   
            const className = flag + 'Style' + textElStrings[idx];
            console.log(className)
          
              textEl.classList.add(className);    
                  
    });
}

export function changeEducationalText(newText) {
    const title = document.getElementById("fadeInTitle");
    const text = document.getElementById("fadeInText");
    title.textContent = newText.title;
    text.textContent = newText.text;

    fadeInText();
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

//   export function changeEducationalText(newText) {
//     const text = document.getElementById("fadeInText");
//     console.log (newText.title);
//     console.log(newText.text)
//     text.textContent = newText.text;
//     fadeInText();
//   }

//   window.addEventListener("DOMContentLoaded", fadeInText);

const changeTextButton = document.getElementById("changeTextButton");
changeTextButton.addEventListener("click", function () {
    fadeOutText(changeText);
});
