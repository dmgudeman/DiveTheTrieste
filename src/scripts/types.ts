import Ocean from './ocean';
import Sub from './sub';

export interface MoveObjects {
    ocean: Ocean,
    sub: Sub,
    lat: string,
    vert: string
}

export interface LatMoveLimit {
    id: number;
    name: string;
    x: number;
    xll: number;
    y: number;
    yll: number;
  }
  