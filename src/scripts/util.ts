// import Sub from "./sub";
// import Ocean from "./ocean";
import { WIDTH, HEIGHT } from "../index";
import {
    getCurrentCanvas,
    setCurrentCanvas
} from "./constants";
import { globalCockpit } from "../index";
import EdText from "./edText";
import Modal from './modal';
import { showDepth, showLat, showZone, showDistToBottom, showGeoDisplay } from "./boundary";


// export function clear(ctx:CanvasRenderingContext2D) {
//     ctx.clearRect(0, 0, WIDTH, HEIGHT);
// }
// export function getCursorPosition(canvas:HTMLElement, event:MouseEvent):void {
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
// }

// canvas1 is the ocean
// canvas2 is the opening page
// canvas3 is the cockpit
const canvas1 = document.getElementById("canvas1") as HTMLCanvasElement;
const canvas2 = document.getElementById("canvas2") as HTMLCanvasElement;
const canvas3 = document.getElementById("canvas3") as HTMLCanvasElement;

const gauge = document.querySelector(".gaugeContainer") as HTMLElement;
const instPanel = document.getElementById("instPanelContainer") as HTMLElement;
const trieste3Container = document.getElementById("trieste3Container") as HTMLElement;
const homeButton = document.getElementById("homeButton") as HTMLElement;
const musicNoteButton = document.getElementById("musicNoteButton") as HTMLElement;
const bubblesContainer = document.querySelector(".bubblesContainer") as HTMLElement;
const bubbles = bubblesContainer.getElementsByClassName("bubble")  as HTMLCollectionOf<Element>;
const edContainer = document.getElementById("edContainer") as HTMLElement;
const edText = new EdText();
const modal = new Modal("modal", "close");


export function showCanvas1() {
    //the ocean
    setCurrentCanvas(1);
    showDepth();
    edText.updateEdText(1);
    bubblesContainer.classList.add("hide");
    modal.displayModalInitially();
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
}

export function showCanvas2() {
    //opening page
    setCurrentCanvas(2);
    edText.updateEdText(2);
    canvas1.style.display = "none";
    canvas2.style.display = "block";
    canvas3.style.display = "none";
    gauge.classList.add("hidegauge");
    trieste3Container.classList.remove("hide");
    musicNoteButton.classList.remove("can1MN");
    musicNoteButton.classList.add("can2MN");
    musicNoteButton.classList.remove("can3MN");
    homeButton.classList.remove("can1home");
    homeButton.classList.add("can2home");
    homeButton.classList.remove("can3home");    
}

export function showCanvas3() {
    //cockpit
    globalCockpit.cockpit.draw()
    setCurrentCanvas(3);
    console.log('_CURRENT_CANVAS', getCurrentCanvas())
    bubblesContainer.classList.add("hide");
    canvas1.style.display = "none";
    canvas2.style.display = "none";
    canvas3.style.display = "block";
    canvas3.style.cursor = "pointer";
    gauge.classList.add("hidegauge"); 
    trieste3Container.classList.remove("hide");
    musicNoteButton.classList.remove("can1MN");
    musicNoteButton.classList.remove("can2MN");
    musicNoteButton.classList.add("can3MN");
    homeButton.classList.remove("can1home");
    homeButton.classList.remove("can2home");
    homeButton.classList.add("can3home");
  
    edText.updateEdText(3)
    showDepth();
    showLat();
    showGeoDisplay();
    showDistToBottom();
      
}



     
