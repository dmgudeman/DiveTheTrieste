import Images from "./images";
import Sub from "./sub.ts";

interface CockpitOptions {
  ctx: CanvasRenderingContext2D;
  ocean: Ocean;
  sub: Sub;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  cockpitImage?: HTMLImageElement;
  cockpitImageUrl?: string;
  imageUrls?: string[];
  underImageUrl?: string;
}


class Cockpit {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private ocean: Ocean;
  private sub: Sub;
  private x: number;
  private y: number;
  private w: number;
  private h: number;
  private cockpitImage: HTMLImageElement;
  private cockpitImageUrl: string;
  private imageUrls: string[];
  private underImageUrl: string;

  constructor(options: CockpitOptions) {
    this.ctx = options.ctx;
    this.canvas = this.ctx.canvas;
    this.ocean = options.ocean;
    this.sub = options.sub;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.w = options.width || window.innerWidth;
    this.h = options.height || window.innerHeight;
    this.cockpitImage = options.cockpitImage || document.getElementById("cockpit") as HTMLImageElement;
    this.cockpitImageUrl = options.cockpitImageUrl || "assets/cockpit.png";
    this.imageUrls = options.imageUrls;
    this.underImageUrl = options.underImageUrl || "assets/life/ep/001_shark.jpg";
  }




  
  draw() {

    // make first image
    let ui = new Image();
    let images = new Images({
      ctx: this.ctx,
      sub: this.sub,
      ocean: this.ocean,
    });
    ui.src = images.pickRandomImage();

    ui.onload = () => {
      this.ctx.drawImage(ui, this.w * 0.2, 0, this.w * 0.7, this.h * 0.81);

      // on load of first image, make the second image
      let cpi = new Image();
      cpi.src = this.cockpitImageUrl;
      cpi.onload = () => {
        // draw cockpit image
        this.ctx.drawImage(cpi, this.x, this.y, this.w, this.h);
        cpi.style.zIndex = "55";
      };
    };
  }
}

export default Cockpit;
