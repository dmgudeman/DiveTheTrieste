import Ocean from "./ocean";
import Sub from "./sub";

export interface MoveObjects {
    ocean: Ocean;
    sub: Sub;
    lat: string;
    vert: string;
}

export interface LatMoveLimit {
    id: number;
    name: string;
    x: number;
    xll: number;
    y: number;
    yll: number;
}

export interface ISprite {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface DepthObject {
    id: number;
    name: string;
    x: number;
    xll: number;
    y: number;
    yll: number;
    mvmtLat: string;
}

export interface ITextObject {
    id: number;
    title: string;
    text: string;
}

export interface IMapPointObject {
    id: number;
    name: string;
    point: IMP;
    mvmtLat: string;
    coeff: number[];
    display: string;
}

export type IMP = [number, number, string];
