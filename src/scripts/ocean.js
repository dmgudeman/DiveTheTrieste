
import { 
  OCEAN_OBJECT_DEPTH_LIMIT, 
  OCEAN_OBJECT_LAT_LIMIT,
  INITIAL_Y_POSITION
 } from "./constants";
import { WIDTH, HEIGHT} from '../index';

class Ocean {

  constructor(options) {
   
    this.ctx = options.ctx;

    // keeps track of the movement of the background
    this.sx = options.sx || 0;
    this.sy = options.sy || 0;
    // this.sWidth = options.sWidth || 4000;
    // this.sHeight = options.sHeight || 2000;
    this.sWidth = options.sWidth || WIDTH;
    this.sHeight = options.sHeight || HEIGHT;
    this.dx = options.dx || 0;
    this.dy = options.dy || 0;
    // this.dWidth = options.dWidth || 4000;
    // this.dHeight = options.dHeight || 2000;
    // is the position on the canvas
    this.dWidth = options.dWidth || WIDTH;
    this.dHeight = options.dHeight || HEIGHT;
    this.oceanImage = options.oceanImage || document.getElementById("crossSection");
    this.vely = options.vely || 20;
    this.velx = options.velx || 20;
    this.surface_y = options.surface_y || INITIAL_Y_POSITION;
    this.depthFlag = 'MOVE';
    this.lateralFlag = 'MOVE';
    this.depthLimit = options.depthLimit || OCEAN_OBJECT_DEPTH_LIMIT;
    this.lateralLimit = options.lateralLimit || OCEAN_OBJECT_LAT_LIMIT;

  }

  draw (){
     this.ctx.drawImage(
        this.oceanImage, 
        this.sx, this.sy, this.sWidth, this.sHeight,
        this.dx, this.dy, this.dWidth, this.dHeight)     
  }    
}
export default Ocean;