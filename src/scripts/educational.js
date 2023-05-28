
export function fadeInText() {
    const container = document.getElementById("fadeInContainer");
    const text = document.getElementById("fadeInText");
    container.style.opacity = "0";
    container.style.display = "flex";
  
    function animate() {
      let opacity = parseFloat(container.style.opacity);
      if (opacity < 1) {
        opacity += 0.01;
        container.style.opacity = opacity.toString();
        requestAnimationFrame(animate);
      }
    }
  
    animate();
  }
  
  export function fadeOutText(callback) {
    const container = document.getElementById("fadeInContainer");
    container.style.opacity = "1";
  
    function animate() {
      let opacity = parseFloat(container.style.opacity);
      if (opacity > 0) {
        opacity -= 0.01;
        container.style.opacity = opacity.toString();
        requestAnimationFrame(animate);
      } else {
        container.style.display = "none";
        callback();
      }
    }
  
    animate();
  }
  
  function changeText() {
    const text = document.getElementById("fadeInText");
    text.textContent = "New Text";
    fadeInText();
  }
  
//   window.addEventListener("DOMContentLoaded", fadeInText);
  
  const changeTextButton = document.getElementById("changeTextButton");
  changeTextButton.addEventListener("click", function() {
    fadeOutText(changeText);
  });