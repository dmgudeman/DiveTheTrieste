import { eventBus } from "./eventBus";
import InitialValues from "./initialValues";

class CalcPosition {
    private static instance: CalcPosition;
    private initialValues: InitialValues;
    private compLat: number;
    private compVert: number;
    private oceanLat: number;
    private oceanVert: number;
    private oceanLatLimit: number;
    private oceanVertLimit: number;
    private subLat: number;
    private subVert: number;

    private constructor(oceanLat?:number, oceanVert?:number, subLat?:number, subVert?:number) {
        this.initialValues = InitialValues.getInstance();
        this.compLat =  0;
        this.compVert = 0;
        this.oceanLat = oceanLat || 0;
        this.oceanVert = oceanVert || 0;
        this.oceanLatLimit = this.initialValues.getOceanLatLimit();
        this.oceanVertLimit = this.initialValues.getOceanVertLimit();
        this.subLat = subLat || this.initialValues.getInitial_X();
        this.subVert = subVert || this.initialValues.getInitial_Y();


        eventBus.on("oceanXChanged", this.handleOceanXChange);
        eventBus.on("subXChanged", this.handleSubXChange);
        eventBus.on("oceanYChanged", this.handleOceanYChange);
        eventBus.on("subYChanged", this.handleSubYChange);
    }

    public static getInstance(oceanLat?:number, oceanVert?:number, subLat?:number, subVert?:number): CalcPosition {
        if (!CalcPosition.instance) {
            CalcPosition.instance = new CalcPosition(oceanLat, oceanVert, subLat, subVert);
        }
        return CalcPosition.instance;
    }

    handleOceanXChange = (newX: number) => {
      
        this.oceanLat = newX ;
        this.compLat = this.oceanLat - this.subLat + this.initialValues.getInitial_X();
        console.log('=======CALC POSITION===============')
        console.log("ZZ newX", newX);
        console.log("ZZ this.coeanLat", this.oceanLat)
        // console.log('ZZ OCEAN_LAT_LIMIT', this.initialValues.getOceanLatLimit())
        // console.log('ZZ this.subLat', this.subLat)
        // console.log('ZZ Initial_X()', this.initialValues.getInitial_X())
        // console.log('ZZ .getWidth', this.initialValues.getWidth())
        console.log('ZZ this.compLat', this.compLat)
        // console.log('ZZ FullLatLimit', this.initialValues.getFullLatLimit())
        console.log('======================')
    };

    handleSubXChange = (newX: number) => {
        console.log('+++++++++++++++++++++++++')
        console.log("WWWWWWWWW newX", newX);
        this.subLat = newX;
        this.compLat = this.oceanLatLimit - this.subLat + this.initialValues.getInitial_X();
        console.log('WWWWWWWWW this.oceanLat', this.oceanLat)
        console.log('WWWWWWWWW this.subLat', this.subLat)
        console.log('WWWWWWWWW this.initialValues.getInitial_X()', this.initialValues.getInitial_X())
        console.log('WWWWWWWWW this.initialValues.getWidth', this.initialValues.getWidth())
        console.log('WWWWWWWWW this.compLat', this.compLat)
        console.log('WWWWWWWWW this.intialValues.getFullLatLimit', this.initialValues.getFullLatLimit())

        console.log('+++++++++++++++++++++++++')
    };
    handleOceanYChange = (newY: number) => {
        
        this.oceanVert = newY ;
        this.compVert = this.oceanVert - this.subVert + this.initialValues.getInitial_Y()
        // console.log('ZZZZZZZZZ Ocean CALCPOS COMPVERT', this.compVert);
        
    };

    handleSubYChange = (newY: number) => {
        console.log("this is in CALCPOS", newY);
        this.subVert = newY;
        this.compVert = this.oceanVert - this.subVert + this.initialValues.getInitial_Y()
        // console.log('ZZZZZZZZZ sub CALCPOS COMPVERT', this.compVert)
    };

    getCompLat(){
        return this.compLat;
    }

    getCompVert(){
        return this.compVert;
    }
}

export default CalcPosition;
