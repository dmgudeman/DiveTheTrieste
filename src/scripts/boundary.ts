import { SEA_DEPTH,  DIST_CA_TO_TRENCH } from "./constants";
import Ocean from './ocean';
import Sub from './sub';
import CalcConstant from "./calcConstant";
import Zone from "./zone";
import InitialValues from "./initialValues";
import { eventBus } from "./eventBus";
import CalcPosition from "./calcPosition";

const calcPosition = CalcPosition.getInstance();
const initialValues = InitialValues.getInstance();

export  function showMouseAsSub(event) {
    var x = event.clientX - initialValues.getInitial_X();
    var y = event.clientY - initialValues.getInitial_Y();
    console.log("X: " + x + ", Y: " + y);
  }

export function showDepth() {
    const ocean = Ocean.getInstance();
    const sub = Sub.getInstance();
    const conversion:number = SEA_DEPTH / initialValues.getHeight(); // 19.64 feet per pixel
    const conversionShallow:number = 2; // 2 feet per pixel
    let composite:number = calcPosition.getCompVert();
    const depthGauge = document.getElementById("depth");
    const IPDepthGauge = document.getElementById("IPDepthGauge");
    let depth: number;
    console.log('COMPOSITE', composite)
    console.log('COMPOSITE500', composite > -500)
    console.log('COMPOSITE500', composite > -500)
    console.log('COMPOSITE7000', composite > -700)
    console.log('COMPOSITE700', composite > -700)
   
  
   
    if (composite > -500) {
        console.log('COMPOSITE111111111', composite )
        depth = Math.floor(conversionShallow * -composite);
        depthGauge.innerHTML = `Depth: ${Math.floor(depth)} feet`;
        IPDepthGauge.innerHTML = `Depth: ${depth} ft`;
    } else if (composite > -1000) {
        console.log('COMPOSITE33333333', composite ) 
        depth = composite * -conversion
        depthGauge.innerHTML = `Depth: ${Math.floor(depth)} feet`;
        IPDepthGauge.innerHTML = `Depth: ${depth} ft`;
    } else {
        console.log('COMPOSITE2222222222', composite)
        let miles = (conversion * -composite)/ 5280;
        depth = parseFloat(miles.toFixed(1));
        depthGauge.innerHTML = `Depth: ${depth} mile`;
        IPDepthGauge.innerHTML = `Depth: ${depth} mi`;
    }
    if (depth < 0) depth = 0;
    let tempDepth = calcPosition.getCompVert()
    // console.log('BOUNDARY 88888');
    // console.log('height initialValues', initialValues.getHeight())
    // console.log('LOCAL VERT', composite);
    // console.log('CALC POS VERT', calcPosition.getCompVert())
    // console.log('88888888888')
  
   
    return depth;
}


export function showLat() : number {
    const ocean = Ocean.getInstance();
    const sub = Sub.getInstance();
    const calcConstant = new CalcConstant();
    const conversion = Math.ceil(Math.abs(DIST_CA_TO_TRENCH/calcConstant.getDistCAtoTrench())); 
    let composite = Math.abs(ocean.getX() - sub.getX() + initialValues.getInitial_X());
    let lat: number;
    lat = Math.floor(Math.abs(composite * conversion));
    if (composite < 0) lat = 0;
    const IPLatGauge = document.getElementById("IPLatGauge");
    IPLatGauge.innerHTML = `Dist: ${lat} mi`;
    return lat
}

export function showZone():string {
    const zone = new Zone();
    // console.log('zoneObject.id in BOUNDARY', zone.upDateZoneObject().id)
    const title = zone.upDateZoneObject().title;
    const IPZoneGauge = document.getElementById("IPZoneGauge");
    IPZoneGauge.innerHTML = `${title}`;
    return title;
}

export function pickImageArray(ocean, sub, ctx) {
    let x = ocean.sx + sub.x + sub.initialLateralPos;
    let y = ocean.sy + sub.y + sub.initialDepthPos;
    let deep = y / ctx.canvas.height;
    let lat = x / ctx.canvas.width;
    if (lat < 0.5) {
        if (deep < 0.3) {
            return 0; //eb
        } else {
            return 2; //db
        }
    } else {
        if (deep < 0.25) {
            return 1; //ep
        } else if (deep < 0.5) {
            return 3; //dp
        } else if (deep < 0.75) {
            return 5; //ap
        } else {
            return 4; //ab
        }
    }
}
