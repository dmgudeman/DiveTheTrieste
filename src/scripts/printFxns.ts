




export const printMessage = (ocean: Ocean, line:number, dir:string, depthObject: DepthObject) => {
    console.log('++++++++++++++++++++')
    console.log(`MOVEUTILS LINE ${line.toString()}`)
    console.log('dir', dir),
    console.log("depthObject.name", depthObject.name);
    console.log("depthObject.mvmtLat", depthObject.mvmtLat);
    console.log("OCEAN VEL_U, VEL_D", ocean.getVelUp(), ocean.getVelDown())
    console.log("OCEAN VEL_R, VEL_L", ocean.getVelRight(), ocean.getVelLeft())
    console.log("OCEAN X __ Y", ocean.getX(), ocean.getY());
    console.log('++++++++++++++++++++')
}