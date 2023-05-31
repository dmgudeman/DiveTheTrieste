import {
    INITIAL_Y_POSITION,
    LEFT_EDGE_TRENCH,
    RIGHT_EDGE_TRENCH,
    OCEAN_DEPTH_LIMIT,
    OCEAN_LAT_LIMIT,
    FULL_LAT_LIMIT,
    LAT_VELOCITY,
    VERTICAL_VELOCITY,
    SUB_INITIAL_LAT_POS,
    SLOPE_LAT,
    SHELF_DEPTH,
    TRENCH_TOP,
    OCEAN_FLOOR,
    LAT_LIMITS,
} from "./constants";
import Ocean from "./ocean";
import Sub from "./sub";
import { MoveObjects } from "./types";

let displayObjects;
export const getMove = (dir) => {
    clearHitBottom();
    let ocean = Ocean.getInstance()
    resetVelocities(ocean, sub);

    let compLat = ocean.getX() + sub.getX() - SUB_INITIAL_LAT_POS;
    let compVert = ocean.getY() + sub.getY() - INITIAL_Y_POSITION;
    console.log("COMPLAT", compLat);
    let variableDepth = calcDepthLimit(compLat);

    // let variableDepth = getVariableDepth(compLat);
    displayObjects = { ocean: ocean, sub: sub };
    displayObjects = getLatMove(displayObjects, variableDepth);

    // fine tune the depth stop for the slope and the shelves
    if (compLat < SLOPE_LAT) {
        if (compLat < 0) {
            compLat = 1;
        }
        let depth = compLat * 2.3;
        displayObjects = getVerticalMove(displayObjects, depth);
    } else if (compLat < LEFT_EDGE_TRENCH || compLat > RIGHT_EDGE_TRENCH) {
        displayObjects = getVerticalMove(displayObjects, variableDepth);
    } else {
        displayObjects = getVerticalMove(displayObjects);
    }

    return displayObjects;
};
function getLatMove(moveObjects, variableDepth) {
    let { ocean, sub } = moveObjects;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;

    const moveOceanLat = () => {
        ocean.velRight = LAT_VELOCITY;
        ocean.velLeft = LAT_VELOCITY;
        sub.velRight = 0;
        sub.velLeft = 0;
    };
    const moveOceanRight = () => {
        ocean.velRight = LAT_VELOCITY;
        ocean.velLeft = 0;
        sub.velRight = 0;
        sub.velLeft = 0;
    };

    const moveOceanLeft = () => {
        ocean.velRight = 0;
        ocean.velLeft = LAT_VELOCITY;
        sub.velRight = 0;
        sub.velLeft = 0;
    };

    const moveSubLat = () => {
        ocean.velRight = 0;
        ocean.velLeft = 0;
        sub.velRight = LAT_VELOCITY;
        sub.velLeft = LAT_VELOCITY;
    };

    const moveSubRight = () => {
        ocean.velRight = 0;
        ocean.velLeft = 0;
        sub.velRight = LAT_VELOCITY;
        sub.velLeft = 0;
    };

    const moveSubLeft = () => {
        ocean.velRight = 0;
        ocean.velLeft = 0;
        sub.velRight = 0;
        sub.velLeft = LAT_VELOCITY;
    };

    if (compLat <= 0) {
        ocean.sx = 0; // reset to 0 if over the limit
        moveOceanRight();
        return displayObjects;
    } else if (compLat < OCEAN_LAT_LIMIT) {
        if (compVert < variableDepth) {
            moveOceanLat();
        } else {
            ocean.sy -= VERTICAL_VELOCITY;
            moveSubRight();
            hitBottom();
        }
    } else if (compLat < FULL_LAT_LIMIT) {
        if (compVert < variableDepth) {
            moveSubLat();
        } else {
            sub.sy -= LAT_VELOCITY;
            moveSubLeft();
            hitBottom();
        }
    } else {
        moveSubLeft();
    }

    return displayObjects;
}

function getVerticalMove(objects, varDepth = OCEAN_FLOOR) {
    let { ocean, sub } = objects;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;

    const moveOceanVert = () => {
        ocean.velUp = VERTICAL_VELOCITY;
        ocean.velDown = VERTICAL_VELOCITY;
        sub.velUp = 0;
        sub.velDown = 0;
    };

    const moveOceanUp = () => {
        ocean.velUp = VERTICAL_VELOCITY;
        ocean.velDown = 0;
        sub.velUp = 0;
        sub.velDown = 0;
    };

    const moveOceanDown = () => {
        ocean.velUp = 0;
        ocean.velDown = VERTICAL_VELOCITY;
        sub.velUp = 0;
        sub.velDown = 0;
    };

    const moveSubVert = () => {
        ocean.velUp = 0;
        ocean.velDown = 0;
        sub.velUp = VERTICAL_VELOCITY;
        sub.velDown = VERTICAL_VELOCITY;
    };

    const moveSubUp = () => {
        ocean.velUp = 0;
        ocean.velDown = 0;
        sub.velUp = VERTICAL_VELOCITY;
        sub.velDown = 0;
    };

    const moveSubDown = () => {
        ocean.velUp = 0;
        ocean.velDown = 0;
        sub.velUp = 0;
        sub.velDown = VERTICAL_VELOCITY;
    };

    if (compVert <= 0) {
        moveOceanDown();
    } else if (compVert < OCEAN_DEPTH_LIMIT && compVert <= varDepth) {
        moveOceanVert();
    } else if (compVert < OCEAN_FLOOR && compVert <= varDepth) {
        ocean.sy = OCEAN_DEPTH_LIMIT - VERTICAL_VELOCITY; // reset the limits empirically
        moveSubVert();
    } else if (compVert >= OCEAN_FLOOR || compVert > varDepth) {
        //below the limit
        moveSubUp();
    }
    return displayObjects;
}

function calcDepthLimit(lat) {
    if (lat < 0) return 0;
    if (lat > FULL_LAT_LIMIT) return (lat = FULL_LAT_LIMIT);
    // The correct constant is filtered out
    const result = LAT_LIMITS.filter((obj) => obj.x >= lat && obj.xll <= lat);
    let depthObject = result[0];

    let startX = depthObject.xll;
    let endX = depthObject.x;
    let startY = depthObject.yll;
    let endY = depthObject.y;
    let x = lat;
    if (depthObject.id === 0) return 21;
    if (startX === endX) {
        // handles vertical line
        if (x >= Math.min(startX, endX) && x <= Math.max(startX, endX)) {
            return startY;
        } else {
            return null;
        }
    }
    const slope = (endY - startY) / (endX - startX);
    const yIntercept = startY - slope * startX;
    const y = slope * x + yIntercept;
    return y;
}

export const hitBottom = () => {
    let hitBottom = document.getElementById("hitBottomContainer");
    hitBottom.classList.remove("hide");
};
export const clearHitBottom = () => {
    let hitBottom = document.getElementById("hitBottomContainer");
    hitBottom.classList.add("hide");
};

const resetVelocities = (ocean: Ocean, sub: Sub) => {
    ocean.setVelRight(0);
    ocean.setVelLeft(0);
    ocean.setVelUp(0);
    ocean.setVelDown(0);
    sub.setVelRight(0);
    sub.setVelLeft(0);
    sub.setVelUp(0);
    sub.setVelDown(0);
};
