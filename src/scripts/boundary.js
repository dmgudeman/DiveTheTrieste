import {
    INITIAL_Y_POSITION,
    SEA_DEPTH, 
} from "./constants";
import { HEIGHT } from "../index";


export function showDepth(ocean, sub) {
    let conversion = SEA_DEPTH / HEIGHT; // 19.64 feet per pixel
    let composite = ocean.sy + sub.y - INITIAL_Y_POSITION;
    let depth = Math.floor(conversion * composite);
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


