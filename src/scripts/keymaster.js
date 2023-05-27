
import { globalOcean, globalSub } from "../index";


class Keymaster {
    constructor(options) {
        this.ctx = options.ctx;
        this.dir = options.dir;
        this.ocean = globalOcean.ocean;
        this.sub = globalSub.sub;
    }

    newPos(dir) {
       
        if (dir === "down") {
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
