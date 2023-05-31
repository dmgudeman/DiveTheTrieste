import { globalOcean, globalSub } from "../index.ts";
import { getMove } from "./move";
import { getCurrentCanvas } from "./constants";
import { showCanvas1, showCanvas2, showCanvas3 } from "./util";
import Ocean from './ocean.ts';
import Sub from './sub.ts';

class Keymaster {
  private ctx: CanvasRenderingContext2D;
  private dir: string;
  private ocean: Ocean;
  private sub: Sub;
  private modal: HTMLElement;

  constructor(options: KeymasterOptions) {
    this.ctx = options.ctx;
    this.dir = options.dir;
    this.ocean = globalOcean.ocean;
    this.sub = globalSub.sub;
    this.modal = document.getElementById("modal") as HTMLElement;
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
    getMove({
      ocean: this.ocean,
      sub: this.sub,
    });

    if (dir === "down") {
      console.log("DIRRRR", dir);
      this.ocean.setSy(this.ocean.getSy() + this.ocean.getVelDown());
      this.sub.setY(this.sub.getY() + this.sub.getVelDown());
    }
    if (dir === "up") {
        this.ocean.setSy(this.ocean.getSy() - this.ocean.getVelDown());
        this.sub.setY(this.sub.getY() - this.sub.getVelDown());
    }
    if (dir === "right") {
        this.ocean.setSx(this.ocean.getSx() + this.ocean.getVelRight());
        this.sub.setX(this.sub.getX() + this.sub.getVelRight());
    }
    if (dir === "left") {
        this.ocean.setSx(this.ocean.getSx() - this.ocean.getVelLeft());
        this.sub.setX(this.sub.getX() - this.sub.getVelLeft());
    }
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

interface KeymasterOptions {
  ctx: CanvasRenderingContext2D;
  dir: string;
  ocean: Ocean;
  sub: Sub;
}

export default Keymaster;
