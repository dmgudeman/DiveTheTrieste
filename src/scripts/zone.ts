import {
    EUPHOTIC_BENTHIC,
    EUPHOTIC_PELAGIC,
    DYSPHOTIC_BENTHIC,
    DYSPHOTIC_PELAGIC,
    APHOTIC_BENTHIC,
    APHOTIC_PELAGIC,
    textObjects,
} from "./constants";
import CalcConstant from "./calcConstant";
import Ocean from "./ocean";
import Sub from "./sub";
import {ITextObject} from './types';
import {eventBus} from './eventBus';

class Zone {
    private ocean: Ocean;
    private sub: Sub;
    private lat: number;
    private vert: number;
    private varDepth: number;
    private calcConstants: CalcConstant;
    private flag: number;
    private oldFlag: number;


    constructor() {
        this.ocean = Ocean.getInstance();
        this.sub = Sub.getInstance();
        this.calcConstants = new CalcConstant();
        this.lat = this.calcConstants.getCompLat(this.ocean, this.sub) || 0;
        this.vert = this.calcConstants.getCompVert(this.ocean, this.sub) || 0;
        this.varDepth = this.calcConstants.calcDepthLimit(this.lat) || null;
        this.flag = null;
        this.oldFlag = null;
        eventBus.on('oceanXChanged', this.handleOceanXChange);
    }


    handleOceanXChange = (newX: number) => {
        // Do something in response to the change in the Sub's x coordinate
        console.log('this is in Zone', newX);
      }
    upDateZoneObject():ITextObject{ 
        this.varDepth = this.calcConstants.calcDepthLimit(this.lat)
        this.flag = this.calcConstants.getZone(this.vert, this.varDepth);
      
       
        if (this.oldFlag !== this.flag) {
            this.oldFlag = this.flag;
            // console.log('this.flag updateZoneObject', this.flag)
            if (this.flag === EUPHOTIC_PELAGIC) {
               
                return textObjects[0]
            } else if (this.flag === EUPHOTIC_BENTHIC) {
                //  console.log("JJJJJJJ", textObjects[1])
                return textObjects[1]
            } else if (this.flag === DYSPHOTIC_PELAGIC) {
               
                return textObjects[2]
            } else if (this.flag === DYSPHOTIC_BENTHIC) {
                
                return textObjects[3]
            } else if (this.flag === APHOTIC_PELAGIC) {
             
                return textObjects[4]
            } else if (this.flag === APHOTIC_BENTHIC) {
       
                return textObjects[5]
            } else {
                return textObjects[this.flag]

            }

        } 
        return textObjects[this.flag]
    }
}
export default Zone;
