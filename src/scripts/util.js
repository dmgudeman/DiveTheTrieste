import Sub from "./sub";
import Ocean from "./ocean";

export function clear(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
export function showCanvas1() {
  const canvas1 = document.getElementById("canvas1");
  const ctx1 = canvas1.getContext("2d");
  const canvas2 = document.getElementById("canvas2");
  const canvas3 = document.getElementById("canvas3");
  const ctx3 = canvas1.getContext("2d");
  const gauge = document.querySelector('.gauge');
  const trieste3Container = document.getElementById("trieste3Container");
  const bubblesContainer = document.querySelector(".bubblesContainer");
  const bubbles = bubblesContainer.getElementsByClassName('bubble');
  for (let i = 0; i < bubbles.length; i++) {
    const bubble = bubbles[i]; 
    // Stop the animation
    bubble.style.animation = 'none';
    // Hide the div
    bubble.style.display = 'none';
  }
  bubblesContainer.classList.add('hide'); 
  
  let sub = new Sub({ ctx: ctx1 });
  let ocean = new Ocean({ ctx: ctx1 });
  ctx1.onload = () => {
    ocean.draw();
    sub.draw();
    ctx3.onload = () => {
      cockpit.draw();
    };
  };

  canvas1.style.display = "block";
  canvas2.style.display = "none";
  canvas3.style.display = "none";
  gauge.classList.add('visible');
  trieste3Container.classList.add('hide');
  // modal.style.display = "block";
  // if (!hasModalDisplayed) {
    console.log('vvvvvvv', localStorage.getItem('modalDisplayed'))
    if (!(localStorage.getItem('modalDisplayed') === 'true')) {
      modal.style.display = 'block';
     
    }
  // }
  
 
}

export function showCanvas2() {
  const canvas1 = document.getElementById("canvas1");
  const canvas2 = document.getElementById("canvas2");
  const canvas3 = document.getElementById("canvas3");
  const gauge = document.querySelector('.gauge');
  const trieste3Container = document.getElementById("trieste3Container");
  canvas1.style.display = "none";
  canvas2.style.display = "block";
  canvas3.style.display = "none";
  gauge.classList.remove('visible');
  trieste3Container.classList.remove('hide');
  const bubblesContainer = document.querySelector(".bubblesContainer");
  const bubbles = bubblesContainer.getElementsByClassName('bubble');
  bubblesContainer.classList.add('hide'); 
  for (let i = 0; i < bubbles.length; i++) {
    const bubble = bubbles[i]; 
    // start the animation
    bubble.style.animation = '';
    // show the div
    bubble.style.display = '';
  }
  
  
}

export function showCanvas3() {
  const canvas1 = document.getElementById("canvas1");
  const canvas2 = document.getElementById("canvas2");
  const canvas3 = document.getElementById("canvas3");
  const gauge = document.querySelector('.gauge');
  const trieste3Container = document.getElementById("trieste3Container");
  canvas1.style.display = "none";
  canvas2.style.display = "none";
  canvas3.style.display = "block";
  gauge.classList.add('visible');
  trieste3Container.classList.remove('hide');
 
  const bubblesContainer = document.querySelector(".bubblesContainer");
  const bubbles = bubblesContainer.getElementsByClassName('bubble');
  for (let i = 0; i < bubbles.length; i++) {
    const bubble = bubbles[i]; 
    // Stop the animation
    bubble.style.animation = 'none';
    // Hide the div
    bubble.style.display = 'none';
  }
  bubblesContainer.classList.add('hide'); 
  
}


const modal = document.getElementById("modal");
const closeButton = document.getElementsByClassName("close")[0];



// let hasModalDisplayed;
// if (!hasModalDisplayed) {
//   localStorage.setItem('modalDisplayed', false);
// }

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

