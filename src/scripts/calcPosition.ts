import { eventBus } from "./eventBus";
import InitialValues from "./initialValues";

class CalcPosition {
    private initialValues: InitialValues;
    private compLat: number;
    private compVert: number;
    private oceanLat: number;
    private oceanVert: number;
    private subLat: number;
    private subVert: number;

    constructor() {
        this.initialValues = InitialValues.getInstance();
        this.compLat = 0;
        this.compVert = 0;
        this.oceanLat = 0;
        this.subLat = this.initialValues.getInitial_X();
        this.oceanVert = 0
        this.subVert = this.initialValues.getInitial_Y();


        eventBus.on("oceanXChanged", this.handleOceanXChange);
        eventBus.on("subXChanged", this.handleSubXChange);
        eventBus.on("oceanYChanged", this.handleOceanYChange);
        eventBus.on("subYChanged", this.handleSubYChange);
    }

    handleOceanXChange = (newX: number) => {
        // console.log("this is in CALC POS newX", newX);
        this.oceanLat = newX ;
        this.compLat = this.oceanLat - this.subLat + this.initialValues.getInitial_X()
        console.log('this.compLat Ocean CALCPOS', this.compLat);
    };

    handleSubXChange = (newX: number) => {
        // console.log("this is in Zone", newX);
        this.compLat += newX;
        console.log('this.compLat sub CALCPOS', this.compLat)
    };
    handleOceanYChange = (newY: number) => {
        console.log("this is in CALCPOS", newY);
        this.oceanVert = newY ;
        this.compVert = this.oceanVert - this.subVert + this.initialValues.getInitial_Y()
        console.log('this.compVert Ocean CALCPOS', this.compVert);
    };

    handleSubYChange = (newY: number) => {
        console.log("this is in CALCPOS", newY);
        this.compVert += newY;
        console.log('this.compVert sub CALCPOS', this.compVert)
    };

    getCompLat(){
        return this.compLat;
    }

    getCompVert(){
        return this.compVert;
    }
}

export default CalcPosition;
