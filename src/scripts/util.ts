// import Sub from "./sub";
// import Ocean from "./ocean";
// import { addAndStartMessAnimation, removeMessageElement, stopMessAnimation } from "./edMessage";
import { WIDTH, HEIGHT } from "../index";
import {
    setCurrentCanvas,
    getCurrentCanvas,
    stopMessageAnimation,
} from "./constants";
// import { getMessage } from "./provideMessage";
import { fadeInText } from "./educational";
import { globalCockpit } from "../index";

export function clear(ctx:CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

export function getCursorPosition(canvas:HTMLElement, event:MouseEvent):void {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
}

// canvas1 is the ocean
// canvas2 is the opening page
// canvas3 is the cockpit
const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const canvas2 = document.getElementById("canvas2") as HTMLCanvasElement;
const canvas3 = document.getElementById("canvas3") as HTMLCanvasElement;
const gauge = document.querySelector(".gaugeContainer") as HTMLElement;
const trieste3Container = document.getElementById("trieste3Container") as HTMLElement;
const homeButton = document.getElementById("homeButton") as HTMLElement;
const musicNoteButton = document.getElementById("musicNoteButton") as HTMLElement;
const bubblesContainer = document.querySelector(".bubblesContainer") as HTMLElement;
const bubbles = bubblesContainer.getElementsByClassName("bubble")  as HTMLCollectionOf<Element>;
const edMessage = document.getElementById("edMassage") as HTMLElement;
const edTextContainer = document.getElementById("fadeInContainer") as HTMLElement;
let messageInterval;

export function showCanvas1() {
    //the ocean
    setCurrentCanvas(1);
    edTextContainer.classList.remove("hide");
    stopMessageAnimation.messFlag = false;
    // messageInterval = setInterval(() => {
    //     getMessage();
    // }, 3000);

    //  setInterval(ocean, sub);
    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i] as HTMLElement;
        // Stop the animation
        bubble.style.animation = "none";
        // Hide the div
        bubble.style.display = "none";
    }
    bubblesContainer.classList.add("hide");

    if (!(localStorage.getItem("modalDisplayed") === "true")) {
        modal.style.display = "block";
    }

    canvas1.style.display = "block";
    canvas2.style.display = "none";
    canvas3.style.display = "none";
    gauge.classList.remove("hidegauge");
    trieste3Container.classList.add("hide");
    musicNoteButton.classList.add("can1MN");
    musicNoteButton.classList.remove("can2MN");
    musicNoteButton.classList.remove("can3MN");
    homeButton.classList.add("can1home");
    homeButton.classList.remove("can2home");
    homeButton.classList.remove("can3home");
    edMessage ? edMessage.classList.remove("hideEdMessage") : null;

    // fadeInText();
    // document.addEventListener('keydown', function(event) {
    //   if (event.key === 'Escape') {
    //     event.preventDefault();

    //     // Add your desired functionality or code here
    //     console.log('Escape key was pressed');
    //   }
    // });
    // document.addEventListener('keydown', function(event) {
    //   if (event.key === 'Escape') {
    //     event.preventDefault();

    //     // Add your desired functionality or code here
    //     console.log('Escape key was pressed');
    //   }
    // });
}

export function showCanvas2() {
    //opening page
    setCurrentCanvas(2);
    edTextContainer.classList.add("hide");
    stopMessageAnimation.messFlag = false;

    canvas1.style.display = "none";
    canvas2.style.display = "block";
    canvas3.style.display = "none";
    gauge.classList.add("hidegauge");
    gauge.classList.add("hidegauge");
    gauge.classList.add("hidegauge");
    trieste3Container.classList.remove("hide");
    musicNoteButton.classList.remove("can1MN");
    musicNoteButton.classList.add("can2MN");
    musicNoteButton.classList.remove("can3MN");
    homeButton.classList.remove("can1home");
    homeButton.classList.add("can2home");
    homeButton.classList.remove("can3home");
    edMessage ? edMessage.classList.remove("hideEdMessage") : null;
}

export function showCanvas3() {
    //cockpit
    globalCockpit.cockpit.draw()
    setCurrentCanvas(3);
    edTextContainer.classList.add("hide");
    stopMessageAnimation.messFlag = true;
    canvas1.style.display = "none";
    canvas2.style.display = "none";
    canvas3.style.display = "block";
    canvas3.style.cursor = "pointer";
    gauge.classList.remove("hidegauge");
    trieste3Container.classList.remove("hide");
    musicNoteButton.classList.remove("can1MN");
    musicNoteButton.classList.remove("can2MN");
    musicNoteButton.classList.add("can3MN");
    homeButton.classList.remove("can1home");
    homeButton.classList.remove("can2home");
    homeButton.classList.add("can3home");
    edMessage ? edMessage.classList.remove("hideEdMessage") : null;
    edTextContainer.classList.forEach(className => {
        edTextContainer.classList.remove(className);
      });
      
}

// modal code
const modal = document.getElementById("modal");
const closeButton = document.getElementsByClassName("close")[0];

closeButton.addEventListener("click", function () {
    modal.style.display = "none";
    localStorage.setItem("modalDisplayed", 'true');
});

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
        localStorage.setItem("modalDisplayed", 'true');
    }
});