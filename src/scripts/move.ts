import { LAT_VELOCITY, VERTICAL_VELOCITY } from "./constants";
import {
    WIDTH,
    HEIGHT,
} from "../index";
import Ocean from "./ocean";
import Sub from "./sub";
import { IMapPointObject } from "./types";
import CalcConstant from "./calcConstant";
import EdText from "./edText";
import Zone from "./zone";
import { getCurrentCanvas, setHitBottomFlag } from "./constants";
import { eventBus } from "./eventBus";
import CalcPosition from "./calcPosition";
import InitialValues from "./initialValues";

class Move {
    private ocean: Ocean;
    private sub: Sub;
    private dir: string;
    private constants: CalcConstant;
    private calcPosition: CalcPosition;
    private calcConstant: CalcConstant;
    private initialValues: InitialValues;
    private varDepth: number;
    private mapPointObject: IMapPointObject;
    private OorS: string[];
    private increaseVelFlag: string;
    private latVel: number;
    private vertVel: number;
    private edText: EdText;

    constructor(ocean: Ocean, sub: Sub, dir?: string) {
        this.ocean = ocean;
        this.sub = sub;
        this.dir = dir || null;
        this.constants = new CalcConstant() || null;
        this.calcPosition = CalcPosition.getInstance();
        this.calcConstant = new CalcConstant();
        this.initialValues = InitialValues.getInstance();
        this.mapPointObject =
            this.constants.getMapPointObject() || null;
        this.varDepth = this.constants._calcDepthLimit2() || null;
        this.OorS = this.constants.getOorS() || null;
        this.increaseVelFlag = "";
        this.latVel = LAT_VELOCITY;
        this.vertVel = VERTICAL_VELOCITY;

        this.edText = new EdText();
    }

    public getMove = (dir: string) => {
        const zone = new Zone();
        this.setDir(dir);
        this.checkToIncreaseVel(dir);
        if (this.calcPosition.getCompVert() <= this.varDepth - 1) {
            setHitBottomFlag(true);
            this.configureHitBottomMove(dir);
        } else {
            setHitBottomFlag(false);
            this.getLatMove();
        }
        this.getVerticalMove();

        let zoneObject = zone.upDateZoneObject();
        let zoneNum = zoneObject.id;
        let canvasNumber = getCurrentCanvas();
        this.edText.updateEdText(zoneNum, canvasNumber);
        // this.printCoordinates("IN GET MOVE");

    };

    private getLatMove() {
        console.log("xxxxxxxxxxxxxx");
        let oors = this.calcConstant.getOorS();
        if (oors[0] == "O") {
            this.sub.setX(this.sub.getInitialLatPos());
            // console.log('LATERAL 0000000 LAT');
            if (this.calcPosition.getCompLat() > 0) {
                // console.log('LATERAL 1111111 LAT');
                this.moveOceanRight(this.latVel);
            } else if (this.calcPosition.getCompLat() > -LAT_VELOCITY) {
                // stop one vertical vel upon rising
                if (this.dir === "right") {
                    // console.log("1010101010101");
                    this.moveOceanRight(this.latVel);
                }
            } else if (this.calcPosition.getCompLat() >= this.initialValues.getOceanLatLimit()) {
                // console.log('LATERAL 2222222 LAT');
                if (this.dir === "right") {
                    // console.log('LATERAL 3333333 LAT');
                    this.moveOceanRight(this.latVel);
                } else if (this.dir === "left") {
                    // console.log('LATERAL 44444444 LAT');
                    this.moveOceanLeft(this.latVel);
                }
            }
        } else if (oors[0] === "S") {
            console.log('yyyyyyyyyyyyy')
            if (this.calcPosition.getCompLat() > this.initialValues.getFullLatLimit()) {
                // console.log('LATERAL 5555555 LAT');
                if (this.dir === "right") {
                    // console.log('LATERAL 66666666 LAT');
                    this.moveSubRight();
                } else if (this.dir === "left") {
                    // console.log('LATERAL 777777777 LAT');
                    this.moveSubLeft();
                }
            } else if (this.calcPosition.getCompLat() <= this.initialValues.getFullLatLimit()) {
                // console.log('LATERAL 88888888 LAT');
                if (this.dir === "left") {
                    this.moveSubLeft();
                }
            }
        }
    }

    private getVerticalMove() {
        console.log('VERT', this.calcPosition.getCompVert())
        console.log('OCEAN LIMIT', this.initialValues.getOceanVertLimit())
        console.log('VARDEPTH' , this.calcConstant._calcDepthLimit2())
        console.log("AAAAAAAAA");
        console.log('AAAAAAAAA', this.calcConstant.getOorS())
      
        let oorS = this.calcConstant.getOorS();
        if (oorS[1] == "O") {
            
            this.sub.setY(this.sub.getInitialVertPos()); // reset sub to assure accuracy at transition S to O on way up
            if (this.calcPosition.getCompVert() > 0) {
                // move down no matter what if above surface
                console.log("BBBBBBBBB");
                this.moveOceanDown(this.vertVel);
            } else if (this.calcPosition.getCompVert() > -VERTICAL_VELOCITY) {
                // stop one vertical vel upon rising
                if (this.dir === "down") {
                    console.log("CCCCCCCCC");
                    this.moveOceanDown(this.vertVel);
                }
            } else if (this.calcPosition.getCompVert() > this.varDepth) {
                // normal
                if (this.dir === "down") {
                    console.log("DDDDDDDD");
                    this.moveOceanDown(this.vertVel);
                } else if (this.dir === "up") {
                    // console.log("EEEEEEEEE");
                    this.moveOceanUp(this.vertVel);
                }
            } else if (this.calcPosition.getCompVert() <= this.varDepth + VERTICAL_VELOCITY) {
                // stop one vel unit from lower limit
                // console.log("FFFFFFFF");
                if (this.dir === "up") {
                    this.moveOceanUp(this.vertVel);
                }
            }
        } else if ((oorS[1] = "S")) {
            console.log("000000000");
            if (this.calcPosition.getCompVert() > this.initialValues.getOceanVertLimit() + VERTICAL_VELOCITY) {
                // console.log("1111111111");
        

                if (this.dir === "down") {
                    this.moveSubDown();
                }

                // } else if (this.compVert >= this.varDepth - 2*VERTICAL_VELOCITY && this.compVert <= this.varDepth) {
                //     if (this.dir === "down") {
                //         console.log('22222')
                //         this.moveSubDown();
                //     }
            } else if (this.calcPosition.getCompVert() >= this.varDepth) {
                // normal
                if (this.dir === "down") {
                    console.log("3333333");
                    this.moveSubDown();
                } else if (this.dir === "up") {
                    //
                    console.log("44444444");
                    this.moveSubUp();
                }
            } else if (this.calcPosition.getCompVert() < this.varDepth + VERTICAL_VELOCITY) {
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

    private configureHitBottomMove = (dir: string) => {
        let mvmt = this.mapPointObject.mvmtLat;
        if (this.OorS[1] === "O") {
            if (dir === "right") {
                if (mvmt === "right" || mvmt === "both") {
                    this.moveOceanRight(this.latVel);
                }
            } else if (dir === "left") {
                if (mvmt === "left" || mvmt === "both") {
                    this.moveOceanLeft(this.latVel);
                }
            }
        } else if (this.OorS[1] === "S") {
        
            if (dir === "right") {
                console.log("    IN MOVE RIGHT");
                if (mvmt === "right" || mvmt === "both") {
                    this.moveSubRight();
                }
            } else if (dir === "left") {
                console.log("     IN MOVE LEFT");
                if (mvmt === "left" || mvmt === "both") {
                    this.moveSubLeft();
                }
            }
        }
    };

    printCoordinates = (where: string) => {
        console.log(`=${where}==============`);
        console.log("WIDTH", WIDTH);
        console.log("HEiGHT", HEIGHT);
        console.log("viewport.width", visualViewport.width);
        console.log("OorS", this.OorS);
        console.log("COMP LAT VERT", this.calcPosition.getCompLat(), this.calcPosition.getCompVert());
        console.log("OCEAN VERT LIMIT", this.initialValues.getOceanVertLimit());
        console.log("OCEAN LAT LIMIT", this.initialValues.getOceanLatLimit());
        console.log("VARDEPTH", Math.floor(this.varDepth));
        console.log("OCEAN X, Y", this.ocean.getX(), this.ocean.getY());
        console.log("SUB X, Y", this.sub.getX(), this.sub.getY());
        console.log("mapPointObjectName", this.mapPointObject.name);
        console.log("========================");
        console.log("                           ");
    };

    printStandard = (where: string) => {
        console.log(`${where}`);
        console.log("COMPLAT", this.calcPosition.getCompLat());
        console.log("COMPVERT", this.calcPosition.getCompVert());
        console.log("OCEAN Y", this.ocean.getY());
        console.log("SUB Y", this.sub.getY());
        console.log("VARIABLE DEPTH", this.varDepth);
        console.log("mapPointObjectName", this.mapPointObject.name);
        console.log("==============");
    };

    printLateral = (where: string) => {
        console.log(`${where}`);
        console.log("COMPLAT", this.calcPosition.getCompLat());
        console.log("WIDTH", WIDTH);
        console.log("mapPointObjectName", this.mapPointObject.name);
        console.log("==============");
    };

    moveOceanRight = (vel: number) => {
        this.ocean.setX(this.ocean.getX() - vel);
        eventBus.emit("oceanXChanged", this.ocean.getX());
    };
    moveOceanLeft = (vel: number) => {
        this.ocean.setX(this.ocean.getX() + vel);
        eventBus.emit("oceanXChanged", this.ocean.getX());
    };
    moveSubRight = () => {
        this.sub.setX(this.sub.getX() + LAT_VELOCITY);
        eventBus.emit("subXChanged", this.sub.getX());
    };
    moveSubLeft = () => {
        this.sub.setX(this.sub.getX() - LAT_VELOCITY);
        eventBus.emit("subXChanged", this.sub.getX());
    };
    moveOceanUp = (vel: number) => {
        this.ocean.setY(this.ocean.getY() + vel);
        eventBus.emit("oceanYChanged", this.ocean.getY());
    };

    moveOceanDown = (vel: number) => {
        this.ocean.setY(this.ocean.getY() - vel);
        eventBus.emit("oceanYChanged", this.ocean.getY());
    };

    moveSubUp = () => {
        this.sub.setY(this.sub.getY() - VERTICAL_VELOCITY);
        eventBus.emit("subYChanged", this.sub.getY());
    };

    moveSubDown = () => {
        this.sub.setY(this.sub.getY() + VERTICAL_VELOCITY);
        eventBus.emit("subYChanged", this.sub.getY());
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
