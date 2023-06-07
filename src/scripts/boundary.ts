import { SEA_DEPTH, DIST_CA_TO_TRENCH } from "./constants";
import Ocean from "./ocean";
import Sub from "./sub";
import CalcConstant from "./calcConstant";
import Zone from "./zone";
import InitialValues from "./initialValues";
import { eventBus } from "./eventBus";
import CalcPosition from "./calcPosition";

const calcPosition = CalcPosition.getInstance();
const initialValues = InitialValues.getInstance();

export function showMouseAsSub(e:MouseEvent) {
    var x = e.clientX - initialValues.getInitial_X();
    var y = e.clientY - initialValues.getInitial_Y();
    console.log("X: " + x + ", Y: " + y);
}

export function showDepth() {
    const conversion: number = SEA_DEPTH / initialValues.getHeight(); // 19.64 feet per pixel
    const conversionShallow: number = 2; // 2 feet per pixel
    let composite: number = calcPosition.getCompVert();
    const depthGauge = document.getElementById("depth");
    const IPDepthGauge = document.getElementById("IPDepthGauge");
    let depth: number;
  
    if (composite > -500) {
        depth = Math.floor(conversionShallow * -composite);
        depthGauge.innerHTML = `Depth: ${Math.floor(depth)} feet`;
        IPDepthGauge.innerHTML = `Depth: ${depth} ft`;
    } else if (composite > -1000) {
        depth = composite * -conversion;
        depthGauge.innerHTML = `Depth: ${Math.floor(depth)} feet`;
        IPDepthGauge.innerHTML = `Depth: ${depth} ft`;
    } else {
        let miles = (conversion * -composite) / 5280;
        depth = parseFloat(miles.toFixed(1));
        depthGauge.innerHTML = `Depth: ${depth} mile`;
        IPDepthGauge.innerHTML = `Depth: ${depth} mi`;
    }
    if (depth < 0) depth = 0;
   
    return depth;
}

export function showLat(): number {
    const ocean = Ocean.getInstance();
    const sub = Sub.getInstance();
    const calcConstant = new CalcConstant();
    const conversion = Math.ceil(
        Math.abs(DIST_CA_TO_TRENCH / calcConstant.getDistCAtoTrench())
    );
    let composite = Math.abs(
        ocean.getX() - sub.getX() + initialValues.getInitial_X()
    );
    let lat: number;
    lat = Math.floor(Math.abs(composite * conversion));
    if (composite < 0) lat = 0;
    const IPLatGauge = document.getElementById("IPLatGauge");
    IPLatGauge.innerHTML = `Dist: ${lat} mi`;
    return lat;
}

export function showZone(): string {
    const zone = new Zone();
    const title = zone.upDateZoneObject().title;
    const IPZoneGauge = document.getElementById("IPZoneGauge");
    IPZoneGauge.innerHTML = `${title}`;
    return title;
}

