
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
  private zone: Zone;
  private dir: string;
  private modal: HTMLElement;
  private move: Move;

  constructor(dir?:string) {
    this.dir = dir;
    this.ocean = Ocean.getInstance();
    this.sub = Sub.getInstance();
    this.zone = new Zone();
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
    showLat();
    showDepth();
    showZone();
    this.move.getMove(dir);
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
}


export default Keymaster;
