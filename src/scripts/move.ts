import {
    INITIAL_Y_POSITION,
    LEFT_EDGE_TRENCH,
    RIGHT_EDGE_TRENCH,
    OCEAN_DEPTH_LIMIT,
    FULL_LAT_LIMIT,
    LAT_VELOCITY,
    VERTICAL_VELOCITY,
    SUB_INITIAL_LAT_POS,
    SLOPE_LAT,
    SHELF_DEPTH,
    TRENCH_TOP,
    OCEAN_FLOOR,
    LAT_LIMITS,
    LAT_LIMITS_EXT,
} from "./constants";
import Ocean from "./ocean";
import Sub from "./sub";
import { MoveObjects, LatMoveLimit, DepthObject } from "./types";
import CalcConstant from "./calcConstant";
import MoveUtils from "./moveUtils";
import { WIDTH } from "../index";


let displayObjects;

export const getMove = (dir: string) => {
    clearHitBottom();
    const ocean:Ocean = Ocean.getInstance();
    const sub:Sub = Sub.getInstance();
    const constants:CalcConstant = new CalcConstant();
    const oceanLatLimit:number = constants.getOceanLatLimit();
    const fullLatLimit:number = constants.getFullLatLimit();
    const oceanVertLimit:number = constants.getOceanVertLimit();
    const fullVertLimit:number = constants.getFullVertLimit();
    let compLat:number = ocean.getX() - sub.getX() + SUB_INITIAL_LAT_POS;
    let compVert:number = ocean.getY() - sub.getY() + INITIAL_Y_POSITION;
    let variableDepth:number = calcDepthLimit(compLat);
    const depthObject: DepthObject = constants.getDepthObject(compLat);
    const depthObjectName:string | undefined = depthObject?.name;
    if (variableDepth === null) {
        variableDepth = fullVertLimit;
    }
    const moveUtils:MoveUtils = new MoveUtils(ocean, sub, compLat, compVert)

    getLatMove(
        ocean,
        sub,
        dir,
        compLat,
        variableDepth,
        oceanLatLimit,
        fullLatLimit
    );
    moveUtils.configureMoveVertical()
    // getVerticalMove(
    //     ocean,
    //     sub,
    //     dir,
    //     compVert,
    //     variableDepth,
    //     oceanVertLimit,
    //     fullVertLimit,
    //     depthObjectName,
    //     compLat
    // );
};
function getLatMove(
    ocean: Ocean,
    sub: Sub,
    dir: string,
    lat: number,
    depth: number,
    oceanLatLimit: number,
    fullLatLimit: number
) {
    const moveOceanRight = () => {
        ocean.setX(ocean.getX() - LAT_VELOCITY);
    };
    const moveOceanLeft = () => {
        ocean.setX(ocean.getX() + LAT_VELOCITY);
    };
    const moveSubRight = () => {
        sub.setX(sub.getX() + LAT_VELOCITY);
    };
    const moveSubLeft = () => {
        sub.setX(sub.getX() - LAT_VELOCITY);
    };

    if (lat > 0) {
        moveOceanRight();
    } else if (lat > oceanLatLimit) {
        if (dir === "right") {
            moveOceanRight();
        } else if (dir === "left") {
            moveOceanLeft();
        }
    } else if (lat > fullLatLimit) {
        if (dir === "right") {
            moveSubRight();
        } else if (dir === "left") {
            moveSubLeft();
        }
    } else if (lat < fullLatLimit) {
        if (dir === "left") {
            moveSubLeft();
        }
    }
}

function getVerticalMove(
    ocean: Ocean,
    sub: Sub,
    dir: string,
    vert: number,
    depth: number,
    oceanVertLimit: number,
    fullVertLimit: number,
    depthObjectName,
    lat: number
) {
    
    const moveOceanUp = () => {
        ocean.setY(ocean.getY() + VERTICAL_VELOCITY);
    };

    const moveOceanDown = () => {
        ocean.setY(ocean.getY() - VERTICAL_VELOCITY);
    };

    const moveSubUp = () => {
        sub.setY(sub.getY() - VERTICAL_VELOCITY);
    };

    const moveSubDown = () => {
        sub.setY(sub.getY() + VERTICAL_VELOCITY);
    };

    calcVertical(vert, ocean, sub);
    if (vert > 0) {
        moveSubDown();
    } else if (vert > -VERTICAL_VELOCITY - 1) {
        if (dir === "down") {
            moveOceanDown();
        }
    } else if (vert > depth) {
        // console.log("INNNEEERRRRRRR PRE");
        if (vert >= oceanVertLimit + VERTICAL_VELOCITY) {
            // less than ocean limit
            // console.log("OCEANNNNNNNNNNNNNNNNN");
            if (vert >= depth) {    // overLimit
                // console.log("OCEAN44444444 NORMAL");
                if (dir === "down") {
                    moveOceanDown();
                } else if (dir === "up") {
                    moveOceanUp();
                }
            } else if (vert <= depth + VERTICAL_VELOCITY) {
                // over depth limit
                // console.log("OCEAN7777777 OVER", vert);
                if (dir === "up") {
                    moveOceanUp();
                }
            }
        } else if (vert > depth + VERTICAL_VELOCITY) {
            // console.log("SUBBBBBBBBB NORMAL"); // over ocean limit under depth limit
            if (dir === "down") {
                moveSubDown();
            } else if (dir === "up") {
                moveSubUp();
            }
        }
    } else if (vert < depth + VERTICAL_VELOCITY) {
        // over the limit
        // console.log("XXXXXXXXXXXXBOTTOM");
        if (vert >= oceanVertLimit) {
            if (dir === "up") {
                moveOceanUp();
            }
        } else if (vert < fullVertLimit + VERTICAL_VELOCITY) {
            if (dir === "up") {
                moveSubUp();
            }
        }
    }
}

function calcDepthLimit(lat: number) {
    const constants = new CalcConstant();
    // if (lat < 0) return 0;
    // if (lat > FULL_LAT_LIMIT) return (lat = FULL_LAT_LIMIT);
    // The correct constant is filtered out
    const depthObject: LatMoveLimit = constants.getDepthObject(lat);
    if (!depthObject) return null;
    let startX = depthObject.xll;
    let endX = depthObject.x;
    let startY = depthObject.yll;
    let endY = depthObject.y;
    let x = lat;
    if (depthObject.id === 0) return 21;
    if (startX === endX) {
        // handles vertical line
        endX = endX + 1;
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
    ocean.zeroVelRight();
    ocean.zeroVelLeft();
    ocean.zeroVelUp();
    ocean.zeroVelDown();
    sub.zeroVelRight();
    sub.zeroVelLeft();
    sub.zeroVelUp();
    sub.zeroVelDown();
};

const calcVertical = (vert: number, ocean: Ocean, sub: Sub): void => {
    let Y = ocean.getY();
    if (Math.abs(Y - vert) > 10 && vert > -100) {
        ocean.setY(0);
        sub.setY(80);
    }
};

const configureMoveVertical = (
    ocean: Ocean,
    sub: Sub,
    OorS: string,
    dir: string
) => {
    ocean.zeroVelUp();
    ocean.zeroVelDown();
    sub.zeroVelUp();
    sub.zeroVelDown();

    if (OorS === "O") {
        sub.setY(INITIAL_Y_POSITION);
        if (dir === "U") {
            ocean.setVelUp();
        } else if (dir === "D") {
            ocean.setVelDown();
        } else {
            ocean.setVelUp();
            ocean.setVelDown();
        }
    } else if (OorS === "S") {
        if (dir === "U") {
            sub.setVelUp();
        } else if (dir === "D") {
            sub.setVelDown();
        } else {
            sub.setVelUp();
            sub.setVelDown();
        }
    }
};

function calcLatConstant(lat: number) {
    if (lat < 0) return 0;
    if (lat > FULL_LAT_LIMIT) return (lat = FULL_LAT_LIMIT);
    // The correct constant is filtered out

    const result: DepthObject[] | undefined = LAT_LIMITS_EXT.filter(
        (obj: DepthObject) => obj.x >= lat && obj.xll <= lat
    );
    if (result === undefined) {
        return null;
    }
    let depthObject: DepthObject = result[0];
    return depthObject;
}
// from configure hitbottom

// function getLatMove(objects, variableDepth) {
//     let { ocean, sub } = objects;
//     let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
//     let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;

//     if (compLat < LAT_VELOCITY) {
//         configureMoveLateral(objects, "O", "R");
//     } else if (compLat < OCEAN_LAT_LIMIT - LAT_VELOCITY) {
//         if (compVert < variableDepth - VERTICAL_VELOCITY) {
//             configureMoveLateral(objects, "O", "B");
//         } else {
//             // ocean.sy -= VERTICAL_VELOCITY;
//             // configureMoveLateral(objects, 'O', 'R')
//             configureHitBottom(compLat, objects, "S");
//         }
//     } else if (compLat < FULL_LAT_LIMIT) {
//         if (compVert < variableDepth - VERTICAL_VELOCITY) {
//             configureMoveLateral(objects, "S", "B");
//         } else {
//             // sub.sy -= LAT_VELOCITY;
//             // configureMoveLateral(objects, 'O', 'L')
//             // moveSubLeft();
//             configureHitBottom(compLat, objects, "S");
//         }
//     }

//     return displayObjects;
// }

// export const LAT_LIMITS = [  // the x, xll, y, yll are for slope, the mvmt are to control movement when hit bottom
//   {'id':0, 'name':'OUT_BOUNDS_L',     x: -0,    xll: -0,     y: -0,    yll: -0,    mvmtLat: 'R', mvmtVert:  null},
//   {'id':1, 'name':'INITIAL_POSITION', x: -0,    xll: -0,     y: -0,    yll: -0,    mvmtLat: 'R', mvmtVert:  null},
//   {'id':2, 'name':'SLOPE_LIMIT',      x: -180,  xll: -1,     y: -400,  yll: -1,    mvmtLat: 'R', mvmtVert: 'U'},
//   {'id':3, 'name':'START_BUMP',       x: -630,  xll: -181,   y: -475,  yll: -401,  mvmtLat: 'L', mvmtVert: 'U'},
//   {'id':4, 'name':'BUMP_PEAK',        x: -720,  xll: -631,   y: -380,  yll: -476,  mvmtLat: 'B', mvmtVert: 'U'},
//   {'id':5, 'name':'END_BUMP',         x: -800,  xll: -721,   y: -485,  yll: -381,  mvmtLat: 'R', mvmtVert: 'U'},
//   {'id':6, 'name':'START_DBL',        x: -840,  xll: -801,   y: -460,  yll: -486,  mvmtLat: 'B', mvmtVert: 'U'},
//   {'id':7, 'name':'DBL_PEAK_1',       x: -980,  xll: -841,   y: -200,  yll: -461,  mvmtLat: 'B', mvmtVert: 'U'},
//   {'id':8, 'name':'DBL_PEAK_2',       x: -1120, xll: -981,   y: -240,  yll: -199,  mvmtLat: 'B', mvmtVert: 'U'},
//   {'id':9, 'name':'END_DBL',          x: -1180, xll: -1121,  y: -450,  yll: -239,  mvmtLat: 'R', mvmtVert: 'U'},
//   {'id':10, 'name':'START_TRENCH',    x: -1320, xll: -1181,  y: -500,  yll: -451,  mvmtLat: 'B', mvmtVert: 'U'},
//   {'id':11, 'name':'TRENCH_BOTTOM',   x: -1600, xll: -1321,  y: -1560, yll: -501,  mvmtLat: 'R', mvmtVert: 'U'},
//   {'id':12, 'name':'END_TRENCH',      x: -1740, xll: -1601,  y: -480,  yll: -1561, mvmtLat: 'L', mvmtVert: 'U'},
//   {'id':13, 'name':'END_POSITION',    x: -2200, xll: -1741,  y: -485,  yll: -481,  mvmtLat: 'L', mvmtVert: 'U'},
//   {'id':14, 'name':'OUT_BOUND_R',     x: -2200, xll: -1741,  y: -485,  yll: -481,  mvmtLat: 'L', mvmtVert: 'U'},
// ]

const printCoordinates = (moveObjects, where) => {
    let { ocean, sub } = moveObjects;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
    console.log(`=${where}==============`);
    console.log("COORDINATES", compLat, compVert);

    console.log("OCEANNNNNNN", ocean.sx, ocean.sy);
    console.log("SUBBBBBBBBB", sub.x, sub.y);
    console.log("========================");
    console.log("                           ");
};

const printMoveObjects = (moveObjects, where) => {
    let { ocean, sub, lat, vert } = moveObjects;
    let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
    console.log(`=${where}===========`);
    console.log("MO.ocean", ocean);
    console.log("MO.sub", sub);
    console.log("======================");
    console.log("=======================");

    console.log("MO.lat", lat);
    console.log("MO.vert", vert);
    console.log("_____________________");
    console.log("                           ");
};

const printStandard =(ocean:Ocean, sub:Sub, lat:number, vert:number, varDepth:number, depthObject:DepthObject)=> {
    console.log("==============");
    console.log("COMPLAT", lat);
    console.log("COMPVERT", vert);
    console.log("OCEAN Y", ocean.getY());
    console.log("SUB Y", sub.getY());
    console.log("VARIABLE DEPTH", varDepth);
    console.log("depthObjectName", depthObject);
    console.log("==============");
}