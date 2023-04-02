

export function clear(ctx) {
    ctx.clearRect(0,0, canvas.width, canvas.height)
}
export function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
    console.log(event.offsetX, 'offsetX')
   
}