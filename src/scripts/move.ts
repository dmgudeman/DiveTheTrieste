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
// import MoveUtils from "./moveUtils";
import { WIDTH } from "../index";

class Move {
    private ocean: Ocean;
    private sub: Sub;
    private dir: string;
    private constants: CalcConstant;
    private oceanLatLimit: number;
    private oceanVertLimit: number;
    private fullLatLimit: number;
    private fullVertLimit: number;
    private compLat: number;
    private compVert: number;
    private varDepth: number;
    private depthObject: DepthObject;
    private OorS: string[];

    constructor(ocean: Ocean, sub: Sub, dir?: string) {
        this.ocean = ocean;
        this.sub = sub;
        this.dir = dir || null;
        this.constants = new CalcConstant() || null;
        this.oceanLatLimit = this.constants.getOceanLatLimit() ?? null;
        this.oceanVertLimit = this.constants.getOceanVertLimit() ?? null;
        this.fullLatLimit = this.constants.getFullLatLimit() ?? null;
        this.fullVertLimit = this.constants.getFullVertLimit() ?? null;
        this.compLat =
            this.ocean.getX() - this.sub.getX() + SUB_INITIAL_LAT_POS ?? null;
        this.compVert =
            this.ocean.getY() - this.sub.getY() + INITIAL_Y_POSITION ?? null;
        this.depthObject = this.constants.getDepthObject(this.compLat) || null;
        this.varDepth = this.constants.calcDepthLimit(this.compLat) || null;
        this.OorS = this.constants.getOorS(this.compLat, this.compVert) || null;
    }


    upDateCoordinates() {
        this.compLat = this.ocean.getX() - this.sub.getX() + SUB_INITIAL_LAT_POS;
        this.compVert = this.ocean.getY() - this.sub.getY() + INITIAL_Y_POSITION 
        this.oceanLatLimit = this.constants.getOceanLatLimit();
        this.oceanVertLimit = this.constants.getOceanVertLimit();
        this.fullLatLimit = this.constants.getFullLatLimit();
        this.fullVertLimit = this.constants.getFullVertLimit() ;
        this.depthObject = this.constants.getDepthObject(this.compLat);
        this.varDepth = this.constants.calcDepthLimit(this.compLat);
        this.OorS = this.constants.getOorS(this.compLat, this.compVert);
    }

    getMove = (dir: string) => {
        this.setDir(dir);
        this.upDateCoordinates();
        this.getLatMove();
        this.getVerticalMove();
    };

    getLatMove() {
        if (this.compLat > 0) {
            this.moveOceanRight();
        } else if (this.compLat >= this.oceanLatLimit) {
            if (this.dir === "right") {
                this.moveOceanRight();
            } else if (this.dir === "left") {
                this.moveOceanLeft();
            }
        } else if (this.compLat > this.fullLatLimit) {
            if (this.dir === "right") {
                this.moveSubRight();
            } else if (this.dir === "left") {
                this.moveSubLeft();
            }
        } else if (this.compLat < this.fullLatLimit) {
            if (this.dir === "left") {
                this.moveSubLeft();
            }
        }
    }

    getVerticalMove() {

        this.printCoordinates('getVerticalMove')
        console.log('this.Oors', this.OorS)
        if (this.OorS[1] == "O") {
            console.log('AAAAAAAAA')
            if (this.compVert > 0) {  // move down no matter what if above surface
                console.log('BBBBBBBBB')
                this.moveOceanDown();
            } else if (this.compVert > -VERTICAL_VELOCITY) { // stop one vertical vel upon rising
                if (this.dir === "down") {
                    console.log('CCCCCCCCC')
                    this.moveOceanDown();
                }
            } else if (this.compVert > this.varDepth ) { // normal
                if (this.dir === "down") {
                    console.log('DDDDDDDD')
                    this.moveOceanDown();
                } else if (this.dir === "up") { 
                console.log('EEEEEEEEE')
                    this.moveOceanUp();
                }
            } else if (this.compVert <= this.varDepth + VERTICAL_VELOCITY ) { // stop one vel unit from lower limit
                console.log('FFFFFFFF')
                if (this.dir === "up") {
                    this.moveOceanUp();
                }             
            }
        } else if ((this.OorS[1] = "S")) {
            console.log('000000000')
            if (this.compVert > this.oceanVertLimit + VERTICAL_VELOCITY ) { 
                console.log('1111111111')
                console.log('this.varDepth + VERTICAL_VELOCITY ', this.varDepth + VERTICAL_VELOCITY )

                if (this.dir === "down") {
                    this.moveSubDown();
                }

            } else if (this.compVert > this.varDepth) { // normal
                if (this.dir === "down") {
                    console.log('22222')
                    this.moveSubDown();
                } else if (this.dir === "up") { //
                    console.log('3333331')
                    this.moveSubUp();
                }
            } else if (this.compVert < this.varDepth + VERTICAL_VELOCITY) { // stop one vel unit from lower limit
                if (this.dir === "up") {
                    console.log('444444444')
                    this.moveSubUp();
                }             
            }

         console.log('XXXXXXXXXXX')
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
    clearHitBottom = () => {
        let hitBottom = document.getElementById("hitBottomContainer");
        hitBottom.classList.add("hide");
    };

    resetVelocities = () => {
        this.ocean.zeroVelRight();
        this.ocean.zeroVelLeft();
        this.ocean.zeroVelUp();
        this.ocean.zeroVelDown();
        this.sub.zeroVelRight();
        this.sub.zeroVelLeft();
        this.sub.zeroVelUp();
        this.sub.zeroVelDown();
    };

    configureMoveVertical = () => {
        if (this.OorS[1] === "O") {
            this.sub.setY(INITIAL_Y_POSITION);
            if (this.dir === "U") {
                this.ocean.setVelUp();
            } else if (this.dir === "D") {
                this.ocean.setVelDown();
            } else {
                this.ocean.setVelUp();
                this.ocean.setVelDown();
            }
        } else if (this.OorS[1] === "S") {
            if (this.dir === "U") {
                this.sub.setVelUp();
            } else if (this.dir === "D") {
                this.sub.setVelDown();
            } else {
                this.sub.setVelUp();
                this.sub.setVelDown();
            }
        }
    };

    printCoordinates = (where: string) => {
        console.log(`=${where}==============`);
        console.log("COMP LAT VERT", this.compLat, this.compVert);
        console.log("OCEAN VERT LIMIT", this.oceanVertLimit);
        console.log("OCEAN LAT LIMIT", this.oceanLatLimit);
        console.log("VARDEPTH", Math.floor(this.varDepth));
        console.log("OCEAN X, Y", this.ocean.getX(), this.ocean.getY());
        console.log("SUB X, Y", this.sub.getX(), this.sub.getY());
        console.log("========================");
        console.log("                           ");
    };

    // printMoveObjects = (moveObjects, where) => {
    //     let { ocean, sub, lat, vert } = moveObjects;
    //     let compLat = ocean.sx + sub.x - SUB_INITIAL_LAT_POS;
    //     let compVert = ocean.sy + sub.y - INITIAL_Y_POSITION;
    //     console.log(`=${where}===========`);
    //     console.log("MO.ocean", ocean);
    //     console.log("MO.sub", sub);
    //     console.log("======================");
    //     console.log("=======================");

    //     console.log("MO.lat", lat);
    //     console.log("MO.vert", vert);
    //     console.log("_____________________");
    //     console.log("                           ");
    // };

    printStandard = (where: string) => {
        console.log(`${where}`);
        console.log("COMPLAT", this.compLat);
        console.log("COMPVERT", this.compVert);
        console.log("OCEAN Y", this.ocean.getY());
        console.log("SUB Y", this.sub.getY());
        console.log("VARIABLE DEPTH", this.varDepth);
        console.log("depthObjectName", this.depthObject);
        console.log("==============");
    };

    moveOceanRight = () => {
        this.ocean.setX(this.ocean.getX() - LAT_VELOCITY);
    };
    moveOceanLeft = () => {
        this.ocean.setX(this.ocean.getX() + LAT_VELOCITY);
    };
    moveSubRight = () => {
        this.sub.setX(this.sub.getX() + LAT_VELOCITY);
    };
    moveSubLeft = () => {
        this.sub.setX(this.sub.getX() - LAT_VELOCITY);
    };
    moveOceanUp = () => {
        this.ocean.setY(this.ocean.getY() + VERTICAL_VELOCITY);
    };

    moveOceanDown = () => {
        this.ocean.setY(this.ocean.getY() - VERTICAL_VELOCITY);
    };

    moveSubUp = () => {
        this.sub.setY(this.sub.getY() - VERTICAL_VELOCITY);
    };

    moveSubDown = () => {
        this.sub.setY(this.sub.getY() + VERTICAL_VELOCITY);
    };

    setDir(dir: string) {
        this.dir = dir;
    }
}

export default Move;
