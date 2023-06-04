
import Move from './move';
import { getCurrentCanvas } from "./constants";
import { showCanvas1, showCanvas2, showCanvas3 } from "./util";
import Ocean from './ocean';
import Sub from './sub';
import Zone from './zone';
import {showZone, showDepth, showLat} from './boundary';

class Keymaster {

  private ocean: Ocean;
  private sub: Sub;
  private dir: string;
  private modal: HTMLElement;
  private move: Move;

  constructor(dir?:string) {
    this.dir = dir;
    this.ocean = Ocean.getInstance();
    this.sub = Sub.getInstance();
    this.modal = document.getElementById("modal") as HTMLElement;
    this.move = new Move(this.ocean, this.sub);
  }
  
  navigate(navigate: string) {
    let currentCanvas = getCurrentCanvas();
    if (localStorage.modalDisplayed === "false") {
      this.addModalEventListener(navigate);
    }
    if (navigate === "Enter") {
      switch (currentCanvas) {
        case 1:
          showCanvas3();
          break;
        case 2:
          showCanvas1();
          break;
        case 3:
          showCanvas1();
          break;
        default:
          return;
      }
    } else if (navigate === "Escape") {
      switch (currentCanvas) {
        case 1:
          showCanvas2();
          break;
        case 2:
          showCanvas1();
          break;
        case 3:
          showCanvas2();
          break;
        default:
          return;
      }
    }
  }

  newPos(dir: string) {
    const zone = new Zone();
    showLat();
    showDepth();
    showZone();
    zone.upDateZoneObject();
    this.move.getMove(dir);
    if (dir === 'left' || dir === 'right')
    this.sub.setLastLatDir(dir)
  }

  closeModal = () => {
    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.modal.style.display = "none";
        localStorage.setItem("modalDisplayed", "true");
      }
    });
  }

  addModalEventListener(navigate: string) {
    this.modal.style.display = "block";
    localStorage.setItem("modalDisplayed", "true");
    this.modal.addEventListener("click", () => {
      this.navigate(navigate);
      this.modal.style.display = "none";
    });
  }









//   let keyRepeatTimeout;
// let keyRepeatInterval;
// let keyHeldDown = false;

// document.addEventListener('keydown', function(event) {
//   if (event.key === 'Enter') {
//     if (!keyHeldDown) {
//       keyHeldDown = true;
//       console.log('Key is being held down');
      
//       // Perform initial action when the key is first pressed
      
//       // Start the timer for repeated actions
//       keyRepeatTimeout = setTimeout(startKeyRepeat, 500);
//     }
//   }
// });

// document.addEventListener('keyup', function(event) {
//   if (event.key === 'Enter') {
//     keyHeldDown = false;
//     console.log('Key is released');
    
//     // Stop the timer for repeated actions
//     clearTimeout(keyRepeatTimeout);
//     clearInterval(keyRepeatInterval);
//   }
// });

// function startKeyRepeat() {
//   // Perform repeated actions when the key is held down
//   console.log('Key is repeatedly pressed');
  
//   // Set the interval for repeated actions
//   keyRepeatInterval = setInterval(function() {
//     // Perform repeated actions here
//     console.log('Key is repeatedly pressed');
//   }, 200);
// }

}


export default Keymaster;
