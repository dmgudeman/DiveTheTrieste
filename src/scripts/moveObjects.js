import { globalOcean, globalSub } from "../index";

class MoveObjects {
    constructor(options) { 
        this.ocean = options.ocean || globalOcean.ocean;
        this.sub = options.sub || globalSub.sub;
        this.lat = '';
        this.vert = '';  
    }

    setOcean = (ocean) => {
        this.ocean = ocean;
        return this.ocean;
    }
    getOcean = () => {
        return this.ocean;
    }
    setSub = (sub) => {
        this.sub = sub;
        return this.sub;
    }
    getSub = () => {
        return this.sub;
    }
    setLat = (lat) => {
        this.lat = lat;
        return this.lat;
    }
    getLat = () => {
        return this.lat;
    }
    setVert = (vert) => {
        this.vert = vert;
        return this.vert;
    }
    getVert = () => {
        return this.vert;
    }

}


export default MoveObjects;
