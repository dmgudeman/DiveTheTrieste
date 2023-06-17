

export const drawCanvas2 = (canvas2, ctx2, backgroundImage, isInstructions1Visible) => {
    // update(); // important to start the animation loop here
    ctx2.drawImage(backgroundImage, 0, 0, canvas2.width, canvas2.height);
    backgroundImage.style.zIndex = "100";

    const instructions1 = new Image();
    instructions1.src = "src/assets/dtt8.png";
    const instructions2 = new Image();
    instructions2.src = "src/assets/dtt9.png";

    instructions1.onload = () => {
        ctx2.drawImage(instructions1, 450, 200, 600, 600);
    };

    let banner = { x: 450, y: 100, width: 600, height: 100 };
    ctx2.fillStyle = "#fff";
    ctx2.fillRect(banner.x, banner.y, banner.width, banner.height);
    ctx2.fillStyle = "#4CAF50";
    ctx2.font = "bold 50px Arial";
    ctx2.fillText("DIVE THE TRIESTE!", 520, 175);

    canvas2.onclick = function (e) {
        let rect = canvas2.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        if (x > 450 && x < 450 + 600 && y > 200 && y < 200 + 600) {
            ctx2.clearRect(450, 200, 600, 600);
            if (isInstructions1Visible) {
                ctx2.drawImage(instructions2, 450, 200, 600, 600);
            } else {
                ctx2.drawImage(instructions1, 450, 200, 600, 600);
            }
            isInstructions1Visible = !isInstructions1Visible; // toggle the flag
        }
    };
};