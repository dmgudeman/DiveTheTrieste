import {
    INITIAL_Y_POSITION,
    SUB_INITIAL_LAT_POS,
  } from './constants';
  
  class Sub {
    private ctx: CanvasRenderingContext2D;
    private x: number;
    private y: number;
    private w: number;
    private h: number
    private velRight: number;
    private velLeft: number;
    private velUp: number;
    private velDown: number;
    private subImage: HTMLImageElement;
    private initialLateralPos: number;
    private initialDepthPos: number;

  
    constructor(options: SubOptions) {
      this.ctx = options.ctx;
      this.x = options.x || SUB_INITIAL_LAT_POS;
      this.y = options.y || INITIAL_Y_POSITION;
      this.w = options.width || 120; // size of the sub in px
      this.h = options.height || 120; // size of the sub in px
      this.velRight = options.velRight || 0;
      this.velLeft = options.velLeft || 0;
      this.velUp = options.velUp || 0;
      this.velDown = options.velDown || 0;
      this.initialLateralPos = options.initialLateralPos || SUB_INITIAL_LAT_POS;
      this.initialDepthPos = options.initialDepthPos || INITIAL_Y_POSITION;
    }
  
    draw() {
      this.ctx.drawImage(this.subImage, this.x, this.y, this.w, this.h);
    }
    
    public getX(): number {
        return this.x;
    }

    public setX(x: number): void {
        this.x = x;
    }
    public getY(): number {
        return this.y;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public getW(): number {
        return this.w;
    }
    public getH(): number {
        return this.h;
    }

    public getVelRight(): number {
        return this.velRight;
    }

    public setVelx(velRight: number): void {
        this.velRight = velRight;
    }

    public getVelLeft(): number {
        return this.velLeft;
    }

    public setVelLeft(velLeft: number): void {
        this.velLeft = velLeft;
    }
    public getVelUp(): number {
        return this.velUp;
    }

    public setVelUp(velUp: number): void {
        this.velUp = velUp;
    }
    public getVelDown(): number {
        return this.velDown;
    }

    public setVelDown(velDown: number): void {
        this.velDown = velDown;
    }



  }
  
  interface SubOptions {
    ctx: CanvasRenderingContext2D;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    velRight?: number;
    velLeft?: number;
    velUp?: number;
    velDown?: number;
    initialLateralPos?: number;
    initialDepthPos?: number;
  }
  
  export default Sub;



 
