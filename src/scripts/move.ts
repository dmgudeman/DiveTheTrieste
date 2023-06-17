import {
    LAT_VELOCITY,
    VERTICAL_VELOCITY,
    setHitBottomFlag,
    getCurrentCanvas,
    getHitBottomFlag,
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
    private oldVert:number;
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
    private surfaceModal: Modal;

    constructor( dir?: string) {
        // this.ocean = ocean;
        // this.sub = sub;
        // this.constants = new CalcConstant() || null;
        this.calcPosition = CalcPosition.getInstance();
        this.initialValues = InitialValues.getInstance();
        this.mapPointObject = this.calcPosition.getMapPointObject() || null;
        this.OorS = this.calcPosition.getOorS("right") || null;
        this.lat = this.calcPosition.getCompLat();
        this.vert = this.calcPosition.getCompVert();
        this.oldVert = this.vert;
        this.lOceanLim = this.initialValues.getOceanLatLimit();
        this.vOceanLim = this.initialValues.getOceanVertLimit();
        this.lFullLim = this.initialValues.getFullLatLimit();
        this.vFullLim = this.initialValues.getFullVertLimit();
        this.depthLim = this.calcPosition.calcDepthLimit() || null;
        this.increaseVelFlag = "";
        this.latVel = LAT_VELOCITY;
        this.vertVel = VERTICAL_VELOCITY;
        this.edText = new EdText();
        this.modal = new Modal("cockpitModal", "closeCockpitModal");
        this.surfaceModal = new Modal('surfaceModal', 'closeSurfaceModal');
    }

    public getMove = (dir: string) => {
        // get fresh data
        this.depthLim = this.calcPosition.calcDepthLimit();
        this.lat = this.calcPosition.getCompLat();
        this.vert = this.calcPosition.getCompVert();
        if (this.vert === 0 && this.oldVert < 0 ) {
            this.showSurfaceModal();
        }
        this.oldVert = this.vert;
        this.lOceanLim = this.initialValues.getOceanLatLimit();
        this.vOceanLim = this.initialValues.getOceanVertLimit();
        this.lFullLim = this.initialValues.getFullLatLimit();
        this.vFullLim = this.initialValues.getFullVertLimit();
        this.OorS = this.calcPosition.getOorS(dir);
        this.checkToIncreaseVel(dir);
        this.reInitiateCoordinates();

        if (dir === "left" || dir === "right") {
            if (this.vert <= this.depthLim) {
                setHitBottomFlag(true);
                this.configureHitBottomMove(dir);
            } else {
                setHitBottomFlag(false);
                this.getLatMove(dir);
            }
        }

        if (dir === "up" || dir === "down") {
            if (this.vert <= this.depthLim) {
                // if (this.lat <= -40) setHitBottomFlag(true);
             setHitBottomFlag(true);
                this.configureHitBottomMove(dir);
            } else {
                setHitBottomFlag(false);
                this.getVerticalMove(dir);
            }
        }
        let canvasNumber = getCurrentCanvas();
        this.edText.updateEdText(canvasNumber);
    };

    private getLatMove(dir: string) {
        this.reInitiateCoordinates();

        if (this.OorS[0] == "O") {
            if (this.lat === 0) {
                if (dir === "right") {
                    this.moveOceanRight();
                }
            } else if (this.lat >= this.lOceanLim) {
                if (dir === "right") {
                    this.moveOceanRight();
                } else if (dir === "left") {
                    this.moveOceanLeft();
                }
            }
        } else if (this.OorS[0] === "S") {
            if (this.lat > this.lFullLim) {
                if (dir === "right") {
                    this.moveSubRight();
                } else if (dir === "left") {
                    this.moveSubLeft();
                }
            } else if (this.lat <= this.lFullLim) {
                if (dir === "left") {
                    this.moveSubLeft();
                }
            }
        }
    }

    private getVerticalMove(dir: string) {
        this.reInitiateCoordinates();
        let vertLim: number;

        if (this.OorS[1] === "O") {
            if (this.depthLim > this.vOceanLim) {
                vertLim = this.depthLim;
            } else {
                vertLim = this.vOceanLim;
            }
            if (this.vert >= 0) {
                if (dir === "down") {
                    this.moveOceanDown();
                }
                return;
            } else if (this.vert >= vertLim) {
                if (dir === "down") {
                    this.moveOceanDown();
                } else if (dir === "up") {
                    this.moveOceanUp();
                }
            } else if (this.vert < vertLim) {
                if (dir === "up") {
                    this.moveOceanUp();
                }
            }
        } else if ((this.OorS[1] = "S")) {
            if (this.vert > this.depthLim) {
                if (dir === "down") {
                    this.moveSubDown();
                } else if (dir === "up") {
                    this.moveSubUp();
                }
            } else if (this.vert <= this.depthLim) {
                if (dir === "up") {
                    this.moveSubUp();
                }
            }
        }
    }

    private configureHitBottomMove = (dir: string) => {
        this.reInitiateCoordinates();
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
            } else if (dir == "up" && this.vert <0) {
                this.moveOceanUp();
            }
        } else if (this.OorS[1] === "S") {
            if (dir === "right") {
                if (mvmt === "right" || mvmt === "both") {
                    this.moveSubRight();
                }
            } else if (dir === "left") {
                if (mvmt === "left" || mvmt === "both") {
                    this.moveSubLeft();
                }
            } else if (dir =="up" && this.vert <=0) {
                this.moveSubUp();
            }
        }

        if (getCurrentCanvas() === 3 && getHitBottomFlag() ) {
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
        eventBus.emit("subYChanged", this.sub.getY());
    };

    reInitiateCoordinates() {
        if (
            (this.vert === 0 &&
                this.sub.getY() !== this.initialValues.getInitial_Y()) ||
            (this.vert === 0 && this.ocean.getY() !== 0)
        ) {
            this.ocean.setY(0);
            this.sub.setY(this.initialValues.getInitial_Y());
        }

        if ( this.vert >= 0) {
            this.ocean.setY(0);
            this.sub.setY(this.initialValues.getInitial_Y());

        }
    }

    showSurfaceModal() {
        if (getCurrentCanvas() === 3 && this.vert === 0 ) {
            this.surfaceModal.showModal();
            // Hide the cockpit modal after 1 second (1000 ms)
            setTimeout(() => {
                this.surfaceModal.hideModal();
            }, 1000);
        }

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
