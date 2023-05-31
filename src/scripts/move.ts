import {
    INITIAL_Y_POSITION,
    LEFT_EDGE_TRENCH,
    RIGHT_EDGE_TRENCH,
    OCEAN_DEPTH_LIMIT,
    FULL_LAT_LIMIT,
    LAT_VELOCITY,
    VERTICAL_VELOCITY,
    SUB_INITIAL_LAT_POS,
    SLOPE_LAT,
    SHELF_DEPTH,
    TRENCH_TOP,
    OCEAN_FLOOR,
    LAT_LIMITS,
} from "./constants";
import Ocean from "./ocean";
import Sub from "./sub";
import { MoveObjects, LatMoveLimit } from "./types";
import CalcConstant from "./calcConstant";
import {WIDTH} from '../index';

let displayObjects;


export const getMove = (dir:string) => {
    clearHitBottom();
    let ocean = Ocean.getInstance();
    let sub = Sub.getInstance();
    resetVelocities(ocean, sub);
    const constants = new CalcConstant()
    let compLat = ocean.getX() - sub.getX() + SUB_INITIAL_LAT_POS;
    let latOcean = ocean.getX();
    let oceanLatLimit = constants.getOceanLatLimit();
    const fullLatLimit = constants.getFullLatLimit();
    let latSub = sub.getX();
    let compVert = ocean.getY() + sub.getY() - INITIAL_Y_POSITION;
    console.log("COMPLAT", compLat);
    console.log("OCEAN LAT LIMIT", constants.getOceanLatLimit())
  
    let variableDepth = calcDepthLimit(compLat);
    
    console.log('OCEAN X', ocean.getX())
    console.log('SUB X', sub.getX())
    

    getLatMove(ocean, sub, dir, compLat, variableDepth, oceanLatLimit, fullLatLimit);

};
function getLatMove(ocean:Ocean, sub:Sub, dir:string, lat: number, depth:number, oceanLatLimit:number, fullLatLimit: number) {
  
    const moveOceanRight = () => {
        ocean.setX( ocean.getX() - LAT_VELOCITY);
    };

    const moveOceanLeft = () => {
        ocean.setX(ocean.getX() + LAT_VELOCITY);
    };
    const moveSubRight = () => {   
        sub.setX(sub.getX() + LAT_VELOCITY);    
    };
    const moveSubLeft = () => { 
        sub.setX(sub.getX() - LAT_VELOCITY);
    };

    if (lat > 0) { 
        moveOceanRight();
    } else if (lat > oceanLatLimit) {
        
        if (dir === 'right') {
            moveOceanRight();
        } else if (dir === 'left'){
           moveOceanLeft();
        }
    } else if (lat > fullLatLimit) {
        if (dir === 'right') {
            moveSubRight();
        } else if (dir === 'left'){
           moveSubLeft();
        }
    } else if (lat < fullLatLimit) {
        if (dir === 'left') {
            moveSubLeft();
        }     
    }

}

function getVerticalMove(ocean:Ocean, sub:Sub, dir:string, vert: number, depth:number, oceanLatLimit:number, fullLatLimit: number) {
    

    const moveOceanUp = () => {
        ocean.setY( ocean.getY() - VERTICAL_VELOCITY);
    };

    const moveOceanDown = () => {
        ocean.setY(ocean.getY() + VERTICAL_VELOCITY);
    };
    const moveSubUp = () => {   
        sub.setY(sub.getY() + VERTICAL_VELOCITY);    
    };
    const moveSubDown = () => { 
        sub.setY(sub.getY() - VERTICAL_VELOCITY);
    };

    if (vert <= 0) {
        moveOceanDown();
    } else if (vert < OCEAN_DEPTH_LIMIT && vert <= varDepth) {
        moveOceanVert();
    } else if (vert < OCEAN_FLOOR && vert <= varDepth) {
        ocean.sy = OCEAN_DEPTH_LIMIT - VERTICAL_VELOCITY; // reset the limits empirically
        moveSubVert();
    } else if (vert >= OCEAN_FLOOR || vert > varDepth) {
        //below the limit
        moveSubUp();
    }
    return displayObjects;
}

function calcDepthLimit(lat:number) {
    if (lat < 0) return 0;
    if (lat > FULL_LAT_LIMIT) return (lat = FULL_LAT_LIMIT);
    // The correct constant is filtered out
    const result = LAT_LIMITS.filter((obj:LatMoveLimit) => obj.x >= lat && obj.xll <= lat);
    let depthObject = result[0];
    console.log("depthObject", depthObject)

    let startX = depthObject.xll;
    let endX = depthObject.x;
    let startY = depthObject.yll;
    let endY = depthObject.y;
    let x = lat;
    if (depthObject.id === 0) return 21;
    if (startX === endX) {
        // handles vertical line
        if (x >= Math.min(startX, endX) && x <= Math.max(startX, endX)) {
            return startY;
        } else {
            return null;
        }
    }
    const slope = (endY - startY) / (endX - startX);
    const yIntercept = startY - slope * startX;
    const y = slope * x + yIntercept;
    return y;
}

export const hitBottom = () => {
    let hitBottom = document.getElementById("hitBottomContainer");
    hitBottom.classList.remove("hide");
};
export const clearHitBottom = () => {
    let hitBottom = document.getElementById("hitBottomContainer");
    hitBottom.classList.add("hide");
};

const resetVelocities = (ocean: Ocean, sub: Sub) => {
    ocean.setVelRight(0);
    ocean.setVelLeft(0);
    ocean.setVelUp(0);
    ocean.setVelDown(0);
    sub.setVelRight(0);
    sub.setVelLeft(0);
    sub.setVelUp(0);
    sub.setVelDown(0);
};
