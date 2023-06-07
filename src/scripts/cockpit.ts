import Images from "./images";
import InitialValues from "./initialValues";
import Ocean from "./ocean";
import Sub from "./sub";

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
  private InitialValues;
  private x: number;
  private y: number;
  private w: number;
  private h: number;
  private w2: number;
  private h2: number;

  private cockpitImage: HTMLImageElement;
  private cockpitImageUrl: string;
  private imageUrls: string[];
  private underImageUrl: string;

  constructor(ctx:CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.canvas = this.ctx.canvas;
    // this.ocean = options.ocean;
    // this.sub = options.sub;
    this.InitialValues = InitialValues.getInstance();
    this.x = 0;
    this.y =  0;
    this.w =  window.innerWidth;
    this.h = window.innerHeight;
    this.w2 = this.InitialValues.getWidth();
    this.h2 = this.InitialValues.getHeight();
    this.cockpitImage = document.getElementById("cockpit") as HTMLImageElement;
    this.cockpitImageUrl =  "assets/cockpit.png";
    // this.imageUrls = options.imageUrls;
    this.underImageUrl =  "assets/life/ep/001_shark.jpg";
  }

  draw() {
    // make first image
    let ui = new Image();
    let images = new Images();
    ui.src = images.getImage();

    ui.onload = () => {
      this.ctx.drawImage(ui, this.w * 0.2, 0, this.w * 0.7, this.h * 0.81);
      console.log('this.width', this.w);
      console.log('this.w')
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
