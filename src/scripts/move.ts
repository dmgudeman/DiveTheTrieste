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

class Move {
    private ocean: Ocean;
    private sub: Sub;
    private dir: string;
    private constants: CalcConstant;
    private oceanLatLimit: number;
    private oceanVertLimit: number;
    private fullVertLimit: number;
    private compLat: number;
    private compVert: number;
    private variableDepth: number;
    private depthObject: DepthObject;
    private OorS: string[];

    constructor(ocean: Ocean, sub: Sub, dir?: string) {
        this.ocean = ocean;
        this.sub = sub;
        this.dir = dir;
        this.constants = CalcConstant = new CalcConstant();
        this.oceanLatLimit = this.constants.getOceanLatLimit();
        this.oceanVertLimit = this.constants.getOceanVertLimit();
        this.fullVertLimit = this.constants.getFullVertLimit();
        this.compLat =
            this.ocean.getX() - this.sub.getX() + SUB_INITIAL_LAT_POS;
        this.compVert =
            this.ocean.getY() - this.sub.getY() + INITIAL_Y_POSITION;
        this.depthObject = this.constants.getDepthObject(this.compLat);
        this.variableDepth = this.constants.calcDepthLimit(this.compLat);
        this.OorS = this.constants.getOorS(this.compLat, this.compVert);
    }


getMove = (dir: string) => {
    clearHitBottom();
  

    getLatMove(
        ocean,
        sub,
        dir,
        compLat,
        compVert,
        variableDepth,
        oceanLatLimit,
        fullLatLimit
    );

    getVerticalMove(
        ocean,
        sub,
        dir,
        compVert,
        variableDepth,
        oceanVertLimit,
        fullVertLimit,
        depthObjectName,
        compLat,
        OorS
    );
};
function getLatMove(
    ocean: Ocean,
    sub: Sub,
    dir: string,
    lat: number,
    vert: number,
    depth: number,
    oceanLatLimit: number,
    fullLatLimit: number
) {
    let moveUtils = new MoveUtils(ocean, sub, lat, vert);
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
    lat: number,
    OorS: string[]
) {
    let moveUtils = new MoveUtils(ocean, sub, lat, vert);
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

    // calcVertical(vert, ocean, sub);

    // else if (vert > -VERTICAL_VELOCITY - 1) {
    //     if (dir === "down") {
    //         moveOceanDown();
    //     }
    // } else if (vert > depth) {
    // console.log("INNNEEERRRRRRR PRE");
    if (OorS[1] == "O") {
        if (vert > 0) {
            moveOceanDown();
        } else if (vert > -VERTICAL_VELOCITY) {
            if (dir === "down") {
                moveOceanDown();
            }
        } else if (vert > depth) {
            if (dir === "down") {
                console.log("OCEAN5555555555NORMAL");
                moveOceanDown();
            } else if (dir === "up") {
                console.log("OCEAN66666666666NORMAL");
                moveOceanUp();
            }
        } else if (vert < depth + VERTICAL_VELOCITY) {
            if (dir === "up") {
                moveOceanUp();
            }
        } else if (vert < depth) {
            // if (dir === "up") {
            console.log("OCEAN7777777 OVER", vert);

            moveUtils.hitBottomMoveVertical(dir);
        }
    } else if ((OorS[1] = "S")) {
    }
    // } else if (vert > depth + VERTICAL_VELOCITY) {
    //     moveUtils.hitBottomMoveVertical(dir);
    //     console.log("SUBBBBBBBBB NORMAL"); // over ocean limit under depth limit
    //     if (dir === "down") {
    //         moveSubDown();
    //     } else if (dir === "up") {
    //         moveSubUp();
    //     }
    // }
    // } else if (vert < depth + VERTICAL_VELOCITY) {
    //     // over the limit
    //     // console.log("XXXXXXXXXXXXBOTTOM");
    //     if (vert >= oceanVertLimit) {
    //         if (dir === "up") {
    //             moveOceanUp();
    //         }
    //     } else if (vert < fullVertLimit + VERTICAL_VELOCITY) {
    //         if (dir === "up") {
    //             moveSubUp();
    //         }
    //     }
    // }
}


// export const hitBottom = (dir) => {
//     console.log('clear hit bottom dir', dir)
//     let hitBottom = document.getElementById("hitBottomContainer");
//     hitBottom.classList.remove("hide");
// };
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

configureMoveVertical = (
  
) => {
   

    if (this.OorS === "O") {
        this.sub.setY(INITIAL_Y_POSITION);
        if (this.dir === "U") {
            this.ocean.setVelUp();
        } else if (this.dir === "D") {
            this.ocean.setVelDown();
        } else {
            this.ocean.setVelUp();
            this.ocean.setVelDown();
        }
    } else if (this.OorS === "S") {
        if (this.dir === "U") {
            this.sub.setVelUp();
        } else if (dir === "D") {
            this.sub.setVelDown();
        } else {
            this.sub.setVelUp();
            this.sub.setVelDown();
        }
    }
};



const printCoordinates = (
    ocean: Ocean,
    sub: Sub,
    lat: number,
    vert: number,
    oceanVarDepth: number,
    varDepth: number,
    where: string
) => {
    console.log(`=${where}==============`);
    console.log("COORDINATES", lat, vert);
    console.log("OCEAN VAR DEPTH", oceanVarDepth);
    console.log("VARIABLE DEPTH", varDepth);
    console.log("OCEAN X, Y", ocean.getX(), ocean.getY());
    console.log("SUB X, Y", sub.getX(), sub.getY());
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

const printStandard = (
    ocean: Ocean,
    sub: Sub,
    lat: number,
    vert: number,
    varDepth: number,
    depthObject: DepthObject
) => {
    console.log("==============");
    console.log("COMPLAT", lat);
    console.log("COMPVERT", vert);
    console.log("OCEAN Y", ocean.getY());
    console.log("SUB Y", sub.getY());
    console.log("VARIABLE DEPTH", varDepth);
    console.log("depthObjectName", depthObject);
    console.log("==============");
};

}