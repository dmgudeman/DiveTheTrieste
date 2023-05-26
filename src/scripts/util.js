import Sub from "./sub";
import Ocean from "./ocean";
import { getMessage } from "./provideMessage";
import { removeMessageElement, stopAnimation } from "./edMessage";
import { WIDTH, HEIGHT } from "../index";
import { stopMessageAnimation } from "./constants";

export function clear(ctx) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

export function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
//   console.log("x: " + x + " y: " + y);
}


// canvas1 is the ocean
// canvas2 is the opening page
// canvas3 is the cockpit
const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");
const canvas2 = document.getElementById("canvas2");
const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas1.getContext("2d");
const gauge = document.querySelector('.gaugeContainer');
const trieste3Container = document.getElementById("trieste3Container");
const homeButton = document.getElementById("homeButton")
const musicNoteButton = document.getElementById("musicNoteButton")
const bubblesContainer = document.querySelector(".bubblesContainer");
const bubbles = bubblesContainer.getElementsByClassName('bubble');
const edMessage = document.getElementById("edMassage");
let messageInterval;

export function showCanvas1() { //the ocean

  stopMessageAnimation.messFlag = true;
  // let sub = new Sub({ ctx: ctx1 });
  // let ocean = new Ocean({ ctx: ctx1 });
  // ctx1.onload = () => {
  //   ocean.draw();
  //   sub.draw();
  //   ctx3.onload = () => {
  //     cockpit.draw();
  //   };
  // };


  messageInterval =  setInterval(() => {
    getMessage()
    
      
    }, 3000);
  //  setInterval(ocean, sub);
  for (let i = 0; i < bubbles.length; i++) {
    const bubble = bubbles[i]; 
    // Stop the animation
    bubble.style.animation = 'none';
    // Hide the div
    bubble.style.display = 'none';
  }
  bubblesContainer.classList.add('hide'); 

  if (!(localStorage.getItem('modalDisplayed') === 'true')) {
    modal.style.display = 'block';
    
  }
  
  canvas1.style.display = "block";
  canvas2.style.display = "none";
  canvas3.style.display = "none";
  gauge.classList.remove('hidegauge');
  trieste3Container.classList.add('hide');
  musicNoteButton.classList.add("can1MN");
  musicNoteButton.classList.remove("can2MN");
  musicNoteButton.classList.remove("can3MN");
  homeButton.classList.add("can1home");
  homeButton.classList.remove("can2home");
  homeButton.classList.remove("can3home"); 
  edMessage ? edMessage.classList.remove("hideEdMessage") : null;
}

export function showCanvas2() { //opening page
  clearInterval(messageInterval);
  stopAnimation();
  stopMessageAnimation.flag = false;

  canvas1.style.display = "none";
  canvas2.style.display = "block";
  canvas3.style.display = "none";
  gauge.classList.add('hidegauge');
  gauge.classList.add('hidegauge');
  gauge.classList.add('hidegauge');
  trieste3Container.classList.remove('hide');
  musicNoteButton.classList.remove("can1MN");
  musicNoteButton.classList.add("can2MN");
  musicNoteButton.classList.remove("can3MN");
  homeButton.classList.remove("can1home");
  homeButton.classList.add("can2home");
  homeButton.classList.remove("can3home"); 
  edMessage.classList.add("hideEdMessage");
  
  const bubblesContainer = document.querySelector(".bubblesContainer");
  const bubbles = bubblesContainer.getElementsByClassName('bubble');
  bubblesContainer.classList.add('hide'); 
  for (let i = 0; i < bubbles.length; i++) {
    const bubble = bubbles[i]; 
    bubble.style.animation = '';
    bubble.style.display = '';
  } 
}

export function showCanvas3() {  //cockpit
  stopMessageAnimation.messFlag = true;
  clearInterval(messageInterval)
  stopAnimation();
  removeMessageElement();
  canvas1.style.display = "none";
  canvas2.style.display = "none";
  canvas3.style.display = "block";
  canvas3.style.cursor ="pointer";
  gauge.classList.remove('hidegauge');
  trieste3Container.classList.remove('hide');
  musicNoteButton.classList.remove("can1MN");
  musicNoteButton.classList.remove("can2MN");
  musicNoteButton.classList.add("can3MN");
  homeButton.classList.remove("can1home");
  homeButton.classList.remove("can2home");
  homeButton.classList.add("can3home"); 
  edMessage.classList.add("hideEdMessage");
 
  const bubblesContainer = document.querySelector(".bubblesContainer");
  const bubbles = bubblesContainer.getElementsByClassName('bubble');
  for (let i = 0; i < bubbles.length; i++) {
    const bubble = bubbles[i]; 
    bubble.style.animation = 'none';
    bubble.style.display = 'none';
  }
  bubblesContainer.classList.add('hide'); 
  clearInterval(messageInterval)
  stopAnimation();
  removeMessageElement();
  
}


// modal code
const modal = document.getElementById("modal");
const closeButton = document.getElementsByClassName("close")[0];

closeButton.addEventListener("click", function () {
  modal.style.display = "none";
  localStorage.setItem('modalDisplayed', true)
});

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
        localStorage.setItem('modalDisplayed', true)
    }
});

