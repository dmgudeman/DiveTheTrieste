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
    private OorS: string[];

    private depthObject: DepthObject;

    constructor(
        ocean: Ocean,
        sub: Sub,
        lat: number,
        vert: number
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

    configureHitBottom = ( dir:string) => {
        let hitBottom = document.getElementById("hitBottomContainer");
        hitBottom.classList.remove("hide");
        this.hitBottomMoveVertical(dir);
    };

    private showHitBottom = () => {
        let hitBottom = document.getElementById("hitBottomContainer");
        hitBottom.classList.remove("hide");
      
    };
    hitBottomMoveVertical = (dir:string) => {
        this.showHitBottom();
        this.ocean.zeroVelUp();
        this.ocean.zeroVelDown();
        this.sub.zeroVelUp();
        this.sub.zeroVelDown();
        let allowedVert = this.depthObject.mvmtVert;
        
        if (this.OorS[1] === "O") {
            this.sub.setY(INITIAL_Y_POSITION);
            if (allowedVert === dir && dir === 'up') {
                this.moveOceanUp()
            } else if (allowedVert === dir && dir === 'down') {
                this.moveOceanDown()
            } 
        } else if (this.OorS[1] === "S") {
            if (allowedVert === dir && dir === 'up') {
                this.moveSubUp()
            } else if (allowedVert === dir && dir === 'down') {
                this.moveSubDown()
            } 
        }
        this.printMessage(68, dir, this.depthObject)
    };

    hitBottomMoveLateral = () => {
        console.log("33 OCEAN VelRight", this.ocean.getVelRight());
        console.log("33 OCEAN X", this.ocean.getY());
        this.ocean.zeroVelUp();
        this.ocean.zeroVelDown();
        this.sub.zeroVelUp();
        this.sub.zeroVelDown();
        let dir = this.depthObject.mvmtLat;
        // if (this.OorS[0] === "O") {
        //     if (dir === "R") {
        //         this.ocean.setVelRight();
        //     } else if (dir === "L") {
        //         this.ocean.setVelLeft();
        //     } else {
        //         this.ocean.setVelRight();
        //         this.ocean.setVelLeft();
        //     }
        // } else if (this.OorS[0] === "S") {
        //     if (dir === "R") {
        //         this.sub.setVelRight();
        //     } else if (dir === "L") {
        //         this.sub.setVelLeft();
        //     } else {
        //         this.sub.setVelRight();
        //         this.sub.setVelLeft();
        //     }
        // }

        console.log("NEED TO REFACTOR HITBOTTOM LATERAL")
       
    };

    moveOceanUp = () => {
        this.ocean.setY(this.ocean.getY() + VERTICAL_VELOCITY);
    };

   moveOceanDown = () => {
        this.ocean.setY(this.ocean.getY() - VERTICAL_VELOCITY);
    };
    moveSubUp = () => {
        this.sub.setY(this.sub.getY() + VERTICAL_VELOCITY);
    };

   moveSubDown = () => {
        this.sub.setY(this.sub.getY() - VERTICAL_VELOCITY);
    };




    printMessage = (line:number, dir:string, depthObject: DepthObject) => {
        console.log('++++++++++++++++++++')
        console.log(`MOVEUTILS LINE ${line.toString()}`)
        console.log('this.OorS', this.OorS);
        console.log('dir', dir),
        console.log("depthObject.name", depthObject.name);
        console.log("depthObject.mvmtVert", depthObject.mvmtVert);
        console.log("depthObject.mvmtLat", depthObject.mvmtLat);
        console.log("OCEAN VEL_U, VEL_D", this.ocean.getVelUp(), this.ocean.getVelDown())
        console.log("OCEAN VEL_R, VEL_L", this.ocean.getVelRight(), this.ocean.getVelLeft())
        console.log("OCEAN X __ Y", this.ocean.getX(), this.ocean.getY());
        console.log('++++++++++++++++++++')
    }
}

export default MoveUtils;




