


export function fadeInText() {
    const container = document.getElementById("fadeInContainer");
    const text = document.getElementById("fadeInText");
  
    container.classList.add("fadeIn");
    text.style.opacity = "1";
  }
  
  function fadeOutText(callback) {
    const text = document.getElementById("fadeInText");
    text.style.opacity = "0";
  
    setTimeout(callback, 2000); // Wait for fade out transition to complete
  }
  
  function changeText() {
    const text = document.getElementById("fadeInText");
    text.textContent = "New Text";
    fadeInText();
  }
  
  window.addEventListener("load", fadeInText);
  
  const changeTextButton = document.getElementById("changeTextButton");
  changeTextButton.addEventListener("click", function() {
    fadeOutText(changeText);
  });