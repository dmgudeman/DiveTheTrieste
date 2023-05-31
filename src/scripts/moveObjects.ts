
import Ocean from './ocean';
import Sub from './sub';


class MoveObjects {
  private ocean: Ocean;
  private sub: Sub;
  private lat: string;
  private vert: string;

  constructor(ocean: Ocean, sub: Sub) {
    this.ocean = ocean;
    this.sub =sub;
    this.lat = '';
    this.vert = '';
  }

  setOcean(ocean: Ocean): void {
    this.ocean = ocean;
  }
  getOcean() {
    return this.ocean;
  }

  setSub(sub: Sub): void {
    this.sub = sub;
  }

  getSub() {
    return this.sub;
  }

  setLat(lat: string): void {
    this.lat = lat;
  }

  getLat() {
    return this.lat;
  }

  setVert(vert: string): void {
    this.vert = vert;
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