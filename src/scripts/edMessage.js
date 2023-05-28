let topPositionEM;
let intervalId;
let edMessage;

function moveMessage() {
    // topPositionEM -= 3; // Adjust the speed of the animation by changing this value
    edMessage.style.top = topPositionEM + "px";

    // if (topPositionEM <= -100) {
    //     // Adjust the condition for when the message disappears
    //     clearInterval(intervalId);
    // }
    setTimeout(() => {
        removeEdMessage();
        clearInterval(intervalId);
      }, 2000); // Delay of 2000 milliseconds (2 seconds)
    }
    // if (topPositionEM <= -window.innerHeight) {
    //     clearInterval(intervalId);
    //     removeMessageElement(); 
    //   }

// start animation for message bubbles
function startMessAnimation() {
    topPositionEM = 200;
    edMessage.style.display = "block";
    intervalId = setInterval(moveMessage, 5);
}

function getRandomPosition(max) {
    // to set the message bubble to appear in different places
    return Math.floor(Math.random() * max);
}
// this function makes bubbles
function addFirstEdMessage(text) {
    edMessage = document.createElement("div");
    edMessage.textContent = text;
    edMessage.id = "edMessage";
    edMessage.style.position = "absolute";
    edMessage.style.top =
        getRandomPosition(window.innerHeight) + "px"; // random top position
    edMessage.style.left =
        getRandomPosition(window.innerWidth) + "px"; // random left position
    edMessage.style.transform = "translateX(-50%)";
    edMessage.style.padding = "30px";
    edMessage.style.paddingTop = "75px";
    edMessage.style.backgroundColor = "#fff";
    edMessage.style.border = "1px solid #000";
    edMessage.style.borderRadius = "100px";
    edMessage.style.transition =
        "top 1s ease"; // transition for animation
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
// this function makes large messages
function addEdMessage(text) {
    edMessage = document.createElement("div");
    edMessage.textContent = text;
    edMessage.id = "edMessage";
    edMessage.style.position = "relative"; // Change to relative position
    edMessage.style.top = '700';
    edMessage.style.left = '800';
     
    // edMessage.style.transform = "translateX(-50%)";
    // edMessage.style.transition = "top 1s ease-out"; // transition for animation
    edMessage.style.fontSize = "3rem";
    edMessage.style.fontWeight = "800";
    edMessage.style.zIndex = "999";
    edMessage.style.backgroundColor = "transparent"; 
    edMessage.style.color = "green";
    edMessage.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.3)"; 
    edMessage.style.border = "none";
  
    canvasContainer.appendChild(edMessage);
  }

export function removeEdMessage() {   
    if(edMessage){
        edMessage.style.display = "none";
        edMessage.parentNode?.removeChild(edMessage);   
    }    
}

export function stopMessAnimation() {
    clearInterval(intervalId);
  }

export function addAndStartMessAnimation(text) {
    addEdMessage(text);
    startMessAnimation();
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      stopMessAnimation();
    } else {
      startMessAnimation();
    }
  });
