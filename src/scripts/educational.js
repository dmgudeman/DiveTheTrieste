
export function fadeInText() {
    const container = document.getElementById("fadeInContainer");
    container.style.opacity = '1';
  
    const title = document.getElementById("fadeInTitle");
    const text = document.getElementById("fadeInText");
  
    title.style.opacity = "0";
    text.style.opacity = "0";
  
    function animate() {
      let titleOpacity = parseFloat(title.style.opacity);
      let textOpacity = parseFloat(text.style.opacity);
  
      if (titleOpacity < 1) {
        titleOpacity += 0.01;
        title.style.opacity = titleOpacity.toString();
      }
  
      if (textOpacity < 1) {
        textOpacity += 0.01;
        text.style.opacity = textOpacity.toString();
      }
  
      if (titleOpacity < 1 || textOpacity < 1) {
        requestAnimationFrame(animate);
      }
    }
  
    requestAnimationFrame(animate);
  }

  export function addUpperStyle() {
    const container = document.getElementById("fadeInContainer");
    container.style.opacity = '1';
  
    const title = document.getElementById("fadeInTitle");
    const text = document.getElementById("fadeInText");
    title.classList.remove("middleStyleTitle");
    text.classList.remove("middleStyleText");
    container.classList.remove("middleStyleContainer");
    title.classList.add("upperStyleTitle");
    text.classList.add("upperStyleText");
    container.classList.add("upperStyleContainer");

    // title.classList.remove("middleStyle");
    // text.classList.remove("middleStyle");
    // container.classList.remove("middleStyle");

  }
  
  export function addMiddleStyle() {
    const container = document.getElementById("fadeInContainer");
    container.style.opacity = '1';
  
    const title = document.getElementById("fadeInTitle");
    const text = document.getElementById("fadeInText");
    
  
    title.classList.add("middleStyleTitle");
    text.classList.add("middleStyleText");
    container.classList.add("middleStyleContainer");
    title.classList.remove("upperStyleTitle");
    text.classList.remove("upperStyleText");
    container.classList.remove("upperStyleContainer");

  }
  
  export function changeEducationalText(newText) {
    const title = document.getElementById("fadeInTitle");
    const text = document.getElementById("fadeInText");
  
    title.textContent = newText.title;
    text.textContent = newText.text;
  
    fadeInText();
  }
  
  export function fadeOutText(callback) {
    const container = document.getElementById("fadeInContainer");
    container.style.opacity = "1";
  
    function animate() {
      let opacity = parseFloat(container.style.opacity);
      if (opacity > 0) {
        opacity -= 0.05;
        container.style.opacity = opacity.toString();
        requestAnimationFrame(animate);
      } else {
        container.style.display = "none";
        callback();
      }
    }
  
    animate();
  }
  
//   export function changeEducationalText(newText) {
//     const text = document.getElementById("fadeInText");
//     console.log (newText.title);
//     console.log(newText.text)
//     text.textContent = newText.text;
//     fadeInText();
//   }
  
//   window.addEventListener("DOMContentLoaded", fadeInText);
  
  const changeTextButton = document.getElementById("changeTextButton");
  changeTextButton.addEventListener("click", function() {
    fadeOutText(changeText);
  });