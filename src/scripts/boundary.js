import {
    DEPTH_CONT_SHELF,
    INITIAL_Y_POSITION,
    LEFT_EDGE_TRENCH,
    RIGHT_EDGE_TRENCH,
    SEA_DEPTH,
    STOP_OCEAN_LAT,
    STOP_SUB_LAT,
    STOP_OCEAN_VERTICAL,
    STOP_SUB_VERTICAL,
    OCEAN_DEPTH_LIMIT,
    OCEAN_LAT_LIMIT,
    FULL_LAT_LIMIT,
    FULL_VERTICAL_LIMIT,
    LAT_VELOCITY,
    VERTICAL_VELOCITY,
    INITIAL_LAT,
    INITIAL_DEPTH,
    SUB_INITIAL_LAT_POS,
    SLOPE_LAT,
    SLOPE_DEPTH,
    SHELF_DEPTH,
    TRENCH_DEPTH,
    SURFACE,
} from "./constants";
import { HEIGHT } from "../index";
import { globalOcean, globalSub } from "../index";
import { getDisplaySub } from "./moveSub";

export function showDepth(ocean, sub) {
    let conversion = SEA_DEPTH / HEIGHT; // 19.64 feet per pixel
    let conversionShallow = 2 ; // 2 feet per pixel
    let composite = ocean.sy + sub.y - INITIAL_Y_POSITION;
    let depth;
    
    if (composite < 500) {
        depth = Math.floor(conversionShallow * composite)
    } else {

    depth = Math.floor(conversion * composite);
    }


    // console.log('ocean.sx', ocean.sx);
    // console.log('ocean.sy',ocean.sy)
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
