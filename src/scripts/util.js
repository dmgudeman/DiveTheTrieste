

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
    console.log('show canvas1 clicked')
    const canvas1 = document.getElementById('canvas1');
    const canvas2 = document.getElementById('canvas2');
    const canvas3 = document.getElementById('canvas3');
    canvas1.style.display = 'block';
    canvas2.style.display = 'none';
    canvas3.style.display = 'none';
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