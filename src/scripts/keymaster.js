import { detectDepth, detectLateral, moveSubVertical,getDisplayObjects } from "./boundary";
import {HEIGHT} from '../index';
import {
    DEPTH_CONT_SHELF,
    LEFT_EDGE_TRENCH,
    OCEAN_LAT_LIMIT,
    RIGHT_EDGE_TRENCH
} from "./constants";
import { globalOcean, globalSub } from "../index";

class Keymaster {
    constructor(options) {
        this.ctx = options.ctx;
        this.dir = options.dir;
        this.ocean = globalOcean.ocean;
        this.sub = globalSub.sub;
     
    }

    newPos(dir) {
        const lat = detectLateral(this.ocean, dir);
        const depth = detectDepth(this.ocean, dir);
        let displayObjects = getDisplayObjects();
        // const ocean = getDisplayObjects.ocean;
        // const sub = getDisplayObjects.sub;
        const mover = displayObjects.mover;
        // console.log("LATERAL", lat);
        // console.log('this.ocean', this.ocean)
        // console.log('this.sub', this.sub)
        // console.log('this.ctx.canvas', this.ctx.canvas)
        console.log('mmmmmover', mover)


        if (dir === "down") {
            if (mover === 'ocean') {
                this.ocean.sy += this.ocean.velDown;
            } else if (mover === 'sub') {
                this.sub.y += this.sub.velDown;
            }
        }
        if (dir === "up") {
            if (mover === 'ocean'){
                this.ocean.sy -= this.ocean.velUp;
            } else if (mover === 'sub') {
                this.sub.y -= this.sub.velUp;
            }
        }
        if (dir === "right") {
            if (mover === 'ocean'){
                this.ocean.sx += this.ocean.velRight;
            } else if (mover === 'sub') {
                this.sub.x += this.sub.velRight;
            }
        }
        if (dir === "left") {
            if (mover === 'ocean'){
                this.ocean.sx -= this.ocean.velLeft;
            } else if (mover === 'sub') {
                this.sub.x -= this.sub.velLeft;
            }
        }
    }

    }

    export default Keymaster;
    //         // } else if (this.ocean.depthFlag === "SHELF_STOP_DESCENT") {
    //         //     // this.sub.vely = 0;
    //         // } else if (this.ocean.depthFlag === "STOP_DESCENT") {
    //         //     // this.sub.vely = this.ocean.vely;
    //         //     // this.sub.vely = 1;
    //         //     // this.ocean.sy = this.ocean.depthLimit;
    //         //     // this.sub.x = this.ocean.sx;
    //         //     // this.sub.y = this.ocean.sy;
    //         //     // the internal x, y values for the sub start at 0,0
    //         //     if (
    //         //         this.sub.x > RIGHT_EDGE_TRENCH
    //         //     ) {
    //         //         // console.log('I AM IN A')
    //         //         if (this.sub.y < this.sub.subDepthLimit) {
    //         //             // console.log('I AM IN B this.sub.vely', this.sub.vely)
    //         //             this.sub.vely += 1;
    //         //              this.sub.y += this.sub.vely;
    //         //         } else {
    //         //             // console.log('I AM IN C')
    //         //             this.sub.vely = 0;
    //         //         }
    //         //     } else if (this.sub.x > RIGHT_EDGE_TRENCH) {
    //         //         // console.log('I AM IN D')
    //         //         if (this.sub.y < DEPTH_CONT_SHELF) {
    //         //             // console.log('I AM IN E')
    //         //             this.sub.vely += 1;
    //         //             this.sub.y += this.sub.vely;
    //         //         } else {
    //         //             // console.log('I AM IN F')
    //         //             this.sub.vely = 0;
    //         //         }
    //         //         // console.log('I AM IN G')
    //         //     }
    //         //     // console.log('I AM IN F')
    //     //     }
    //     // }

    //     // if (dir === "up") {
    //     //     if (this.ocean.depthFlag === "OCEAN") {
    //     //         this.ocean.sy -= this.ocean.vely;
    //     //     } else if (this.ocean.depthFlag === "STOP_ASCENT") {
    //     //         this.sub.vely = this.ocean.vely;
    //     //         this.ocean.sy = 0;
    //     //         if (this.sub.y > this.sub.initialDepthPos) {
    //     //             this.sub.vely += 1;
    //     //             this.sub.y -= this.sub.vely;
    //     //         } else if (this.sub.y < this.sub.initialDepthPos) {
    //     //             this.sub.vely = 0;
    //     //         }
    //     //     }
    //     // }
    //     if (dir === "right") {
    //         if (this.ocean.lateralFlag === "OCEAN") {
    //             this.ocean.velx += 1;
    //             this.ocean.sx += this.ocean.velx;
    //         } else if (this.ocean.lateralFlag === "STOP_RIGHT") {
    //             // this.ocean.velx = 0
    //             this.sub.velx = this.ocean.velx;
    //             this.ocean.sx = this.ocean.lateralLimit;
    //             if (this.sub.x < this.sub.subLateralLimit) {
    //                 // this.sub.velx += 1
    //                 // console.log(this.sub)
    //                 this.sub.x += this.sub.velx;
    //             } else {
    //                 this.sub.velx = 0;
    //             }

    //             // return this.ocean
    //         }
    //     }
    //     if (dir === "left") {
    //         if (this.ocean.lateralFlag === "OCEAN") {
    //             this.ocean.velx += 1;
    //             this.ocean.sx -= this.ocean.velx;
    //             return this.ocean;
    //         } else if (this.ocean.lateralFlag === "STOP_LEFT_EDGE") {
    //             this.ocean.velx = 0;
    //         } else if (this.ocean.lateralFlag === "STOP_LEFT") {
    //             this.sub.velx = this.ocean.velx;
    //             this.ocean.sx = 0;
    //             if (this.sub.x > this.sub.initialLateralPos) {
    //                 this.sub.x -= this.sub.velx;
    //             } else {
    //                 this.sub.velx = 0;
    //             }
    //         }
    //     }
    // }

