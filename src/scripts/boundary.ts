import { INITIAL_Y_POSITION, SEA_DEPTH, SUB_INITIAL_LAT_POS } from "./constants";
import { HEIGHT } from "../index";
import Ocean from './ocean';
import Sub from './sub';

export  function showMouseAsSub(event) {
    var x = event.clientX - SUB_INITIAL_LAT_POS;
    var y = event.clientY - INITIAL_Y_POSITION;
    console.log("X: " + x + ", Y: " + y);
  }

export function showDepth() {
    let ocean = Ocean.getInstance();
    let sub = Sub.getInstance();
    let conversion = SEA_DEPTH / HEIGHT; // 19.64 feet per pixel
    let conversionShallow = 2; // 2 feet per pixel
    let composite = ocean.getY() + sub.getY() - INITIAL_Y_POSITION;
    let depth: number;

    if (composite < 500) {
        depth = Math.floor(conversionShallow * composite);
    } else {
        depth = Math.floor(conversion * composite);
    }
    if (depth < 0) depth = 0;
    let d = document.getElementById("depth");
    d.innerHTML = `Depth: ${depth} feet`;

    return depth;
}

export function pickImageArray(ocean, sub, ctx) {
    let x = ocean.sx + sub.x + sub.initialLateralPos;
    let y = ocean.sy + sub.y + sub.initialDepthPos;
    let deep = y / ctx.canvas.height;
    let lat = x / ctx.canvas.width;
    if (lat < 0.5) {
        if (deep < 0.3) {
            return 0; //eb
        } else {
            return 2; //db
        }
    } else {
        if (deep < 0.25) {
            return 1; //ep
        } else if (deep < 0.5) {
            return 3; //dp
        } else if (deep < 0.75) {
            return 5; //ap
        } else {
            return 4; //ab
        }
    }
}