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

let displayObjects;
export const getMove = (moveObjects) => {
    clearHitBottom();
    let { ocean, sub } = moveObjects;
    clearObjectsVelocity(moveObjects);
    printCoordinates(moveObjects);

    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
                                                         
    let variableDepth = calcDepthLimit(compLat);

    // let variableDepth = getVariableDepth(compLat);
    displayObjects = { ocean: ocean, sub: sub };
    displayObjects = getLatMove(displayObjects, variableDepth);
    displayObjects = getVerticalMove(displayObjects, variableDepth);
    // // fine tune the depth stop for the slope and the shelves
    // if (compLat < SLOPE_LAT) {
    //     if (compLat < 0) {
    //         compLat = 1;
    //     }
    //     let depth = compLat * 2.3;
    //     displayObjects = getVerticalMove(displayObjects, depth);
    // } else if (compLat < LEFT_EDGE_TRENCH || compLat > RIGHT_EDGE_TRENCH) {
    //     displayObjects = getVerticalMove(displayObjects, variableDepth);
    // } else {
    //     displayObjects = getVerticalMove(displayObjects);
    // }

    return displayObjects;
};
function getLatMove(objects, variableDepth) {
    let { ocean, sub } = objects;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;

    if (compLat < LAT_VELOCITY) {
       configureMoveLateral(objects, 'O', 'R')
  
    } else if (compLat < OCEAN_LAT_LIMIT - LAT_VELOCITY) {
        if (compVert < variableDepth - VERTICAL_VELOCITY) {
            configureMoveLateral(objects, 'O', 'B')
        } else {
            // ocean.sy -= VERTICAL_VELOCITY;
            // configureMoveLateral(objects, 'O', 'R')
            configureHitBottom(compLat, objects, 'S');
        }
    } else if (compLat < FULL_LAT_LIMIT ) {
        if (compVert < variableDepth - VERTICAL_VELOCITY) {
            configureMoveLateral(objects, 'S', 'B')
         
        } else {
            // sub.sy -= LAT_VELOCITY;
            // configureMoveLateral(objects, 'O', 'L')
            // moveSubLeft();
            configureHitBottom(compLat, objects, 'S');
        }
    } 

    return displayObjects;
}

function getVerticalMove(objects, varDepth = OCEAN_FLOOR) {
    let { ocean, sub } = objects;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
    console.log('VARDEPTH ', varDepth)

    if (compVert <= 0) {
        console.log('11111111111111')
        configureMoveVertical(objects, 'O', 'D')
        // moveOceanDown();
    } else if (
        compVert < OCEAN_DEPTH_LIMIT - VERTICAL_VELOCITY &&
        compVert <= varDepth - VERTICAL_VELOCITY
    ) {
        console.log('222222222222222')
        configureMoveVertical(objects, 'O', 'B')
        // moveOceanVert();
    } else if (
        compVert < OCEAN_DEPTH_LIMIT - VERTICAL_VELOCITY &&
        compVert < varDepth - VERTICAL_VELOCITY
    ) {
        console.log('3333333333333333')
        // ocean.sy = OCEAN_DEPTH_LIMIT - VERTICAL_VELOCITY; // reset the limits empirically
        configureMoveVertical(objects, 'S', 'B')
        // moveSubVert();
    } else if (
        compVert < OCEAN_DEPTH_LIMIT - VERTICAL_VELOCITY &&
        compVert > varDepth - VERTICAL_VELOCITY
    ) {
        // hit limit
        // ocean.sy -= VERTICAL_VELOCITY  // reset the limits empirically
        configureHitBottom(compLat, objects, 'O');
    } else if (
        compVert <= OCEAN_FLOOR - VERTICAL_VELOCITY ||
        compVert <= varDepth -VERTICAL_VELOCITY
    ) {
        console.log('55555555555555555')
 
        configureMoveVertical(objects, 'S', 'B')   
    } else if (
        compVert <= OCEAN_FLOOR - VERTICAL_VELOCITY ||
        compVert >= varDepth - VERTICAL_VELOCITY
    ) {
        console.log('55555555555555555')
        //below the limit
      
        // moveSubUp();
        configureHitBottom(compLat, objects, 'S');
    }
    return displayObjects;
}

function calcDepthLimit(lat) {
    let depthObject = calcLatConstant(lat);
    console.log("DEPTHOBJECT",depthObject)

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

function calcLatConstant(lat) {
    if (lat < 0) return 0;
    if (lat > FULL_LAT_LIMIT) return (lat = FULL_LAT_LIMIT);
    // The correct constant is filtered out

    console.log("LATTTTTT", lat)
    const result = LAT_LIMITS.filter((obj) => obj.x >= lat && obj.xll <= lat);
    let depthObject = result[0];
    return depthObject;
}

export const configureHitBottom = (lat, objects,  object) => {
    let hitBottom = document.getElementById("hitBottomContainer");
    hitBottom.classList.remove("hide");
    let depthObject = calcLatConstant(lat);
    console.log("OBJECTS", objects)
    console.log(" HITBOTTOM DEPTHOBJECT",  depthObject)
    configureMoveLateral(objects, object, depthObject.mvmtL);
    configureMoveVertical(objects, object, depthObject.mvmtV)
};
export const clearHitBottom = () => {
    let hitBottom = document.getElementById("hitBottomContainer");
    hitBottom.classList.add("hide");
};

const configureMoveVertical = (objects, object, dir) => {
    const { ocean, sub } = objects;
    ocean.velUp = 0;
    ocean.velDown = 0;
    sub.velUp = 0;
    sub.velDown = 0;

    if (object === "O") {
        sub.y = INITIAL_Y_POSITION;
        if (dir === "U") {
            ocean.velUp = VERTICAL_VELOCITY;
        } else if (dir === "D") {
            ocean.velDown = VERTICAL_VELOCITY;
        } else {
            ocean.velUp = VERTICAL_VELOCITY;
            ocean.velDown = VERTICAL_VELOCITY;
        }
    } else if (object === "S") {
        if (dir === "U") {
            sub.velUp = VERTICAL_VELOCITY;
        } else if (dir === "D") {
            sub.velDown = VERTICAL_VELOCITY;
        } else {
            sub.velUp = VERTICAL_VELOCITY;
            sub.velDown = VERTICAL_VELOCITY;
        }
    }
};

const configureMoveLateral = (objects, object, dir) => {
    const { ocean, sub } = objects;
    ocean.velRight = 0;
    ocean.velLeft = 0;
    sub.velRight = 0;
    sub.velLeft = 0;

    if (object === "O") {
        if (dir === "R") {
            ocean.velRight = LAT_VELOCITY;
        } else if (dir === "L") {
            ocean.velLeft = LAT_VELOCITY;
        } else {
            ocean.velRight = LAT_VELOCITY;
            ocean.velLeft = LAT_VELOCITY;
        }
    } else if (object === "S") {
        if (dir === "R") {
            sub.velRight = LAT_VELOCITY;
        } else if (dir === "L") {
            sub.velLeft = LAT_VELOCITY;
        } else {
            sub.velRight = LAT_VELOCITY;
            sub.velLeft = LAT_VELOCITY;
        }
    }
};


const omnibusMove = (moveObjects) =>  {
    clearObjectsVelocity(moveObjects)
    clearHitBottom();
    let { ocean, sub } = moveObjects;
    printCoordinates(moveObjects);
    

    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
                                                        
    let variableDepth = calcDepthLimit(compLat);

    // let variableDepth = getVariableDepth(compLat);
    displayObjects = { ocean: ocean, sub: sub };
    displayObjects = getLatMove(displayObjects, variableDepth);
    displayObjects = getVerticalMove(displayObjects, variableDepth);
}

const clearObjectsVelocity = (moveObjects) => {
    let { ocean, sub } = moveObjects;
    ocean.velRight = 0;
    ocean.velLeft = 0;
    ocean.velUp = 0;
    ocean.velDown = 0;
    sub.velRight = 0;
    sub.velLeft = 0;
    sub.velUp = 0;
    sub.velDown = 0;

}

const printCoordinates = (moveObjects) => {
    let { ocean, sub } = moveObjects;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
    console.log("=========================================================");
    console.log("COORDINATES", compLat, compVert);
    console.log("=========================================================");
    console.log("OCEANNNNNNN", ocean.sx, ocean.sy);
    console.log("SUBBBBBBBBB", sub.x, sub.y);
    console.log("                           "); 
}
