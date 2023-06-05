import { eventBus } from "./eventBus";

class CalcPosition {
    private compLat: number;
    private compVert;
    number;

    constructor() {
        this.compLat = 0;
        this.compVert = 0;

        eventBus.on("oceanXChanged", this.handleOceanXChange);
        eventBus.on("subXChanged", this.handleSubXChange);
    }

    handleOceanXChange = (newX: number) => {
        console.log("this is in Zone", newX);
        this.compLat = newX ;
        console.log('this.compLat Ocean', this.compLat)
    };

    handleSubXChange = (newX: number) => {
        console.log("this is in Zone", newX);
        this.compLat += newX;
        console.log('this.compLat sub', this.compLat)
    };
}

export default CalcPosition;
