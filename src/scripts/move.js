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
    OCEAN_FLOOR,
} from "./constants";

let displayObjects;
export const getMove = (moveObjects) => {
    let { ocean, sub, mover } = moveObjects;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
    console.log('compLat', compLat);
    console.log('compVert', compVert)


    displayObjects = { ocean: ocean, sub: sub, mover: mover };
    displayObjects = getLatMove(displayObjects);
    if (compLat < SLOPE_LAT) {
        if (compLat < 0) {
            compLat = 1;
        }
        let depth = compLat *2.3;
        displayObjects = getVerticalMove(displayObjects, depth);
    }
    else if (compLat < LEFT_EDGE_TRENCH) {
        displayObjects = getVerticalMove(displayObjects, SHELF_DEPTH);
    } else {
        displayObjects = getVerticalMove(displayObjects);
    }
    return displayObjects;
};
function getLatMove(moveObjects) {
    let { ocean, sub, mover } = moveObjects;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;

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
    } else if (compLat < FULL_LAT_LIMIT) {
        moveSubLat();
    } else if (compLat >= FULL_LAT_LIMIT) {
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
    } else if (compVert <= OCEAN_DEPTH_LIMIT && compVert <= varDepth) {
        moveOceanVert();
    } else if (compVert < OCEAN_FLOOR && compVert <= varDepth) {
        moveSubVert();
    } else if (compVert >= OCEAN_FLOOR || compVert > varDepth) {
        //below the limit
        moveSubUp();
    }

    return displayObjects;
}
