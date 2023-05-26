let topPositionEM;
let intervalId;
let edMessage;

function moveMessage() {
    topPositionEM -= 3; // Adjust the speed of the animation by changing this value
    edMessage.style.top = topPositionEM + "px";

    if (topPositionEM <= -250) {
        // Adjust the condition for when the message disappears
        clearInterval(intervalId);
    }
}
// start animation for message bubbles
function startAnimation() {
    topPositionEM = 200;
    edMessage.style.display = "block";
    intervalId = setInterval(moveMessage, 10);
}

function getRandomPosition(max) {
    // Generates a random number between 0 and the specified max value
    // to set the message bubble to appear in different places
    return Math.floor(Math.random() * max);
}
function addEdMessage(text) {
    const canvasContainer = document.getElementById("canvasContainer");
    edMessage = document.createElement("div");
    edMessage.textContent = text;
    edMessage.id = "edMessage";
    edMessage.style.position = "absolute";
    edMessage.style.top =
        getRandomPosition(window.innerHeight) + "px"; /* Random top position */
    edMessage.style.left =
        getRandomPosition(window.innerWidth) + "px"; /* Random left position */
    edMessage.style.transform = "translateX(-50%)";
    edMessage.style.padding = "30px";
    edMessage.style.paddingTop = "75px";
    edMessage.style.backgroundColor = "#fff";
    edMessage.style.border = "1px solid #000";
    edMessage.style.borderRadius = "100px";
    edMessage.style.transition =
        "top 2s ease"; /* Transition for the animation */
    edMessage.style.fontSize = "1rem";
    edMessage.style.zIndex = "999";
    edMessage.style.width = "200px";
    edMessage.style.height = "200px";
    edMessage.style.display = "flex";
    edMessage.style.alignItems = "center";
    edMessage.style.justifyContent = "center";
    edMessage.style.boxSizing = "border-box";
    edMessage.style.overflowWrap = "break-word";
    edMessage.style.fontStyle = "italic";
    edMessage.style.color = "green";
    edMessage.style.opacity = "0.5";

    canvasContainer.appendChild(edMessage);
}

export function removeMessageElement() {
    if (edMessage) {
        edMessage.style.display = "none";
        edMessage.parentNode.removeChild(edMessage);
    }
}

export function stopAnimation() {
    // Stop the animation
    clearInterval(intervalId);
  }

export function addAndStartAnimation(text) {
    addEdMessage(text);
    startAnimation();
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      stopAnimation();
    } else {
      startAnimation();
    }
  });
