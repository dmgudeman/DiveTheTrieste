import {
    detectDepth,
    detectLateral,
    moveSubVertical,
    getDisplayObjects,
} from "./boundary";
import { HEIGHT } from "../index";
import {
    DEPTH_CONT_SHELF,
    LEFT_EDGE_TRENCH,
    OCEAN_LAT_LIMIT,
    RIGHT_EDGE_TRENCH,
} from "./constants";
import { globalOcean, globalSub } from "../index";
import { getMove } from "./move";

class Keymaster {
    constructor(options) {
        this.ctx = options.ctx;
        this.dir = options.dir;
        this.ocean = globalOcean.ocean;
        this.sub = globalSub.sub;
    }

    newPos(dir) {
        // console.log("globalOcean", globalOcean)
        // console.log("this.ocean", this.ocean)
        //  console.log("sub", sub)
        // console.log("AAAAAAAAA", this.ocean);
        // console.log("BBBBBBBBB", this.sub);

        // let displayObjects = getDisplayObjects();
        let displayObjects = getMove({
            ocean: this.ocean,
            sub: this.sub,
            mover: "both",
        });
        // const ocean = getDisplayObjects.ocean;
        // let DOocean = displayObjects.ocean

        // console.log('compare', DOocean ===globalOcean.ocean)
        // const sub = getDisplayObjects.sub;
        const mover = displayObjects.mover;
        // console.log("LATERAL", lat);
        // console.log('this.ocean', this.ocean)
        // console.log('this.sub', this.sub)
        // console.log('this.ctx.canvas', this.ctx.canvas)
        // console.log("mmmmmover", mover);

        if (dir === "down") {
            // if (mover === "ocean") {
            //     this.ocean.sy += this.ocean.velDown;
            // } else if (mover === "sub") {
            //     this.sub.y += this.sub.velDown;
            // } else {
            this.ocean.sy += this.ocean.velDown;
            this.sub.y += this.sub.velDown;
            // }
        }
        if (dir === "up") {
            // if (mover === "ocean") {
            //     this.ocean.sy -= this.ocean.velUp;
            // } else if (mover === "sub") {
            //     this.sub.y -= this.sub.velUp;
            // } else {
            this.ocean.sy -= this.ocean.velUp;
            this.sub.y -= this.sub.velUp;
            // }
        }
        if (dir === "right") {
            // console.log('IN KeYMASTER RIGHT mover===', mover)
            // if (mover === 'ocean'){
            //     console.log('1111111', this.ocean.sx)
            //     this.ocean.sx += this.ocean.velRight;
            //     console.log('222222222',this.ocean.sx)
            // } else if (mover === 'sub') {
            //     this.sub.x += this.sub.velRight;
            // } else {
            this.ocean.sx += this.ocean.velRight;
            this.sub.x += this.sub.velRight;
            // }
        }
        if (dir === "left") {
            this.ocean.sx -= this.ocean.velLeft;
            this.sub.x -= this.sub.velLeft;
            //     }
        }
    }
}

export default Keymaster;
