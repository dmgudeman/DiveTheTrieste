import Images from "./images";
import { showCanvas1, showCanvas2, showCanvas3 } from "./util";

class Cockpit {
  constructor(options) {
    this.ctx = options.ctx;
    this.canvas = this.ctx.canvas;
    this.ocean = options.ocean;
    this.sub = options.sub;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.w = options.width || window.innerWidth;
    this.h = options.height || window.innerHeight;
    this.cockpitImage =
      options.cockpitImage || document.getElementById("cockpit");
    this.cockpitImageUrl = options.cockpitImageUrl || "assets/cockpit.png";
    this.imageUrls = options.imageUrls;
    this.underImageUrl =
      options.underImageUrl || "assets/life/ep/001_shark.jpg";
  }
  
  draw() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.addEventListener("click", (e) => {
      const trieste3Container = document.getElementById("trieste3Container")
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x > 100 && x < 300 && y > 100 && y < 150) {
        showCanvas1();
        trieste3Container.classList.remove('hide');
      }
    });

    this.canvas.addEventListener("click", (e) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x > 100 && x < 300 && y > 200 && y < 250) {
        showCanvas2();


      }
    });

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
        cpi.style.zIndex = 55;

        // draw first button
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(100, 100, 200, 50);
        this.ctx.fillStyle = "#4CAF50";
        this.ctx.font = "bold 20px Arial";
        this.ctx.fillText("Go to Ocean", 135, 132);

        // draw second button
        let button2 = { x: 100, y: 200, width: 200, height: 50 };
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(button2.x, button2.y, button2.width, button2.height);
        this.ctx.fillStyle = "#4CAF50";
        this.ctx.font = "bold 20px Arial";
        this.ctx.fillText("About Project", 135, 232);
      };
    };
  }
}

export default Cockpit;
