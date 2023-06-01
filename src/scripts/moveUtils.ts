import Ocean from "./ocean";
import Sub from "./sub";
import { INITIAL_Y_POSITION, VERTICAL_VELOCITY } from "./constants";
import CalcConstant from "./calcConstant";
import { DepthObject } from "./types";

class MoveUtils {
    private ocean: Ocean;
    private sub: Sub;
    private constants: CalcConstant;
    private lat: number;
    private vert: number;
    private OorS: string;

    private depthObject: DepthObject;

    constructor(
        ocean: Ocean,
        sub: Sub,
        lat: number,
        vert: number,
        // vert: number,
        // SorO: string,
        // mvmtLat: string,
        // mvmtVert: string
    ) {
        this.ocean = ocean;
        this.sub = sub;
        this.lat = lat;
        this.vert = vert;
        this.constants = new CalcConstant();
        this.OorS = this.constants.getOorS(this.lat, this.vert);
        this.depthObject = this.constants.getDepthObject(this.lat);
    }

    configureHitBottom = (lat: number) => {
        let hitBottom = document.getElementById("hitBottomContainer");
        hitBottom.classList.remove("hide");
        this.configureMoveVertical();
    };
    configureMoveVertical = () => {
        this.ocean.zeroVelUp();
        this.ocean.zeroVelDown();
        this.sub.zeroVelUp();
        this.sub.zeroVelDown();
        console.log('DEPTH_OBJECT_CONFIG_VERT', this.depthObject)
        let dir = this.depthObject.mvmtVert;

        if (this.OorS === "OO") {
            this.sub.setY(INITIAL_Y_POSITION);
            if (dir === "U") {
                this.ocean.setVelUp();
            } else if (dir === "D") {
                this.ocean.setVelDown();
            } else {
                this.ocean.setVelUp();
                this.ocean.setVelDown();
            }
        } else if (this.OorS === "S") {
            if (dir === "U") {
                this.sub.setVelUp();
            } else if (dir === "D") {
                this.sub.setVelDown();
            } else {
                this.sub.setVelUp();
                this.sub.setVelDown();
            }
        }
    };
}

export default MoveUtils;
