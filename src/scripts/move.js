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
} from "./constants";

let displayObjects;
export const getMove = (moveObjects) => {
    let { ocean, sub} = moveObjects;
    
    ocean.velRight=0;
    ocean.velLeft=0;
    ocean.velUp=0;
    ocean.velDown=0;
    sub.velRight=0;
    sub.velLeft=0;
    sub.velUp=0;
    sub.velDown=0;

    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;



    displayObjects = { ocean: ocean, sub: sub};
    displayObjects = getLatMove(displayObjects);
 
    // fine tune the depth stop for the slope and the shelves
    if (compLat < SLOPE_LAT) {
        if (compLat < 0) {
            compLat = 1;
        }
        let depth = compLat *2.3;
        displayObjects = getVerticalMove(displayObjects, depth);
    }
    else if (compLat < LEFT_EDGE_TRENCH || compLat > RIGHT_EDGE_TRENCH) {
        displayObjects = getVerticalMove(displayObjects, SHELF_DEPTH);
    } else {
        displayObjects = getVerticalMove(displayObjects);
    }

    return displayObjects;
};
function getLatMove(moveObjects, varLeft=LEFT_EDGE_TRENCH, varRight=FULL_LAT_LIMIT ) {
    let { ocean, sub} = moveObjects;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;

    console.log('OCEAN_SY', ocean.sy)

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

    if (compLat < 0) {
        moveOceanRight();
    } else if (compLat < OCEAN_LAT_LIMIT) {
        moveOceanLat();
    } else if (compLat < LEFT_EDGE_TRENCH && compVert > TRENCH_TOP) {
        moveSubRight()
    } else if (compLat > RIGHT_EDGE_TRENCH && compVert > TRENCH_TOP) {
        ocean.sx = OCEAN_LAT_LIMIT - LAT_VELOCITY; // reset the limits empirically
        moveSubLeft();
    } else if (compLat < FULL_LAT_LIMIT) {
        ocean.sx = OCEAN_LAT_LIMIT; // reset the limits empirically
        moveSubLat();
    } else if (compLat >= FULL_LAT_LIMIT) {
        ocean.sx = OCEAN_LAT_LIMIT; // reset the limits empirically
        moveSubLeft();
    } else {
        moveSubLat();
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
