import {
    LAT_VELOCITY,
    VERTICAL_VELOCITY,
    setHitBottomFlag,
    getCurrentCanvas,
} from "./constants";
import Ocean from "./ocean";
import Sub from "./sub";
import { IMapPointObject } from "./types";
import CalcConstant from "./calcConstant";
import EdText from "./edText";
import { eventBus } from "./eventBus";
import CalcPosition from "./calcPosition";
import InitialValues from "./initialValues";
import Modal from "./modal";

class Move {
    private ocean: Ocean;
    private sub: Sub;
    private calcPosition: CalcPosition;
    private initialValues: InitialValues;
    private mapPointObject: IMapPointObject;
    private OorS: string[];
    private lat: number;
    private vert: number;
    private lOceanLim: number;
    private vOceanLim: number;
    private lFullLim: number;
    private vFullLim: number;
    private depthLim: number;
    private increaseVelFlag: string;
    private latVel: number;
    private vertVel: number;
    private edText: EdText;
    private modal: Modal;

    constructor(ocean: Ocean, sub: Sub, dir?: string) {
        this.ocean = ocean;
        this.sub = sub;
        // this.constants = new CalcConstant() || null;
        this.calcPosition = CalcPosition.getInstance();
        this.initialValues = InitialValues.getInstance();
        this.mapPointObject = this.calcPosition.getMapPointObject() || null;
        this.OorS = this.calcPosition.getOorS("right") || null;
        this.lat = this.calcPosition.getCompLat();
        this.vert = this.calcPosition.getCompVert();
        this.lOceanLim = this.initialValues.getOceanLatLimit();
        this.vOceanLim = this.initialValues.getOceanVertLimit();
        this.lFullLim = this.initialValues.getFullLatLimit();
        this.vFullLim = this.initialValues.getFullVertLimit();
        this.depthLim = this.calcPosition._calcDepthLimit2() || null;
        this.increaseVelFlag = "";
        this.latVel = LAT_VELOCITY;
        this.vertVel = VERTICAL_VELOCITY;
        this.edText = new EdText();
        this.modal = new Modal("cockpitModal", "closeCockpitModal");
    }

    public getMove = (dir: string) => {
        this.depthLim = this.calcPosition._calcDepthLimit2();
        this.lat = this.calcPosition.getCompLat();
        this.vert = this.calcPosition.getCompVert();
        this.lOceanLim = this.initialValues.getOceanLatLimit();
        this.vOceanLim = this.initialValues.getOceanVertLimit();
        this.lFullLim = this.initialValues.getFullLatLimit();
        this.vFullLim = this.initialValues.getFullVertLimit();
        this.OorS = this.calcPosition.getOorS(dir);
        this.checkToIncreaseVel(dir);

        if (dir === "left" || dir === "right") {
            if (this.calcPosition.getCompVert() <= this.depthLim) {
                setHitBottomFlag(true);
                this.configureHitBottomMove(dir);
            } else {
                setHitBottomFlag(false);
                this.getLatMove(dir);
            }
        }

        if (dir === "up" || dir === "down") {
            if (this.calcPosition.getCompVert() <= this.depthLim) {
                setHitBottomFlag(true);
                this.configureHitBottomMove(dir);
            } else {
                setHitBottomFlag(false);
                this.getVerticalMove(dir);
            }
        }

        // let zoneObject = zone.upDateZoneObject();
        // let zoneNum = zoneObject.id;
        let canvasNumber = getCurrentCanvas();
        this.edText.updateEdText(canvasNumber);
    };

    private getLatMove(dir: string) {
        if (this.vert === 0 && this.sub.getY() !== this.initialValues.getInitial_Y()) {
            this.ocean.setY (0);
            this.sub.setY(this.initialValues.getInitial_Y())
        }
      
        if (this.OorS[0] == "O") {
            if (this.lat > 0) {
                // console.log('LATERAL 1111111 LAT');
                this.moveOceanRight();
            } else if (this.lat > -LAT_VELOCITY) {
                // stop one vertical vel upon rising
                if (dir === "right") {
                    // console.log("1010101010101");
                    this.moveOceanRight();
                }
            } else if (this.lat >= this.lOceanLim) {
                // console.log('LATERAL 2222222 LAT');
                if (dir === "right") {
                    // console.log('LATERAL 3333333 LAT');
                    this.moveOceanRight();
                } else if (dir === "left") {
                    // console.log('LATERAL 44444444 LAT');
                    this.moveOceanLeft();
                }
            }
        } else if (this.OorS[0] === "S") {
            console.log("$ S MOVE LAT $$$$");
            console.log("Vx ", this.lat);
            console.log("0x ", this.calcPosition.getOceanLat());
            console.log("Sx ", this.calcPosition.getSubLat());
            console.log("LOLimit", this.initialValues.getOceanLatLimit());
            console.log("$$$$$$$$$$$$$$$$");
            if (this.lat > this.lFullLim) {
                // console.log('LATERAL 5555555 LAT');
                if (dir === "right") {
                    console.log("Ox BEFORE", this.calcPosition.getOceanLat());
                    console.log("Sx BEFORE ", this.calcPosition.getSubLat());
                    this.moveSubRight();
                    console.log("Ox AFTER", this.calcPosition.getOceanLat());
                    console.log("Sx AFTER ", this.calcPosition.getSubLat());
                } else if (dir === "left") {
                    console.log("LATERAL 777777777 LAT");
                    this.moveSubLeft();
                }
            } else if (this.lat <= this.lFullLim) {
                console.log("LATERAL 88888888 LAT");
                if (dir === "left") {
                    this.moveSubLeft();
                }
            }
            console.log("LATERAL 9999999 LAT");
        }
    }

    private getVerticalMove(dir: string) {
        if (this.vert === 0 && this.sub.getY() !== this.initialValues.getInitial_Y()) {
            this.ocean.setY (0);
            this.sub.setY(this.initialValues.getInitial_Y())
        }
        let vertLim: number;
        console.log("this.depthLim", this.depthLim);
        console.log("vOceanLim", this.vOceanLim);

        
        // console.log('==VERT MOVE===')
        // console.log('OOORS', this.calcPosition.getOorS());
        // console.log('VERT', this.calcPosition.getCompVert())
        // console.log('VARDEPTH', this.varDepth);
        // console.log('Vert Limit', this.initialValues.getOceanVertLimit())
        // console.log('Lat Limit', this.initialValues.getOceanLatLimit())
        // console.log('==============')

        if (this.OorS[1] == "O") {
            if (this.depthLim > this.vOceanLim) {
                vertLim = this.depthLim;
            } else {
                vertLim = this.vOceanLim;
            }
            if (this.vert > -VERTICAL_VELOCITY) {
                if (dir === "down") {
                    this.moveOceanDown();
                }
            } else if (this.vert >= vertLim) {
                // normal
                if (dir === "down") {
                    console.log("OCEAN NORMAL D");
                    this.moveOceanDown();
                } else if (dir === "up") {
                    console.log("OCEAN NORMAL U");
                    this.moveOceanUp();
                }
            } else if (this.vert < vertLim) {
                if (dir === "up") {
                    this.moveOceanUp();
                }
            }
        } else if ((this.OorS[1] = "S")) {
            console.log("$$$S MOVE VERT $$$$");
            console.log("Vy ", this.vert);
            console.log("0y ", this.calcPosition.getOceanVert());
            console.log("Sy ", this.calcPosition.getSubVert());
            console.log("VOLimit", this.initialValues.getOceanVertLimit());
            console.log("$$$$$$$$$$$$$$$$$");
            console.log('AAAAAAAAA')
          if (this.vert > this.depthLim) {

                console.log('this.vert', this.vert);
                console.log('vertLim', vertLim);
                console.log('vFullLim', this.vFullLim)
                console.log('BBBBBBBBB')
                // normal
                if (dir === "down") {
                    console.log("SUB NORMAL D");
                    this.moveSubDown();
                    console.log("Oy AFTER", this.calcPosition.getOceanVert());
                    console.log("Sy AFTER ", this.calcPosition.getSubVert());
                } else if (dir === "up") {
                    //
                    console.log("SUB NORMAL U");
                    this.moveSubUp();
                    console.log("Sy AFTER", this.calcPosition.getSubVert());
                }
            } else if (this.vert <= this.depthLim) {
                console.log('CCCCCCCCCCC')
                if (dir === "up") {
                  
                    this.moveSubUp();
                }
            }
            console.log('DDDDDDDDDDDD')
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

    private configureHitBottomMove = (dir: string) => {
        let mvmt = this.calcPosition.getMapPointObject().mvmtLat;
        if (this.OorS[1] === "O") {
            if (dir === "right") {
                if (mvmt === "right" || mvmt === "both") {
                    this.moveOceanRight();
                }
            } else if (dir === "left") {
                if (mvmt === "left" || mvmt === "both") {
                    this.moveOceanLeft();
                }
            } else if ( dir == 'up') {
                this.moveOceanUp();
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
            } else if ( dir == 'up') {
                this.moveSubUp();
            }
        }

        if (getCurrentCanvas() === 3) {
            this.modal.showModal();

            // Hide the cockpit modal after 1 second (1000 ms)
            setTimeout(() => {
                this.modal.hideModal();
            }, 1000);
        }
    };

    moveOceanRight = () => {
        this.ocean.setX(this.ocean.getX() - LAT_VELOCITY);
        eventBus.emit("oceanXChanged", this.ocean.getX());
    };
    moveOceanLeft = () => {
        this.ocean.setX(this.ocean.getX() + LAT_VELOCITY);
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
    moveOceanUp = () => {
        this.ocean.setY(this.ocean.getY() + VERTICAL_VELOCITY);
        eventBus.emit("oceanYChanged", this.ocean.getY());
    };

    moveOceanDown = () => {
        this.ocean.setY(this.ocean.getY() - VERTICAL_VELOCITY);
        eventBus.emit("oceanYChanged", this.ocean.getY());
    };

    moveSubUp = () => {
        this.sub.setY(this.sub.getY() - VERTICAL_VELOCITY);
        eventBus.emit("subYChanged", this.sub.getY());
    };

    moveSubDown = () => {
        
        this.sub.setY(this.sub.getY() + VERTICAL_VELOCITY);
        console.log('SUB DOWN AFTER SubY', this.sub.getY())
        eventBus.emit("subYChanged", this.sub.getY());
    };

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
