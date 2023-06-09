import { SEA_DEPTH, DIST_CA_TO_TRENCH } from "./constants";
import CalcConstant from "./calcConstant";
import Zone from "./zone";
import InitialValues from "./initialValues";
import CalcPosition from "./calcPosition";
import { IMapPointObject } from "./types";

const calcPosition = CalcPosition.getInstance();
const initialValues = InitialValues.getInstance();
const calcConstant = new CalcConstant();

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
        IPDepthGauge.innerHTML = `Depth: ${Math.floor(depth)} ft`;
    } else if (composite > -1000) {
        depth = composite * -conversion;
        depthGauge.innerHTML = `Depth: ${Math.floor(depth)} feet`;
        IPDepthGauge.innerHTML = `Depth: ${Math.floor(depth)} ft`;
    } else {
        let miles = (conversion * -composite) / 5280;
        depth = parseFloat(miles.toFixed(1));
        depthGauge.innerHTML = `Depth: ${depth} mile`;
        IPDepthGauge.innerHTML = `Depth: ${depth} mi`;
    }
    if (depth < 0) depth = 0;

    return depth;
}

export function showDistToBottom(){
    const IPDistToBottom = document.getElementById("IPDistToBottom");
    const vert = calcPosition.getCompVert();
    const depthLimit =calcPosition.calcDepthLimit();
    const diff = vert - depthLimit;
    IPDistToBottom.innerHTML = `Dist to Sea Floor: ${diff} ft`;

}

export function showGeoDisplay(): void {
    const IPZoneGauge = document.getElementById("IPZoneGauge");
    let mapPointObject: IMapPointObject = calcPosition.getMapPointObject();
    let display = mapPointObject.display;
    if (calcPosition.getCompLat() === 0) display = 'Home';
    IPZoneGauge.classList.remove('IPTrench');
    if (display === 'Marina Trench') {
        IPZoneGauge.classList.add('IPTrench');
    }
    
    IPZoneGauge.innerHTML = `${display}`;
}

export function showLat(): number {
    const conversion = Math.ceil(
        Math.abs(DIST_CA_TO_TRENCH / calcConstant.getDistCAtoTrench())
    );
    let composite: number = Math.abs(calcPosition.getCompLat());
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

export function showMouseAsSub(e: MouseEvent) {
    var x = e.clientX - initialValues.getInitial_X();
    var y = e.clientY - initialValues.getInitial_Y();
    console.log("X: " + x + ", Y: " + y);
}
