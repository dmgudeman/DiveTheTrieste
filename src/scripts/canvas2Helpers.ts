

export const drawCanvas2 = (canvas2, ctx2, backgroundImage, isInstructions1Visible) => {
    let instructions1 = new Image();
    instructions1.src = "src/assets/dtt8.png";
    let instructions2 = new Image();
    instructions2.src = "src/assets/dtt9.png";

    // Encapsulate the drawing logic into a separate function
    const draw = () => {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // Clear the canvas before redrawing
        ctx2.drawImage(backgroundImage, 0, 0, canvas2.width, canvas2.height);

        let banner = { x: 450, y: 100, width: 600, height: 100 };
        ctx2.fillStyle = "#fff";
        ctx2.fillRect(banner.x, banner.y, banner.width, banner.height);
        ctx2.fillStyle = "#4CAF50";
        ctx2.font = "bold 50px Arial";
        ctx2.fillText("DIVE THE TRIESTE!", 520, 175);

        if (isInstructions1Visible) {
            ctx2.drawImage(instructions1, 450, 200, 600, 600);
        } else {
            ctx2.drawImage(instructions2, 450, 200, 600, 600);
        }
    };

    // Call the draw function initially
    draw();

    // Call the draw function on window resize
    window.addEventListener("resize", draw);

    // The onclick event handler does not need to be inside the draw function
    canvas2.onclick = function (e) {
        let rect = canvas2.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        if (x > 450 && x < 450 + 600 && y > 200 && y < 200 + 600) {
            isInstructions1Visible = !isInstructions1Visible; // Toggle the flag
            draw(); // Redraw the canvas with the updated isInstructions1Visible flag
        }
    };
};