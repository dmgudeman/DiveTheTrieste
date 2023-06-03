import { INITIAL_Y_POSITION, SEA_DEPTH, SUB_INITIAL_LAT_POS, DIST_CA_TO_TRENCH } from "./constants";
import { HEIGHT } from "../index";
import Ocean from './ocean';
import Sub from './sub';
import CalcConstant from "./calcConstant";
import Zone from "./zone";

// const ocean = Ocean.getInstance();
// const sub = Sub.getInstance();

export  function showMouseAsSub(event) {
    var x = event.clientX - SUB_INITIAL_LAT_POS;
    var y = event.clientY - INITIAL_Y_POSITION;
    console.log("X: " + x + ", Y: " + y);
  }

export function showDepth() {
    const ocean = Ocean.getInstance();
    const sub = Sub.getInstance();
    const conversion = SEA_DEPTH / HEIGHT; // 19.64 feet per pixel
    const conversionShallow = 2; // 2 feet per pixel
    let composite = Math.abs(ocean.getY() - sub.getY() + INITIAL_Y_POSITION);
    let depth: number;

    if (composite < 500) {
        depth = Math.floor(conversionShallow * composite);
    } else {
        depth = Math.floor(conversion * composite);
    }
    if (depth < 0) depth = 0;
    const depthGauge = document.getElementById("depth");
    const IPDepthGauge = document.getElementById("IPDepthGauge");
    depthGauge.innerHTML = `Depth: ${depth} feet`;
    IPDepthGauge.innerHTML = `Depth: ${depth} ft`;
    return depth;
}


export function showLat() : number {
    const ocean = Ocean.getInstance();
    const sub = Sub.getInstance();
    const calcConstant = new CalcConstant();
    const conversion = Math.ceil(Math.abs(DIST_CA_TO_TRENCH/calcConstant.getDistCAtoTrench())); 
    let composite = Math.abs(ocean.getX() - sub.getX() + SUB_INITIAL_LAT_POS);
    let lat: number;
    lat = Math.floor(Math.abs(composite * conversion));
    if (composite < 0) lat = 0;
    const IPLatGauge = document.getElementById("IPLatGauge");
    IPLatGauge.innerHTML = `Dist: ${lat} mi`;
    return lat
}

export function showZone():string {
    const zone = new Zone();
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
