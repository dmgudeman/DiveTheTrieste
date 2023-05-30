
import { globalOcean, globalSub } from "../index";
import { getMove } from "./move";
import { getCurrentCanvas } from "./constants"
import { showCanvas1, showCanvas2,  showCanvas3 } from "./util";

class Keymaster {
    constructor(options) {
        this.ctx = options.ctx;
        this.dir = options.dir;
        this.ocean = globalOcean.ocean;
        this.sub = globalSub.sub;
    }

    navigate(navigate) {
        let currentCanvas = getCurrentCanvas()
        if (navigate === "Enter") {
            switch(currentCanvas){
                case 1:
                    showCanvas3();
                    break;
                case 2:
                    showCanvas1();
                    break;
                case 3:
                    showCanvas1();
                default:
                    return;
            }
            
        } else if (navigate === "Escape") {
                switch(currentCanvas){
                    case 1:
                        showCanvas2();
                        break;
                    case 2:
                        showCanvas1();
                        break;
                    case 3:
                        showCanvas2();
                    default:
                        return;
                }
        }
    }

    newPos(dir) { 
        getMove({
            ocean: this.ocean,
            sub: this.sub,
        });
       
        if (dir === "down") {
            console.log('DIRRRR', dir)
            this.ocean.sy += this.ocean.velDown;
            this.sub.y += this.sub.velDown;
        }
        if (dir === "up") {
            this.ocean.sy -= this.ocean.velUp;
            this.sub.y -= this.sub.velUp;
        }
        if (dir === "right") {
            this.ocean.sx += this.ocean.velRight;
            this.sub.x += this.sub.velRight;
        }
        if (dir === "left") {
            this.ocean.sx -= this.ocean.velLeft;
            this.sub.x -= this.sub.velLeft;
        } 
    }
}

export default Keymaster;
