

export const drawCanvas2 = (canvas2, ctx2, backgroundImage, isInstructions1Visible) => {
    let instructions1 = new Image();
    instructions1.src = "src/assets/dtt8.png";
    let instructions2 = new Image();
    instructions2.src = "src/assets/dtt9.png";

    // Encapsulate the drawing logic into a separate function
    // Encapsulate the drawing logic into a separate function
    const draw = () => {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // Clear the canvas before redrawing
        ctx2.drawImage(backgroundImage, 0, 0, canvas2.width, canvas2.height);

        // Define position and size as percentages of the canvas dimensions
        let bannerWidth = canvas2.width * 0.15;
        let bannerHeight = canvas2.height * 0.065;
        let bannerX = (canvas2.width - bannerWidth) / 6;
        let bannerY = bannerHeight * 0.6; // Put the banner at the top

        ctx2.fillStyle = "#fff";
        ctx2.fillRect(bannerX, bannerY, bannerWidth, bannerHeight);
        ctx2.fillStyle = "#4CAF50";
        ctx2.font = "bold 50px Arial";
        ctx2.fillText("DIVE THE TRIESTE!", bannerX + bannerWidth * 0.1, bannerY + bannerHeight * 0.7);

        // // Define the size of the instructions
        let instructionsWidth = canvas2.width * 0.5;
        let instructionsHeight = instructionsWidth; // Make the instructions square
        let instructionsX = (canvas2.width - instructionsWidth) / 2;
        let instructionsY = (canvas2.height - instructionsHeight) / 2;

        if (isInstructions1Visible) {
            ctx2.drawImage(instructions1, instructionsX, instructionsY, instructionsWidth, instructionsHeight);
        } else {
            ctx2.drawImage(instructions2, instructionsX, instructionsY, instructionsWidth, instructionsHeight);
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