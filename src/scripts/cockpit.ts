import Images from "./images";
import InitialValues from "./initialValues";
import Ocean from "./ocean";
import Sub from "./sub";


class Cockpit {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private InitialValues: InitialValues;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private cockpitImage: HTMLImageElement;
  private cockpitImageUrl: string;
  private underImageUrl: string;

  constructor(ctx:CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.canvas = this.ctx.canvas;
    this.InitialValues = InitialValues.getInstance();
    this.x = 0;
    this.y = 0;
    this.width = this.InitialValues.getWidth();
    this.height = this.InitialValues.getHeight();
    this.cockpitImage = document.getElementById("cockpit") as HTMLImageElement;
    this.cockpitImageUrl =  "assets/cockpit.png";
    this.underImageUrl =  "assets/life/ep/001_shark.jpg";
  }

  draw() {
    // make first image
    let ui = new Image();
    let images = new Images();
    ui.src = images.getImage();

    ui.onload = () => {
      this.ctx.drawImage(ui, this.width * 0.1, 0, this.width * 0.35, this.height * 0.3952);
      // on load of first image, make the second image
      let cpi = new Image();
      cpi.src = this.cockpitImageUrl;
      cpi.onload = () => {
        // draw cockpit image
        this.ctx.drawImage(cpi, this.x, this.y, this.width *0.5, this.height* 0.4879);
        cpi.style.zIndex = "55";
      };
    };
  }
}

export default Cockpit;
