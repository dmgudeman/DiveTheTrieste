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

export function showDepth(ocean, sub) {
    let conversion = SEA_DEPTH / HEIGHT; // 19.64 feet per pixel
    let composite = ocean.sy + sub.y - INITIAL_Y_POSITION;
    let depth = Math.floor(conversion * composite);
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

export function getDisplayObjects() {
    console.log("Im HERE");
    let ocean = globalOcean.ocean;

    let sub = globalSub.sub;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
  
    console.log("compLat", compLat);
    console.log("compVert", compVert);
   

    let displayObjects = { ocean: ocean, sub: sub, mover: null };
    /// this returns the velocity and which object is to move;
    // Out of bounds to the left
    if (compLat < 0) {
      sub.velRight = 0;
      sub.velLeft = 0;
      sub.velUp = 0;
      sub.velDown = 0;
        // out of bounds above
        if (compVert <= 0) {
            ocean.velRight = LAT_VELOCITY;
            ocean.velLeft = 0;
            ocean.velUp = 0;
            ocean.velDown = VERTICAL_VELOCITY;
            // ocean.sx = 0;
            displayObjects.mover = "ocean";
        } else if (compVert <= OCEAN_DEPTH_LIMIT) {
            ocean.velRight = LAT_VELOCITY;
            ocean.velLeft = 0;
            ocean.velUp = VERTICAL_VELOCITY;
            ocean.velDown = VERTICAL_VELOCITY;
        } else if (compVert <= FULL_VERTICAL_LIMIT) {
            ocean.velRight = 0;
            ocean.velLeft = 0;
            ocean.velUp = 0;
            ocean.velDown = 0;
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = 0;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = VERTICAL_VELOCITY;
        } else {
            // out of bounds below
            ocean.velRight = 0;
            ocean.velLeft = 0;
            ocean.velUp = 0;
            ocean.velDown = 0;
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = 0;
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = 0;
        }
    } else if (compLat <= INITIAL_LAT && compLat > 0) {
        //Initial positiion
        if (compVert <= 0) {
            ocean.velRight = LAT_VELOCITY;
            ocean.velLeft = 0;
            ocean.velUp = 0;
            ocean.velDown = VERTICAL_VELOCITY;
            // ocean.sx = 0;
            displayObjects.mover = "ocean";
        } else if (compVert < INITIAL_DEPTH) {
            ocean.velRight = LAT_VELOCITY;
            ocean.velLeft = 0;
            ocean.velUp = VERTICAL_VELOCITY;
            ocean.velDown = VERTICAL_VELOCITY;
            displayObjects.mover = "ocean";
        } else {
            ocean.velRight = LAT_VELOCITY;
            ocean.velLeft = 0;
            ocean.velUp = VERTICAL_VELOCITY;
            ocean.velDown = 0;
            displayObjects.mover = "ocean";
        }
    } else if (compLat <= SLOPE_LAT && compLat> INITIAL_LAT) {
        if (compVert <= 0) {
            ocean.velRight = LAT_VELOCITY;
            ocean.velLeft = LAT_VELOCITY;
            ocean.velUp = 0;
            ocean.velDown = VERTICAL_VELOCITY;
            displayObjects.mover = "ocean";
        } else if (compVert < SLOPE_DEPTH) {
            ocean.velRight = LAT_VELOCITY;
            ocean.velLeft = LAT_VELOCITY;
            ocean.velUp = VERTICAL_VELOCITY;
            ocean.velDown = VERTICAL_VELOCITY;
            displayObjects.mover = "ocean";
        } else {
            ocean.velRight = LAT_VELOCITY;
            ocean.velLeft = LAT_VELOCITY;
            ocean.velUp = VERTICAL_VELOCITY;
            ocean.velDown = 0;
            displayObjects.mover = "ocean";
        }
      } else if (compLat <= LEFT_EDGE_TRENCH) {
        if (compVert <= 0) {
            ocean.velRight = LAT_VELOCITY;
            ocean.velLeft = LAT_VELOCITY
            ocean.velUp = 0;
            ocean.velDown = VERTICAL_VELOCITY;

            displayObjects.mover = "ocean";
        } else if (compVert < SHELF_DEPTH) {
            ocean.velRight = LAT_VELOCITY;
            ocean.velLeft = LAT_VELOCITY
            ocean.velUp = VERTICAL_VELOCITY;
            ocean.velDown = VERTICAL_VELOCITY;
            displayObjects.mover = "ocean";
        } else {
            ocean.velRight = LAT_VELOCITY;
            ocean.velLeft = LAT_VELOCITY;
            ocean.velUp = VERTICAL_VELOCITY;
            ocean.velDown = 0;
            displayObjects.mover = "ocean";
        }
    }

    displayObjects.ocean = ocean;
    displayObjects.sub = sub;
    console.log(displayObjects);
    console.log("sub", sub);
    console.log("ocean", ocean);
    return displayObjects;
}

export function detectDepth(ocean, dir) {
    if (dir === "down") {
        // console.log("sx", ocean.sx, "sy", ocean.sy);
        if (ocean.sx < LEFT_EDGE_TRENCH || ocean.sx > RIGHT_EDGE_TRENCH) {
            if (ocean.sy <= DEPTH_CONT_SHELF) {
                return (ocean.depthFlag = "OCEAN");
            } else {
                return (ocean.depthFlag = "SHELF_STOP_DESCENT");
            }
        } else {
            if (ocean.sy >= ocean.depthLimit) {
                return (ocean.depthFlag = "STOP_DESCENT");
            } else if (ocean.sy <= ocean.depthLimit) {
                return (ocean.depthFlag = "OCEAN");
            }
        }
        return "DEFAULT_DEPTH_DOWN";
    }

    if (dir === "up") {
        if (ocean.sy <= 0) {
            ocean.sy = 0;
            return (ocean.depthFlag = "STOP_ASCENT");
        } else if (ocean.sy > 0) {
            return (ocean.depthFlag = "OCEAN");
        }
        return "DEFAULT_DEPTH_UP";
    }
    return { flag: "DEFAULT_DEPTH", "ocean.sy": ocean.sy };
}

export function detectLateral(ocean, dir) {
    // console.log('ocean.x in detect lateral', ocean.sx)
    if (dir === "right") {
        if (ocean.sx < ocean.lateralLimit) {
            return (ocean.lateralFlag = "OCEAN");
        } else if (ocean.sx >= ocean.lateralLimit) {
            ocean.lateralFlag = "STOP_RIGHT";
            return "STOP_RIGHT";
        }
    }
    if (dir === "left") {
        if (ocean.sx > 0 && ocean.sx < LEFT_EDGE_TRENCH) {
            ocean.lateralFlag = "OCEAN";
            return "OCEAN";
        } else if (ocean.sx > LEFT_EDGE_TRENCH && ocean.sy < DEPTH_CONT_SHELF) {
            ocean.lateralFlag = "OCEAN";
            return "OCEAN";
        } else if (ocean.sx < LEFT_EDGE_TRENCH && ocean.sy > DEPTH_CONT_SHELF) {
            ocean.lateralFlag = "STOP_LEFT_EDGE";
            return "STOP_LEFT";
        } else if (ocean.sx < 0) {
            ocean.lateralFlag = "STOP_LEFT";
            return "STOP_LEFT";
        }
    }
    return "DEFAULT_LATERAL";
}
