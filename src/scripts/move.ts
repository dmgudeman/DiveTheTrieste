import {
    INITIAL_Y_POSITION,
    LAT_VELOCITY,
    VERTICAL_VELOCITY,
    SUB_INITIAL_LAT_POS,
} from "./constants";
import Ocean from "./ocean";
import Sub from "./sub";
import { DepthObject } from "./types";
import CalcConstant from "./calcConstant";
import Zone from './zone';

class Move {
    private ocean: Ocean;
    private sub: Sub;
    private dir: string;
    private constants: CalcConstant;
    private oceanLatLimit: number;
    private oceanVertLimit: number;
    private fullLatLimit: number;
    private compLat: number;
    private compVert: number;
    private varDepth: number;
    private depthObject: DepthObject;
    private OorS: string[];
    private increaseVelFlag: string;
    private latVel: number;
    private vertVel: number;
    private zone: Zone;

    constructor(ocean: Ocean, sub: Sub, dir?: string) {
        this.ocean = ocean;
        this.sub = sub;
        this.dir = dir || null;
        this.constants = new CalcConstant() || null;
        this.oceanLatLimit = this.constants.getOceanLatLimit() ?? null;
        this.oceanVertLimit = this.constants.getOceanVertLimit() ?? null;
        this.fullLatLimit = this.constants.getFullLatLimit() ?? null;
        this.compLat =
            this.ocean.getX() - this.sub.getX() + SUB_INITIAL_LAT_POS ?? null;
        this.compVert =
            this.ocean.getY() - this.sub.getY() + INITIAL_Y_POSITION ?? null;
        this.depthObject = this.constants.getDepthObject(this.compLat) || null;
        this.varDepth = this.constants._calcDepthLimit(this.compLat) || null;
        this.OorS = this.constants.getOorS(this.compLat, this.compVert) || null;
        this.increaseVelFlag = "";
        this.latVel = LAT_VELOCITY;
        this.vertVel = VERTICAL_VELOCITY;
        this.zone = new Zone()
    }

    upDateCoordinates() {
        this.compLat =
            this.ocean.getX() - this.sub.getX() + SUB_INITIAL_LAT_POS;
        this.compVert =
            this.ocean.getY() - this.sub.getY() + INITIAL_Y_POSITION;
        this.oceanLatLimit = this.constants.getOceanLatLimit();
        this.oceanVertLimit = this.constants.getOceanVertLimit();
        this.fullLatLimit = this.constants.getFullLatLimit();
        this.depthObject = this.constants.getDepthObject(this.compLat);
        this.varDepth = this.constants._calcDepthLimit(this.compLat);
        this.OorS = this.constants.getOorS(this.compLat, this.compVert);
    }

    getMove = (dir: string) => {
        this.setDir(dir);
        this.upDateCoordinates();
        this.checkToIncreaseVel(dir);
        // if(dir === 'right' || dir === 'left') {
            if (this.compVert <= this.varDepth){
                this.configureMoveLateral(dir)
            } else {
                this.getLatMove();
            }
           
        // } else if ( dir === 'up' || dir === 'down') {
            this.getVerticalMove()
        // }    
        // this.printCoordinates('IN GET MOVE')
        this.zone.upDateZoneObject();
        // this.constants.printCalcConstant(this.compLat, this.compVert, "IN MOVE getMove")

    };

    getLatMove() {
        // console.log('xxxxxxxxxxxxxx')
        if (this.OorS[0] == "O") {
            this.sub.setX(this.sub.getInitialLatPos())
            // console.log('LATERAL 0000000 LAT');
            if (this.compLat > 0) {
                // console.log('LATERAL 1111111 LAT');
                this.moveOceanRight(this.latVel);
            } else if (this.compLat > -LAT_VELOCITY) {
                // stop one vertical vel upon rising
                if (this.dir === "right") {
                    // console.log("1010101010101");
                    this.moveOceanRight(this.latVel);
                }
            } else if (this.compLat >= this.oceanLatLimit) {
                // console.log('LATERAL 2222222 LAT');
                if (this.dir === "right") {
                    // console.log('LATERAL 3333333 LAT');
                    this.moveOceanRight(this.latVel);
                } else if (this.dir === "left") {
                    // console.log('LATERAL 44444444 LAT');
                    this.moveOceanLeft(this.latVel);
                }
            }
        } else if (this.OorS[0] == "S") {
            // console.log('yyyyyyyyyyyyy')
           if (this.compLat > this.fullLatLimit) {
            // console.log('LATERAL 5555555 LAT');
                if (this.dir === "right") {
                    // console.log('LATERAL 66666666 LAT');
                    this.moveSubRight();
                } else if (this.dir === "left") {
                    // console.log('LATERAL 777777777 LAT');
                    this.moveSubLeft();
                }
            } else if (this.compLat <= this.fullLatLimit) {
                // console.log('LATERAL 88888888 LAT');
                if (this.dir === "left") {
                    this.moveSubLeft();
                }
            }
        }
    }

    getVerticalMove() {
        if (this.OorS[1] == "O") {
            // console.log("AAAAAAAAA");
            this.sub.setY(this.sub.getInitialVertPos()); // reset sub to assure accuracy at transition S to O on way up
            if (this.compVert > 0) {
                // move down no matter what if above surface
                // console.log("BBBBBBBBB");
                this.moveOceanDown(this.vertVel);
            } else if (this.compVert > -VERTICAL_VELOCITY) {
                // stop one vertical vel upon rising
                if (this.dir === "down") {
                    // console.log("CCCCCCCCC");
                    this.moveOceanDown(this.vertVel);
                }
            } else if (this.compVert > this.varDepth) {
                // normal
                if (this.dir === "down") {
                    // console.log("DDDDDDDD");
                    this.moveOceanDown(this.vertVel);
                } else if (this.dir === "up") {
                    // console.log("EEEEEEEEE");
                    this.moveOceanUp(this.vertVel);
                }
            } else if (this.compVert <= this.varDepth + VERTICAL_VELOCITY) {
                // stop one vel unit from lower limit
                // console.log("FFFFFFFF");
                if (this.dir === "up") {
                    this.moveOceanUp(this.vertVel);
                }
            }
        } else if ((this.OorS[1] = "S")) {
            console.log("000000000");
            if (this.compVert > this.oceanVertLimit + VERTICAL_VELOCITY) {
                // console.log("1111111111");
                console.log(
                    "this.varDepth + VERTICAL_VELOCITY ",
                    this.varDepth + VERTICAL_VELOCITY
                );

                if (this.dir === "down") {
                    this.moveSubDown();
                }

                // } else if (this.compVert >= this.varDepth - 2*VERTICAL_VELOCITY && this.compVert <= this.varDepth) {
                //     if (this.dir === "down") {
                //         console.log('22222')
                //         this.moveSubDown();
                //     }
            } else if (this.compVert >= this.varDepth) {
                // normal
                if (this.dir === "down") {
                    console.log("3333333");
                    this.moveSubDown();
                } else if (this.dir === "up") {
                    //
                    console.log("44444444");
                    this.moveSubUp();
                }
            } else if (this.compVert < this.varDepth + VERTICAL_VELOCITY) {
                // stop one vel unit from lower limit
                if (this.dir === "up") {
                    console.log("5555555");
                    this.moveSubUp();
                }
            }
        }
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

    configureMoveLateral = (dir:string) => {
      console.log('In configure move lateral')
        let mvmt = this.depthObject.mvmtLat;
        if (this.OorS[1] === "O") {
            if (dir === 'right') {
                if(mvmt === 'right' || mvmt === 'both') {
                    this.moveOceanRight(this.latVel)
                }
            } else if ( dir === 'left') {
                if(mvmt === 'left' || mvmt === 'both') {
                    this.moveOceanLeft(this.latVel)
                }
            }
        } else if (this.OorS[1] === "S") {
            console.log(' IN SUB SECTION')
            if (dir === 'right') {
                console.log('    IN MOVE RIGHT')
                if(mvmt === 'right' || mvmt === 'both') {
                    this.moveSubRight()
                }
            } else if ( dir === 'left') {
                console.log('     IN MOVE LEFT')
                if(mvmt === 'left' || mvmt === 'both') {
                    this.moveSubLeft()
                }
            }
        }
    };

    printCoordinates = (where: string) => {
        console.log(`=${where}==============`);
        console.log("OorS", this.OorS)
        console.log("COMP LAT VERT", this.compLat, this.compVert);
        console.log("OCEAN VERT LIMIT", this.oceanVertLimit);
        console.log("OCEAN LAT LIMIT", this.oceanLatLimit);
        console.log("VARDEPTH", Math.floor(this.varDepth));
        console.log("OCEAN X, Y", this.ocean.getX(), this.ocean.getY());
        console.log("SUB X, Y", this.sub.getX(), this.sub.getY());
        console.log("depthObjectName", this.depthObject.name);
        console.log("========================");
        console.log("                           ");
    };

    printStandard = (where: string) => {
        console.log(`${where}`);
        console.log("COMPLAT", this.compLat);
        console.log("COMPVERT", this.compVert);
        console.log("OCEAN Y", this.ocean.getY());
        console.log("SUB Y", this.sub.getY());
        console.log("VARIABLE DEPTH", this.varDepth);
        console.log("depthObjectName", this.depthObject.name);
        console.log("==============");
    };

    moveOceanRight = (vel: number) => {
        this.ocean.setX(this.ocean.getX() - vel);
    };
    moveOceanLeft = (vel: number) => {
        this.ocean.setX(this.ocean.getX() + vel);
    };
    moveSubRight = () => {
        this.sub.setX(this.sub.getX() + LAT_VELOCITY);
    };
    moveSubLeft = () => {
        this.sub.setX(this.sub.getX() - LAT_VELOCITY);
    };
    moveOceanUp = (vel: number) => {
        this.ocean.setY(this.ocean.getY() + vel);
    };

    moveOceanDown = (vel: number) => {
        this.ocean.setY(this.ocean.getY() - vel);
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

    checkToIncreaseVel(dir: string) {
        if (this.increaseVelFlag === dir) {
            if (dir === "right" || dir === "left") {
                this.latVel = 2 * LAT_VELOCITY;
            }
            if (dir === "up" || dir === "down") {
                this.vertVel = 2 * VERTICAL_VELOCITY;
            }
        } else {
            this.latVel = LAT_VELOCITY;
            this.vertVel = VERTICAL_VELOCITY;
        }
    }
}

export default Move;
