

export const drawCanvas2 = (canvas2, ctx2, backgroundImage, isInstructions1Visible) => {
    let instructions1 = new Image();
    instructions1.src = "src/assets/dtt8.png";
    let instructions2 = new Image();
    instructions2.src = "src/assets/dtt9.png";

     // resize responsive
     let docWidth = canvas2.width * 0.15;
     let bannerHeight = canvas2.height * 0.065;
     let docX = (canvas2.width - docWidth) / 6;
     let bannerY = bannerHeight * 0.6; 

      // Instruction set
      let instructionsWidth = canvas2.width * 0.15;
      let instructionsHeight = canvas2.width * 0.18; 
      let instructionsX = (canvas2.width - docWidth) / 6;
      let instructionsY = (bannerHeight + bannerY);


    const draw = () => {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height); 
        ctx2.drawImage(backgroundImage, 0, 0, canvas2.width, canvas2.height);

        // // resize responsive
        // let docWidth = canvas2.width * 0.15;
        // let bannerHeight = canvas2.height * 0.065;
        // let docX = (canvas2.width - docWidth) / 6;
        // let bannerY = bannerHeight * 0.6; 

        ctx2.fillStyle = "#fff";
        ctx2.fillRect(docX, bannerY, docWidth, bannerHeight);
        ctx2.fillStyle = "#4CAF50";
        ctx2.font = "bold 50px Arial";
        ctx2.fillText("DIVE THE TRIESTE!", docX + docWidth * 0.1, bannerY + bannerHeight * 0.7, docWidth * 0.8); // last param is max length of string

        // // Instruction set
        // let instructionsWidth = canvas2.width * 0.15;
        // let instructionsHeight = canvas2.width * 0.18; 
        // let instructionsX = (canvas2.width - docWidth) / 6;
        // let instructionsY = (bannerHeight + bannerY);

        if (isInstructions1Visible) {  // the minus 1 below is so there is no line between banner and document
            ctx2.drawImage(instructions1, instructionsX, instructionsY - 1, instructionsWidth, instructionsHeight);
        } else {
            ctx2.drawImage(instructions2, instructionsX, instructionsY - 1, instructionsWidth, instructionsHeight);
        }
    };

    // Call the draw function initially
    draw();

    // Call the draw function on window resize
    window.addEventListener("resize", draw);

    canvas2.onclick = function (e) {
        let rect = canvas2.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        if (x > docX && x < docX + docWidth && y > bannerY && y < bannerY + instructionsHeight) {
            isInstructions1Visible = !isInstructions1Visible; // Toggle the flag
            draw(); // Redraw the canvas with the updated isInstructions1Visible flag
        }
    };
};