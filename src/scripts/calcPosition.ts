import { eventBus } from "./eventBus";
import InitialValues from "./initialValues";

class CalcPosition {
    private initialValues: InitialValues;
    private compLat: number;
    private compVert: number;
    private oceanLat: number;
    private oceanVert: number;
    private oceanLatLimit: number;
    private oceanVertLimit: number;
    private subLat: number;
    private subVert: number;

    constructor() {
        this.initialValues = InitialValues.getInstance();
        this.compLat = 0;
        this.compVert = 0;
        this.oceanLat = 0;
        this.oceanLatLimit = this.initialValues.getOceanLatLimit();
        this.oceanVertLimit = this.initialValues.getOceanVertLimit();
        this.subLat = this.initialValues.getInitial_X();
        this.oceanVert = 0
        this.subVert = this.initialValues.getInitial_Y();


        eventBus.on("oceanXChanged", this.handleOceanXChange);
        eventBus.on("subXChanged", this.handleSubXChange);
        eventBus.on("oceanYChanged", this.handleOceanYChange);
        eventBus.on("subYChanged", this.handleSubYChange);
    }

    handleOceanXChange = (newX: number) => {
      
        this.oceanLat = newX ;
        this.compLat = this.oceanLat - this.subLat + this.initialValues.getInitial_X();
        // console.log('======================')
        // console.log("ZZZZZZZZZ CALC POS newX", newX);
        // console.log('ZZZZZZZZZ this.iv.getOCEAN_LAT_LIMIT', this.initialValues.getOceanLatLimit())
        // console.log('ZZZZZZZZZ this.subLat', this.subLat)
        // console.log('ZZZZZZZZZ this.initialValues.getInitial_X()', this.initialValues.getInitial_X())
        // console.log('ZZZZZZZZZ this.initialValues.getWidth', this.initialValues.getWidth())
        // console.log('ZZZZZZZZZ this.compLat', this.compLat)
        // console.log('ZZZZZZZZZ this.intialValues.getFullLatLimit', this.initialValues.getFullLatLimit())
        // console.log('======================')
    };

    handleSubXChange = (newX: number) => {
        console.log('+++++++++++++++++++++++++')
        console.log("WWWWWWWWW newX", newX);
        this.subLat = newX;
        this.compLat = this.oceanLat - this.subLat + this.initialValues.getInitial_X();
        // console.log('WWWWWWWWW this.iv.getOCEAN_LAT_LIMIT', this.initialValues.getOceanLatLimit())
        // console.log('WWWWWWWWW this.subLat', this.subLat)
        // console.log('WWWWWWWWW this.initialValues.getInitial_X()', this.initialValues.getInitial_X())
        // console.log('WWWWWWWWW this.initialValues.getWidth', this.initialValues.getWidth())
        // console.log('WWWWWWWWW this.compLat', this.compLat)
        // console.log('WWWWWWWWW this.intialValues.getFullLatLimit', this.initialValues.getFullLatLimit())

        console.log('+++++++++++++++++++++++++')
    };
    handleOceanYChange = (newY: number) => {
        
        this.oceanVert = newY ;
        this.compVert = this.oceanVert - this.subVert + this.initialValues.getInitial_Y()
        console.log('ZZZZZZZZZ Ocean CALCPOS COMPVERT', this.compVert);
    };

    handleSubYChange = (newY: number) => {
        console.log("this is in CALCPOS", newY);
        this.subVert = newY;
        this.compVert = this.oceanVertLimit - this.subVert + this.initialValues.getInitial_Y()
        console.log('ZZZZZZZZZ sub CALCPOS COMPVERT', this.compVert)
    };

    getCompLat(){
        return this.compLat;
    }

    getCompVert(){
        return this.compVert;
    }
}

export default CalcPosition;
