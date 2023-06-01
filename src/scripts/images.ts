import { pickImageArray } from './boundary';
import Ocean from './ocean';
import Sub from './sub';

class Images {
  private ctx: CanvasRenderingContext2D;
  private ocean: Ocean;
  private sub: Sub;
  private images: string[][];

  constructor(options: {
    ctx: CanvasRenderingContext2D;
    ocean: Ocean;
    sub: Sub;
  }) {
    this.ctx = options.ctx;
    this.ocean = options.ocean;
    this.sub = options.sub;

    // Assign a number to the arrays
    this.images = [this.eb, this.ep, this.db, this.dp, this.ab, this.ap];
  }

  public pickRandomImage(): string {
    const arrNum = pickImageArray(this.ocean, this.sub, this.ctx);
    const arr = this.images[arrNum];
    const x = Math.floor(Math.random() * arr.length);
    return arr[x];
  }
 
  private ab: string[] = [
        './assets/life/ab/001.jpeg',
        './assets/life/ab/002.jpeg',
        './assets/life/ab/003.png',
        './assets/life/ab/004.jpeg',
        './assets/life/ab/005.jpeg',
        './assets/life/ab/006.jpeg',
        './assets/life/ab/007.jpeg',
        './assets/life/ab/008.jpeg',
        './assets/life/ab/009.webp',
        './assets/life/ab/010.jpeg',
        './assets/life/ab/011.jpeg',
        './assets/life/ab/012.jpeg',
        './assets/life/ab/013.jpeg',
        './assets/life/ab/014.jpeg'
    ];
    private ap: string[] = [
        './assets/life/ap/001.jpeg',
        './assets/life/ap/002.jpeg',
        './assets/life/ap/003.jpg',
        './assets/life/ap/004.jpeg',
        './assets/life/ap/005.webp',
        './assets/life/ap/006.jpeg',
        './assets/life/ap/007.jpeg',
        './assets/life/ap/008.jpeg',
        './assets/life/ap/009.jpeg',
        './assets/life/ap/010.jpeg',
        './assets/life/ap/011.webp',
        './assets/life/ap/012.jpeg',
        './assets/life/ap/013.jpeg',
        './assets/life/ap/014.jpeg',
        './assets/life/ap/015.jpeg',
        './assets/life/ap/016.jpeg',
    ]
    private db: string[] = [
        './assets/life/db/001.png',
        './assets/life/db/002.jpeg',
        './assets/life/db/003.jpeg',
        './assets/life/db/004.jpeg',
        './assets/life/db/005.webp',
        './assets/life/db/006.webp',
        './assets/life/db/007.webp',
        './assets/life/db/008.webp',
        './assets/life/db/009.webp',
        './assets/life/db/010.jpeg',
        './assets/life/db/011.jpeg',
        './assets/life/db/012.webp',
        './assets/life/db/013.jpeg',
        './assets/life/db/014.jpeg'
   ];
   private dp: string[] = [
        './assets/life/dp/001.jpeg',
        './assets/life/dp/002.jpeg',
        './assets/life/dp/003.jpg',
        './assets/life/dp/004.jpeg',
        './assets/life/dp/005.jpeg',
        './assets/life/dp/006.jpeg',
        './assets/life/dp/007.jpeg',
        './assets/life/dp/008.jpeg',
        './assets/life/dp/009.png',
        './assets/life/dp/010.webp',
        './assets/life/dp/011.jpeg',
        './assets/life/dp/012.jpeg',
        './assets/life/dp/013.webp',
        './assets/life/dp/014.jpeg'
       


    ];
    private eb: string[] = [
        './assets/life/eb/001.jpeg',
        './assets/life/eb/002.jpeg',
        './assets/life/eb/003.jpeg',
        './assets/life/eb/004.jpeg',
        './assets/life/eb/005.jpeg',
        './assets/life/eb/006.jpeg',
        './assets/life/eb/007.jpeg',
        './assets/life/eb/008.jpeg',
        './assets/life/eb/009.jpeg',
        './assets/life/eb/010.jpeg',
        './assets/life/eb/011.jpeg',
        './assets/life/eb/012.jpeg',
        './assets/life/eb/013.webp',
        './assets/life/eb/014.jpeg'
    ];
    private ep: string[] = [
        './assets/life/ep/001.jpg',
        './assets/life/ep/002.jpeg',
        './assets/life/ep/003.jpeg',
        './assets/life/ep/004.jpeg',
        './assets/life/ep/005.webp',
        './assets/life/ep/006.jpeg',
        './assets/life/ep/007.jpeg',
        './assets/life/ep/008.jpeg',
        './assets/life/ep/009.jpeg',
        './assets/life/ep/010.jpeg',
        './assets/life/ep/011.jpg',
        './assets/life/ep/012.webp',
        './assets/life/ep/013.jpeg',
        './assets/life/ep/014.jpeg'
    ];       
}

export default Images;
