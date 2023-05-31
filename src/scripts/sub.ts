import {
    INITIAL_Y_POSITION,
    SUB_INITIAL_LAT_POS,
  } from './constants';
  
  class Sub {
    private static instance: Sub;
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

  
    private constructor(
        ctx: CanvasRenderingContext2D,
        x?: number,
        y?: number,
        width?: number ,
        height?: number,
        velRight?: number,
        velLeft?: number,
        velUp?: number,
        velDown?: number,
        initialLateralPos?: number,
        initialDepthPos?: number
    ) {
      this.ctx = ctx;
      this.x = x || SUB_INITIAL_LAT_POS;
      this.y = y || INITIAL_Y_POSITION;
      this.w = width || 120; // size of the sub in px
      this.h = height || 120; // size of the sub in px
      this.velRight = velRight || 0;
      this.velLeft = velLeft || 0;
      this.velUp = velUp || 0;
      this.velDown = velDown || 0;
      this.initialLateralPos = initialLateralPos || SUB_INITIAL_LAT_POS;
      this.initialDepthPos = initialDepthPos || INITIAL_Y_POSITION;
    }

    public static getInstance(
        ctx: CanvasRenderingContext2D,
        x: number = SUB_INITIAL_LAT_POS,
        y: number = INITIAL_Y_POSITION,
        width: number = 120,
        height: number = 120,
        velRight: number = 0,
        velLeft: number = 0,
        velUp: number = 0,
        velDown: number = 0,
        initialLateralPos: number = SUB_INITIAL_LAT_POS,
        initialDepthPos: number = INITIAL_Y_POSITION,
    ): Sub {
        if (!Sub.instance) {
            Sub.instance = new Sub(ctx, x, y, width, height, velRight, velLeft, velUp, velDown, initialLateralPos, initialDepthPos);
        }
        return Sub.instance;
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
  
  
  export default Sub;



 
