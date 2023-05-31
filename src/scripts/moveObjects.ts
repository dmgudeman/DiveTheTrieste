import { StringOptionsWithImporter } from "sass";
import { globalOcean, globalSub } from "../index.ts";
import { Ocean } from './ocean.ts'; 
import { Sub } from './sub.ts';

class MoveObjects {
  private ocean: Ocean; // Update the type to the appropriate type
  private sub: Sub; // Update the type to the appropriate type
  private lat: string;
  private vert: string;

  constructor(ocean: Ocean, sub: Sub, lat: string, vert: string) {
    this.ocean = ocean || globalOcean
    this.sub = sub || globalSub
    this.lat = lat || '';
    this.vert = vert || '';
  }

  setOcean(ocean: any) {
    this.ocean = ocean;
    return this.ocean;
  }

  getOcean() {
    return this.ocean;
  }

  setSub(sub: any) {
    this.sub = sub;
    return this.sub;
  }

  getSub() {
    return this.sub;
  }

  setLat(lat: string) {
    this.lat = lat;
    return this.lat;
  }

  getLat() {
    return this.lat;
  }

  setVert(vert: string) {
    this.vert = vert;
    return this.vert;
  }

  getVert() {
    return this.vert;
  }
}

interface MoveObjectsOptions {
  ocean?: Ocean; 
  sub?: Sub; 
  lat?: string;
  vert?: string;
}

export default MoveObjects;