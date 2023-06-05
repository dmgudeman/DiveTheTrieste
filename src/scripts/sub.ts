import {
    INITIAL_Y_POSITION,
    SUB_INITIAL_LAT_POS,
    LAT_VELOCITY,
    VERTICAL_VELOCITY,
    getHitBottomFlag,
} from "./constants";
import { WIDTH, HEIGHT } from "../index";
import { ISprite } from "./types";
import {
    sprites,
    spritesL,
    crashSprites,
    crashSpritesL,
} from "../../assets/data/sprites";
import { eventBus } from "./eventBus";

class Sub {
    private static instance: Sub;
    private ctx: CanvasRenderingContext2D;
    private x: number;
    private y: number;
    private w: number;
    private h: number;
    private velRight: number;
    private velLeft: number;
    private velUp: number;
    private velDown: number;
    private spritesImageSrc: string; // this is the sprite sheet
    private spriteSheet: HTMLImageElement;
    private sprites: ISprite[];
    private currentFrame: number;
    private lastFrameTime: number;
    private initialLatPos: number;
    private initialVertPos: number;
    private lastLatDir: string;

    private constructor(
        ctx: CanvasRenderingContext2D,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        velRight?: number,
        velLeft?: number,
        velUp?: number,
        velDown?: number,
        spritesImageSrc?: string,
        sprites?: ISprite[],
        currentFrame?: number,
        lastFrameTime?: number
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
        this.spritesImageSrc = spritesImageSrc || "assets/sprites/sprite.png";
        this.sprites = sprites;
        this.currentFrame = currentFrame || 0;
        this.lastFrameTime = lastFrameTime || 0;
        this.initialLatPos = SUB_INITIAL_LAT_POS;
        this.initialVertPos = INITIAL_Y_POSITION;
        this.updateSprite = this.updateSprite.bind(this);
        this.lastLatDir = "right";
        this.spriteSheet = new Image();
        this.spriteSheet.src = this.spritesImageSrc;
    }

    public static getInstance(
        ctx?: CanvasRenderingContext2D,
        x: number = SUB_INITIAL_LAT_POS,
        y: number = 0,
        width: number = 120,
        height: number = 120,
        velRight: number = 0,
        velLeft: number = 0,
        velUp: number = 0,
        velDown: number = 0,
        spritesImageSrc = "assets/sprites/sprite.png",
        currentFrame: number = 0,
        lastFrameTime: number = 0,
        lastLatDir: string = "right",
        initialLatPos = SUB_INITIAL_LAT_POS,
        initialVertPos = INITIAL_Y_POSITION
    ): Sub {
        if (!Sub.instance) {
            if (!ctx) {
                throw new Error(
                    "A context must be provided when creating a new instance."
                );
            }
            Sub.instance = new Sub(
                ctx,
                x,
                y,
                width,
                height,
                velRight,
                velLeft,
                velUp,
                velDown,
                spritesImageSrc,
                sprites,
                currentFrame,
                lastFrameTime
            );
        }
        return Sub.instance;
    }

    // draw() {
    //   this.ctx.drawImage(this.subImage, this.x, this.y, this.w, this.h);
    // }

    public getX(): number {
        return this.x;
    }

    public setX(x: number): void {
        this.x = x;
        this.updateCoordinates(this.x, this.y);
    }

    public getY(): number {
        return this.y;
    }

    public setY(y: number): void {
        this.y = y;
        this.updateCoordinates(this.x, this.y);
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

    public setVelRight(): void {
        this.velRight = LAT_VELOCITY;
    }

    public getVelLeft(): number {
        return this.velLeft;
    }

    public setVelLeft(): void {
        this.velLeft = LAT_VELOCITY;
    }
    public getVelUp(): number {
        return this.velUp;
    }

    public setVelUp(): void {
        this.velUp = VERTICAL_VELOCITY;
    }
    public getVelDown(): number {
        return this.velDown;
    }

    public setVelDown(): void {
        this.velDown = VERTICAL_VELOCITY;
    }
    public zeroVelRight(): void {
        this.velRight = 0;
    }

    public zeroVelLeft(): void {
        this.velLeft = 0;
    }

    public zeroVelUp(): void {
        this.velUp = 0;
    }

    public zeroVelDown(): void {
        this.velDown = 0;
    }

    public getInitialLatPos(): number {
        return this.initialLatPos;
    }
    public getInitialVertPos(): number {
        return this.initialVertPos;
    }

    public setLastLatDir(dir: string): void {
        this.lastLatDir = dir;
    }

    clear() {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

    draw() {
        this.updateSpriteData();
        const sprite = this.sprites[this.currentFrame];

        this.ctx.drawImage(
            this.spriteSheet,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height,
            this.getX(),
            this.getY(),
            this.getW(),
            this.getH()
        );
    }

    updateSprite() {
        this.updateSpriteData();
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.lastFrameTime;

        if (elapsedTime > 1000 / 10) {
            // if (this.lastLatDir === "right") {
            const sprite = this.sprites[this.currentFrame];
            this.ctx.drawImage(
                this.spriteSheet,
                sprite.x,
                sprite.y,
                sprite.width,
                sprite.height,
                this.getX(),
                this.getY(),
                this.getW(),
                this.getH()
            );
            this.currentFrame++;
            if (this.currentFrame >= this.sprites.length) {
                this.currentFrame = 0;
            }
            this.lastFrameTime = currentTime;

            requestAnimationFrame(this.updateSprite);
        }
    }

    private updateSpriteData() {
        if (!getHitBottomFlag()) {
            if (this.lastLatDir === "right") {
                this.sprites = sprites;
                this.spritesImageSrc = "assets/sprites/sprite.png";
                this.spriteSheet = new Image();
                this.spriteSheet.src = this.spritesImageSrc;
            } else if (this.lastLatDir === "left") {
                this.sprites = spritesL;
                this.spritesImageSrc = "assets/sprites/spriteL.png";
                this.spriteSheet = new Image();
                this.spriteSheet.src = this.spritesImageSrc;
            }
        } else {
            if (this.lastLatDir === "right") {
                this.sprites = crashSprites;
                this.spritesImageSrc = "assets/sprites/crashSprite.png";
                this.spriteSheet = new Image();
                this.spriteSheet.src = this.spritesImageSrc;
            } else if (this.lastLatDir === "left") {
                this.sprites = crashSpritesL;
                this.spritesImageSrc = "assets/sprites/crashSpriteL.png";
                this.spriteSheet = new Image();
                this.spriteSheet.src = this.spritesImageSrc;
            }
        }
    }

    private updateCoordinates(x: number, y: number) {
        this.x = x;
        this.y = y;

        eventBus.emit("submarineCoordinatesChanged", { x: this.x, y: this.y });
    }
}

export default Sub;
