// dmgudeman.github.io/DiveTheTrieste

// canvas1 is the ocean floor and sub
// canvas2 is opening
// canvas3 is the cockpit

import { showCanvas1, showCanvas2, showCanvas3 } from "./scripts/util";

import Sub from "./scripts/sub";
import Ocean from "./scripts/ocean";
import Cockpit from "./scripts/cockpit";
import { getCursorPosition } from "./scripts/util";
import Keymaster from "./scripts/keymaster";
import { eventBus } from "./scripts/eventBus";
import CalcConstant from "./scripts/calcConstant";

export const WIDTH = window.innerWidth * 2; // width of canvases
export const HEIGHT = window.innerHeight * 2.05; // height of canvases
export const globalCockpit = { cockpit: null };


let audioFlag = false; //change this to true for production

document.addEventListener("DOMContentLoaded", () => {

    console.log("WIDTH INDEX.TS", WIDTH);
    console.log("HEIGHT INDEX.TS", HEIGHT);

    // function toggleAudio(audio) {
    //     if (audioFlag) {
    //         audio.play();
    //         musicNoteButton.classList.add("redNote");
    //     } else {
    //         audio.pause();
    //         musicNoteButton.classList.remove("redNote");
    //     }
    //     audioFlag = !audioFlag;
    // }

    // let audio = document.getElementById("music");
    // toggleAudio(audio);
    localStorage.setItem("modalDisplayed", false.toString());

    console.log("HEIGHT", HEIGHT);
    console.log("WIDTH", WIDTH);
    const canvas1: HTMLCanvasElement = document.getElementById(
        "canvas1"
    ) as HTMLCanvasElement;
    const canvas2: HTMLCanvasElement = document.getElementById(
        "canvas2"
    ) as HTMLCanvasElement;
    const canvas3: HTMLCanvasElement = document.getElementById(
        "canvas3"
    ) as HTMLCanvasElement;
    const gitHubButton: HTMLElement = document.getElementById(
        "gitHubButton"
    ) as HTMLElement;
    const linkedInButton: HTMLElement = document.getElementById(
        "linkedInButton"
    ) as HTMLElement;
    const musicNoteButton: HTMLElement = document.getElementById(
        "musicNoteButton"
    ) as HTMLElement;
    const goToOceanButton: HTMLElement = document.getElementById(
        "trieste3Container"
    ) as HTMLElement;
    const homeButton: HTMLElement = document.getElementById(
        "homeButton"
    ) as HTMLElement;
    const ctx1 = canvas1.getContext("2d");
    const ctx2 = canvas2.getContext("2d");
    const ctx3 = canvas3.getContext("2d");

    canvas1.width = WIDTH;
    canvas1.height = HEIGHT;
    canvas2.width = WIDTH;
    canvas2.height = HEIGHT;
    canvas3.width = WIDTH;
    canvas3.height = HEIGHT;

    const ocean = Ocean.getInstance(ctx1);
    const sub = Sub.getInstance(ctx1);
    const cockpit = new Cockpit({ ctx: ctx3, sub, ocean });
    globalCockpit.cockpit = cockpit;
    const key = new Keymaster();
    const calcConstant = new CalcConstant();
  
   


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

    const modal = document.getElementById("modal");

    // Close the modal when the user clicks outside
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    musicNoteButton.addEventListener("click", (e) => {
        //     toggleAudio(audio);
    });

    // make the instruction page canvas
    const backgroundImage = new Image();
    backgroundImage.src = "assets/openOcean.png";

    backgroundImage.onload = function () {
        ctx2.drawImage(backgroundImage, 0, 0, canvas2.width, canvas2.height);
        backgroundImage.style.zIndex = "100";

        const instructions = new Image();
        instructions.src = "assets/dtt6.png";

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
    // function handler1(e) {
    //     getCursorPosition(canvas1, e);
    //     cockpit.draw();
    //     showCanvas3();
      
    //     update();
    // }
    // ctx1.canvas.addEventListener("mousedown", handler1);
    // ctx2.canvas.addEventListener("mousedown", handler1);
    // ctx1.canvas.addEventListener("keydown", handler1);
    // ctx2.canvas.addEventListener("keydown", handler1);
  

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

    // MAIN ANIMATION LOOP //////
    function update() {
        clear();
        
        ocean.draw();
        sub.draw();
       
        
        requestAnimationFrame(update);
    }
    // start the seperate animation loop in the sub
    function animateSprite() {
        sub.updateSprite();
        requestAnimationFrame(animateSprite);
    }
    animateSprite();

    function keyDown(e) {
        if (e.key === "ArrowDown" || e.key === "Down") {
            key.newPos("down");
        } else if (e.key === "ArrowLeft" || e.key === "Left") {
            key.newPos("left");
        } else if (e.key === "ArrowRight" || e.key === "Right") {
            key.newPos("right");
        } else if (e.key === "ArrowUp" || e.key === "Up") {
            key.newPos("up");
        } else if (e.key === "Enter") {
            key.navigate("Enter");
        } else if (e.key === "Escape") {
            key.navigate("Escape");
        }
    }

    document.addEventListener("keydown", keyDown);
     
});
