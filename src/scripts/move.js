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
    LAT_LIMIT_00_0_0,
    LAT_LIMIT_01_220_420,
    LAT_LIMIT_02_620_480,
    LAT_LIMIT_03_720_380,
    LAT_LIMIT_04_860_500,
    LAT_LIMIT_05_1000_200,
    LAT_LIMIT_06_1100_200,
    LAT_LIMIT_07_1200_460,
    LAT_LIMIT_08_1280_480,
    LAT_LIMITS,
} from "./constants";

let displayObjects;
export const getMove = (moveObjects) => {
    clearHitBottom();
    let { ocean, sub } = moveObjects;

    ocean.velRight = 0;
    ocean.velLeft = 0;
    ocean.velUp = 0;
    ocean.velDown = 0;
    sub.velRight = 0;
    sub.velLeft = 0;
    sub.velUp = 0;
    sub.velDown = 0;

    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;

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
    } else if (compLat < OCEAN_LAT_LIMIT) {
        if (compVert < variableDepth) {
            moveOceanLat();
        } else {
            ocean.sy -= VERTICAL_VELOCITY;
            hitBottom();
        }
    } else if (compLat < FULL_LAT_LIMIT){
        if (compVert < variableDepth) {
            moveSubLat();
        } else {
            sub.sy -= VERTICAL_VELOCITY;
            hitBottom();
        }

    } else {
        moveSubLeft();
        moveSubUp();
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

// const getVariableDepth = (lat) => {
//     // console.log("LLLAAATTT in getLeftVariable Depth", lat);
//     if (lat < LAT_LIMIT_01_220_420[0]) {
//         let depth = calcDepthLimit(LAT_LIMIT_00_0_0, LAT_LIMIT_01_220_420, lat);
//         //    console.log('DEPTH', depth)
//         return depth;
//     } else if (lat < LAT_LIMIT_02_620_480[0]) {
//         let depth = calcDepthLimit(
//             LAT_LIMIT_01_220_420,
//             LAT_LIMIT_02_620_480,
//             lat
//         );
//         // console.log('DEPTH', depth)
//         return depth;
//     } else if (lat < LAT_LIMIT_03_720_380[0]) {
//         let depth = calcDepthLimit(
//             LAT_LIMIT_02_620_480,
//             LAT_LIMIT_03_720_380,
//             lat
//         );
//         console.log("DEPTH", depth);
//         return depth;
//     } else if (lat < LAT_LIMIT_04_860_500[0]) {
//         let depth = calcDepthLimit(
//             LAT_LIMIT_03_720_380,
//             LAT_LIMIT_04_860_500,
//             lat
//         );
//         console.log("DEPTH", depth);
//         return depth;
//     } else if (lat < LAT_LIMIT_05_1000_200[0]) {
//         let depth = calcDepthLimit(
//             LAT_LIMIT_04_860_500,
//             LAT_LIMIT_05_1000_200,
//             lat
//         );
//         console.log("DEPTH", depth);
//         return depth;
//     } else if (lat < LAT_LIMIT_06_1100_200[0]) {
//         let depth = calcDepthLimit(
//             LAT_LIMIT_05_1000_200,
//             LAT_LIMIT_06_1100_200,
//             lat
//         );
//         console.log("DEPTH", depth);
//         return depth;
//     } else if (lat < LAT_LIMIT_07_1200_460[0]) {
//         let depth = calcDepthLimit(
//             LAT_LIMIT_06_1100_200,
//             LAT_LIMIT_07_1200_460,
//             lat
//         );
//         console.log("DEPTH", depth);
//         return depth;
//     } else if (lat < LAT_LIMIT_08_1280_480[0]) {
//         let depth = calcDepthLimit(
//             LAT_LIMIT_07_1200_460,
//             LAT_LIMIT_08_1280_480,
//             lat
//         );
//         console.log("DEPTH", depth);
//         return depth;
//     }
//     return OCEAN_FLOOR;
// };

// const calcDepthLimitDynamic = (lat) => {
//     let array = [...LAT_LIMITS];
//     const result = array.filter((obj) => obj.x >= lat && obj.xll <= lat);
//     return calcDepthLimit(result[0], lat);
// };

function calcDepthLimit(lat) {
    const result = LAT_LIMITS.filter((obj) => obj.x >= lat && obj.xll <= lat);
    let depthObject = result[0];
  

    let startX = depthObject.xll;
    let endX = depthObject.x;
    let startY = depthObject.yll;
    let endY = depthObject.y;
    let x = lat;
    if (depthObject.id === 0) return 21;

    // handles vertical line
    if (startX === endX) {
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
