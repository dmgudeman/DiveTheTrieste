// canvas1 is the ocean floor and sub
// canvas2 is opening
// canvas3 is the cockpit

// dmgudeman.github.io/DiveTheTrieste

import { showCanvas1, showCanvas2, showCanvas3 } from "./scripts/util";
import { showDepth } from "./scripts/boundary";
import Sub from "./scripts/sub";
import Ocean from "./scripts/ocean";
import Cockpit from "./scripts/cockpit";
import { getCursorPosition } from "./scripts/util";
import Keymaster from "./scripts/keymaster";

const WIDTH = window.innerWidth * 2.5;
const HEIGHT = window.innerHeight * 1.9;

document.addEventListener("DOMContentLoaded", () => {
    localStorage.setItem("modalDisplayed", false);
    const canvas1 = document.getElementById("canvas1");
    const canvas2 = document.getElementById("canvas2");
    const canvas3 = document.getElementById("canvas3");
    const gitHubButton = document.getElementById("gitHubButton");
    const linkedInButton = document.getElementById("linkedInButton");
    const musicNoteButton = document.getElementById("musicNoteButton");
    const goToOceanButton = document.getElementById("trieste3Container");
    const homeButton = document.getElementById("homeButton");

    const ctx1 = canvas1.getContext("2d");
    const ctx2 = canvas2.getContext("2d");
    const ctx3 = canvas3.getContext("2d");

    canvas1.width = WIDTH;
    canvas1.height = HEIGHT;
    canvas2.width = WIDTH;
    canvas2.height = HEIGHT;
    canvas3.width = WIDTH;
    canvas3.height = HEIGHT;

    let ocean = new Ocean({ ctx: ctx1 });
    let sub = new Sub({ ctx: ctx1 });
    let key = new Keymaster({ ctx: ctx1, ocean, sub });
    let cockpit = new Cockpit({ ctx: ctx3, sub, ocean });

    // const rect2 = canvas2.getBoundingClientRect();

    gitHubButton.addEventListener("click", () => {
        window.location.href = "https://github.com/dmgudeman";
    });

    linkedInButton.addEventListener("click", () => {
        window.location.href = "https://www.linkedin.com/in/davidmgudeman/";
    });

    goToOceanButton.addEventListener("click", () => {
        showCanvas1();
       
    });

    homeButton.addEventListener("click", () => {
        showCanvas2();
        
    });

    const openModalButton = document.getElementById("openModalButton");
    const modal = document.getElementById("modal");
    const closeButton = document.getElementsByClassName("close")[0];

    // Open the modal when the button is clicked
    openModalButton.addEventListener("click", function () {
        modal.style.display = "block";
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close the modal when the user clicks outside the modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // music button
    let audioFlag = true;
    function toggleAudio() {
        let audio = document.getElementById("music");

        if (audioFlag) {
            audio.play();
            musicNoteButton.classList.add("redNote");
        } else {
            audio.pause();
            musicNoteButton.classList.remove("redNote");
        }
        audioFlag = !audioFlag;
    }
    musicNoteButton.addEventListener("click", (e) => {
        toggleAudio();
    });

    // make the instruction page canvas
    const backgroundImage = new Image();
    backgroundImage.src = "assets/openOcean.png";

    backgroundImage.onload = function () {
        ctx2.drawImage(backgroundImage, 0, 0, canvas2.width, canvas2.height);
        backgroundImage.style.zIndex = 100;

        const instructions = new Image();
        instructions.src = "assets/instructions.png";

        instructions.onload = () => {
            ctx2.drawImage(instructions, 450, 250, 600, 600);
        };

        let banner = { x: 450, y: 100, width: 600, height: 150 };
        ctx2.fillStyle = "#fff";
        ctx2.fillRect(banner.x, banner.y, banner.width, banner.height);
        ctx2.fillStyle = "#4CAF50";
        ctx2.font = "bold 50px Arial";
        ctx2.fillText("DIVE THE TRIESTE!", 520, 175);
    };
    const instructions = new Image();
    instructions.src = "assets/instructions.png";
    instructions.onload = () => {
        ctx2.drawImage(instructions, 450, 250, 600, 600);
        update();
    };

    //use update to make sure the canvas is rendered
    function handler1(e) {
        getCursorPosition(canvas1, e);
        cockpit.draw();
        showCanvas3();
        update();
    }
    ctx1.canvas.addEventListener("mousedown", handler1);

    // adding click function to the cockpit
    const rect = canvas3.getBoundingClientRect();
    canvas3.addEventListener("mousedown", (e) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (
            x > 300 &&
            x < canvas3.width * 0.7 &&
            y > 100 &&
            y < canvas3.height * 0.7
        ) {
            cockpit.draw();
        }
    });

    function clear() {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    }

    // message
    const messageElement = document.getElementById("message");

    function showMessage(message) {
        messageElement.textContent = message;
        messageElement.classList.remove("fade-out");
        // messageElement.classList.remove("hide");
        // messageElement.style.display = 'block';
        messageElement.classList.add("fade-out");

        setTimeout(() => {
            messageElement.classList.remove("fade-out");
        }, 2000);
    }

    // showMessage("Hello, world!");

    // sprite
    const spriteSheet = new Image();
    spriteSheet.src = "assets/sprite.png";

    spriteSheet.onload = () => {
        ctx1.drawImage(spriteSheet, 0, 0, 500, 500);
    };

    const sprites = [
        { x: 0, y: 0, width: 125, height: 200 },
        { x: 135, y: 0, width: 135, height: 200 },
        { x: 280, y: 0, width: 125, height: 200 },
        { x: 410, y: 0, width: 140, height: 200 },
    ];

    let currentFrame = 0;
    let lastFrameTime = 0;
    // main animation loop
    function update(currentTime) {
        const elapsedTime = currentTime - lastFrameTime;
        if (elapsedTime > 1000 / 10) {
            clear();
            ocean.draw();
            // sub.draw();
            showDepth(ocean, sub, canvas1);
            const sprite = sprites[currentFrame];
            ctx1.drawImage(
                spriteSheet,
                sprite.x,
                sprite.y,
                sprite.width,
                sprite.height,
                sub.x,
                sub.y,
                sub.w,
                sub.h
            );
            currentFrame++;
            if (currentFrame >= sprites.length) {
                currentFrame = 0;
            }
            lastFrameTime = currentTime;
        }
        requestAnimationFrame(update);
    }

    function keyDown(e) {
        if (e.key === "ArrowDown" || e.key === "Down") {
            key.newPos("down");
        } else if (e.key === "ArrowLeft" || e.key === "Left") {
            key.newPos("left");
        } else if (e.key === "ArrowRight" || e.key === "Rigth") {
            key.newPos("right");
        } else {
            key.newPos("up");
        }
    }

    document.addEventListener("keydown", keyDown);
});
