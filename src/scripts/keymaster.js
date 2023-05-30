import { globalOcean, globalSub } from "../index";
import { getMove, omnibusMove } from "./move";
import MoveObjects from "./moveObjects";
import { getCurrentCanvas } from "./constants";
import { showCanvas1, showCanvas2, showCanvas3 } from "./util";

class Keymaster {
    constructor(options) {
        this.ctx = options.ctx;
        this.dir = options.dir;
        // this.ocean = globalOcean.ocean;
        // this.sub = globalSub.sub;
        this.modal  = document.getElementById("modal");
        this.moveObjects = options.moveObjects;
    }
    
    navigate(navigate) {
        let currentCanvas = getCurrentCanvas();
        if (navigate === "Enter") {
            switch (currentCanvas) {
                case 1:
                    showCanvas3();
                    break;
                case 2:
                    showCanvas1();
                    break;
                case 3:
                    showCanvas1();
                default:
                    return;
            }
        } else if (navigate === "Escape") {
            switch (currentCanvas) {
                case 1:
                    showCanvas2();
                    break;
                case 2:
                    showCanvas1();
                    break;
                case 3:
                    showCanvas2();
                default:
                    return;
            }
        }
    }

    newPos(dir) {
       let processedObjects =  omnibusMove(this.moveObjects);
       console.log('PROCESSED OBJETCTA', processedObjects);
       this.moveObjects.setOcean(processedObjects.ocean);
       this.moveObjects.setSub(processedObjects.sub)
    //    this.moveObjects.setSub(processedObjects.sub)

    console.log('2222222222222244444444444', this.moveObjects.ocean.sx)

        if (dir === "down") {
            console.log("DIRRRR", dir);
            this.ocean.sy += this.ocean.velDown;
            this.sub.y += this.sub.velDown;
        }
        if (dir === "up") {
            this.ocean.sy -= this.ocean.velUp;
            this.sub.y -= this.sub.velUp;
        }
        if (dir === "right") {
            this.moveObjects.ocean.sx += this.moveObjects.ocean.velRight;
            this.moveObjects.sub.x += this.moveObjects.ocean.velRight;
        }
        if (dir === "left") {
            this.moveObjects.ocean.sx -= this.moveObjects.ocean.velLeft;
            this.moveObjects.sub.x -= this.moveObjects.ocean.velLeft;
        }
        console.log('2222222222222255555555555', this.moveObjects.ocean.sx)
     
    }

}

export default Keymaster;
