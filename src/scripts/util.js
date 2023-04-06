import Sub from "./sub";
import Ocean from "./ocean";

export function clear(ctx) {
    ctx.clearRect(0,0, canvas.width, canvas.height)
}
export function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
  
   
}


export function showCanvas1() {
   
    const canvas1 = document.getElementById('canvas1');
    const ctx1 = canvas1.getContext("2d");
    const canvas2 = document.getElementById('canvas2');
    const canvas3 = document.getElementById('canvas3');
    const ctx3 = canvas1.getContext("2d");

    let sub = new Sub({ctx:ctx1})
    let ocean = new Ocean({ctx:ctx1})
    ocean.draw();
        sub.draw();
    console.log('show canvas1 clicked')
    // ctx1.onload = () => {
        
        canvas1.style.display = 'block';
        canvas2.style.display = 'none';
        canvas3.style.display = 'none';
    //   };
   
}

export function showCanvas2() {
    console.log('show canvas2 clicked')
    const canvas1 = document.getElementById('canvas1');
    const canvas2 = document.getElementById('canvas2');
    const canvas3 = document.getElementById('canvas3');
    canvas1.style.display = 'none';
    canvas2.style.display = 'block';
    canvas3.style.display = 'none';
}

export function showCanvas3() {
    console.log('show canvas3 clicked')
    const canvas1 = document.getElementById('canvas1');
    const canvas2 = document.getElementById('canvas2');
    const canvas3 = document.getElementById('canvas3');
    canvas1.style.display = 'none';
    canvas2.style.display = 'none';
    canvas3.style.display = 'block';

}