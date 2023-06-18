// dmgudeman.github.io/DiveTheTrieste

// canvas1 is the ocean floor and sub
// canvas2 is opening
// canvas3 is the cockpit

import { showCanvas1, showCanvas2, showCanvas3 } from "./scripts/util";

import Sub from "./scripts/sub";
import Ocean from "./scripts/ocean";
import Cockpit from "./scripts/cockpit";
import Keymaster from "./scripts/keymaster";
import CalcPosition from "./scripts/calcPosition";
import InitialValues from "./scripts/initialValues";
import { drawCanvas2 } from "./scripts/canvas2Helpers";

const initialValues = InitialValues.getInstance();

export const WIDTH = (): number => initialValues.getWidth(); // convert constants into functions
export const HEIGHT = (): number => initialValues.getHeight();
export const globalCockpit = { cockpit: null };
export let ctx1: CanvasRenderingContext2D;
export let ctx2: CanvasRenderingContext2D;
export let ctx3: CanvasRenderingContext2D;
export let ocean: Ocean;
export let sub: Sub;
export let cockpit: Cockpit;
export let key: Keymaster;

let audioFlag = false;

// make the instruction page canvas
let isInstructions1Visible = true;
const backgroundImage = new Image();
backgroundImage.src = "src/assets/openOcean.png"; // background for opening page

document.addEventListener("DOMContentLoaded", () => {
 
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

    const initializeCanvases = () => {
         
        canvas1.width = WIDTH();
        canvas1.height = HEIGHT();
        canvas2.width = WIDTH();
        canvas2.height = HEIGHT();
        canvas3.width = WIDTH();
        canvas3.height = HEIGHT();
        ctx1 = canvas1.getContext("2d");
        ctx2 = canvas2.getContext("2d");
        ctx3 = canvas3.getContext("2d");
        ocean = Ocean.getInstance(ctx1);
        sub = Sub.getInstance(ctx1);
        cockpit = new Cockpit(ctx3);
        globalCockpit.cockpit = cockpit;
        // cockpit.debounceDraw(100);
        cockpit.draw();
        key = new Keymaster(ctx1);
        animateSprite();
        document.addEventListener("keydown", keyDown);
        CalcPosition.getInstance();
        drawCanvas2(canvas2, ctx2, backgroundImage, isInstructions1Visible);
        showCanvas2();
        update();

    }

    const resizeCanvases = () => {
        canvas1.width = WIDTH();
        canvas1.height = HEIGHT();
        canvas2.width = WIDTH();
        canvas2.height = HEIGHT();
        canvas3.width = WIDTH();
        canvas3.height = HEIGHT();
        ctx1 = canvas1.getContext("2d");
        ctx2 = canvas2.getContext("2d");
        ctx3 = canvas3.getContext("2d");
        // cockpit.debounceDraw(100)
        cockpit.draw();
        ocean.draw();
        sub.draw();
        drawCanvas2(canvas2, ctx2, backgroundImage, isInstructions1Visible);
    };

    backgroundImage.onload = () => {
       initializeCanvases();
    }

    // printInitialViewPortStats();
    window.addEventListener("resize", function () {
        resizeCanvases();
        printInitialViewPortStats();
    });

  

    gitHubButton.addEventListener("click", () => {
        window.location.href = "https://github.com/dmgudeman";
    });

    linkedInButton.addEventListener("click", () => {
        window.location.href = "https://www.linkedin.com/in/davidmgudeman/";
    });

    homeButton.addEventListener("click", () => {
        showCanvas2();
    });

    let audio = document.getElementById("music");
    function toggleAudio(audio) {
        if (audioFlag) {
            audio.play();
            musicNoteButton.classList.add("redNote");
        } else {
            audio.pause();
            musicNoteButton.classList.remove("redNote");
        }
        audioFlag = !audioFlag;
    }
    toggleAudio(audio);

    musicNoteButton.addEventListener("click", (e) => {
        toggleAudio(audio);
    });

    //use update to make sure the canvas is rendered
    // function handler1() {
    //     cockpit.draw();
    //     showCanvas3();
    //     update();
    // }
    // ctx1.canvas.addEventListener("mousedown", handler1);

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
    // started in the initializer function
    function animateSprite() {
        sub.updateSprite();
        requestAnimationFrame(animateSprite);
    }
   
    function keyDown(e: KeyboardEvent) {
        key.keyDown(e, ctx1, ctx2, ctx3);
        console.log('PRESSED')
    }
    
});

const printInitialViewPortStats = () => {
    console.log("=======================");
    console.log("window width is " + window.innerWidth);
    console.log("viewport width is " + window.visualViewport.width);
    console.log("WIDTH", WIDTH());
    console.log("--------------------");
    console.log("window height is " + window.innerHeight);
    console.log("viewport height is " + window.visualViewport.height);
    console.log("HEIGHT", HEIGHT);
    console.log("=======================");
    console.log("ASPECT_RATIO", WIDTH() / HEIGHT());
    console.log("=======================");
    console.log("FULL_LAT_LIMIT", initialValues.getFullLatLimit());
    console.log("FULL_VERTICAL_LIMIT", initialValues.getFullVertLimit());
    console.log("SUB_INITAL_LAT_POS", initialValues.getInitial_X());
    console.log("INITIAL_Y_POSITION", initialValues.getInitial_Y());
    console.log("OCEAN_LAT_LIMIT", initialValues.getOceanLatLimit());
    console.log("OCEAN_VERT_LIMIT", initialValues.getOceanVertLimit());
    console.log("VAR_DEPTH", CalcPosition.getInstance().calcDepthLimit());
    console.log("--------------------");
    console.log("=======================");
};
