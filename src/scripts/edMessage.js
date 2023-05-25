

let topPositionEM;
let intervalId;
let edMessage;

function moveMessage() {
    console.log("I'm messaging");
    topPositionEM -= 1; // Adjust the speed of the animation by changing the value
    edMessage.style.top = topPositionEM + 'px';

    if (topPositionEM <= -50) { // Adjust the condition for when the message disappears
        clearInterval(intervalId);
        linkedInButton.removeEventListener('click', removeElement);
        linkedInButton.addEventListener('click', addAndStartAnimation);
    }
}

function startAnimation() {
    console.log("Button pressed");
    topPositionEM = 200;
    edMessage.style.display = 'block';
    intervalId = setInterval(moveMessage, 10);
}

function addEdMessage(text) {
    const canvasContainer = document.getElementById('canvasContainer');
    edMessage = document.createElement('div');
    edMessage.textContent = text;
    edMessage.id = 'edMessage';
    edMessage.style.position = 'absolute';
    edMessage.style.top = '200px'; /* Adjust the initial position */
    edMessage.style.left = '50%';
    edMessage.style.transform = 'translateX(-50%)';
    edMessage.style.padding = '10px';
    edMessage.style.backgroundColor = '#fff';
    edMessage.style.border = '1px solid #000';
    edMessage.style.borderRadius = '5px';
    edMessage.style.transition = 'top 1s ease'; /* Transition for the animation */
    edMessage.style.fontSize = '1rem';
    edMessage.style.zIndex = '999';

    canvasContainer.appendChild(edMessage);
}

function removeElement() {
    edMessage.style.display = 'none';
    edMessage.parentNode.removeChild(edMessage);
}


export function addAndStartAnimation(text) {
    addEdMessage(text);
    startAnimation();
    linkedInButton.removeEventListener('click', addAndStartAnimation);
    linkedInButton.addEventListener('click', removeElement);
}

