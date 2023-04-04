
class Ocean {

  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.sx = options.sx || 0;
    this.sy = options.sy || 0;
    this.sWidth = options.sWidth || 4000
    this.sHeight = options.sHeight || 2000;
    this.dx = options.dx || 0;
    this.dy = options.dy || 0;
    this.dWidth = options.dWidth || 4000;
    this.dHeight = options.dHeight || 2000;
    this.oceanImage = options.oceanImage || document.getElementById("crossSection");
    this.vely = options.vely || 5;
    this.velx = options.velx || 5;
    this.surface_y = options.surface_y || 126;
    
  }

  draw = () => {
    this.ctx.drawImage(
        this.oceanImage, 
        this.sx, this.sy, this.sWidth, this.sHeight,
        this.dx, this.dy, this.dWidth, this.dHeight)
  }    
}
export default Ocean;