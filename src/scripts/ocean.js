
import { 
  OCEAN_OBJECT_DEPTH_LIMIT, 
  OCEAN_OBJECT_LAT_LIMIT,
  INITIAL_Y_POSITION,
  VERTICAL_VELOCITY,
  LAT_VELOCITY
 } from "./constants";
import { WIDTH, HEIGHT} from '../index';

class Ocean {

  constructor(options) {
   
    this.ctx = options.ctx;

    // keeps track of the movement of the background
    this.sx = options.sx || 0;
    this.sy = options.sy || 0;
    this.sWidth = options.sWidth || WIDTH;
    this.sHeight = options.sHeight || HEIGHT;
    this.dx = options.dx || 0;
    this.dy = options.dy || 0;
  
    // is the position on the canvas
    this.dWidth = options.dWidth || WIDTH;
    this.dHeight = options.dHeight || HEIGHT;
    this.oceanImage = options.oceanImage || document.getElementById("crossSection");
    this.vely = options.vely || 0
    this.velx = options.velx || 0
    this.velRight = options.velRight || 0
    this.velLeft = options.velLeft || 0
    this.velUp = options.velUp || 0
    this.velDown = options.velDown || 0
    this.surface_y = options.surface_y || INITIAL_Y_POSITION;
    this.depthLimit = options.depthLimit || OCEAN_OBJECT_DEPTH_LIMIT; // this is where sub movement takes over
    this.lateralLimit = options.lateralLimit || OCEAN_OBJECT_LAT_LIMIT; // ditto
  }

  draw (){
     this.ctx.drawImage(
        this.oceanImage, 
        this.sx, this.sy, this.sWidth, this.sHeight,
        this.dx, this.dy, this.dWidth, this.dHeight)     
  }    
}
export default Ocean;