import Zone from "./zone";

class Images {
    private images: string[][];

    constructor() {
        // Assign a number to the arrays
        this.images = [this.ep, this.eb, this.dp, this.db, this.ap, this.ab];
    }

    public getImage(): string {
        const zone: Zone = new Zone();
        const arrNum: number = zone.upDateZoneObject().id;

        const arr = this.images[arrNum];
        const x = Math.floor(Math.random() * arr.length);
        return arr[x];
    }

    private ep: string[] = [
        "./src/assets/life/ep/001.jpg",
        "./src/assets/life/ep/002.jpeg",
        "./src/assets/life/ep/003.jpeg",
        "./src/assets/life/ep/004.jpeg",
        "./src/assets/life/ep/005.webp",
        "./src/assets/life/ep/006.jpeg",
        "./src/assets/life/ep/007.jpeg",
        "./src/assets/life/ep/008.jpeg",
        "./src/assets/life/ep/009.jpeg",
        "./src/assets/life/ep/010.jpeg",
        "./src/assets/life/ep/011.jpg",
        "./src/assets/life/ep/012.webp",
        "./src/assets/life/ep/013.jpeg",
        "./src/assets/life/ep/014.jpeg",
    ];

    private eb: string[] = [
        "./src/assets/life/eb/001.jpeg",
        "./src/assets/life/eb/002.webp",
        "./src/assets/life/eb/003.jpeg",
        "./src/assets/life/eb/004.jpg",
        "./src/assets/life/eb/005.jpeg",
        "./src/assets/life/eb/006.jpeg",
        "./src/assets/life/eb/007.jpg",
        "./src/assets/life/eb/008.jpeg",
        "./src/assets/life/eb/009.jpeg",
        "./src/assets/life/eb/010.jpeg",
        "./src/assets/life/eb/011.jpeg",
        "./src/assets/life/eb/012.jpg",
        "./src/assets/life/eb/013.webp",
        "./src/assets/life/eb/014.jpg",
        "./src/assets/life/eb/015.jpg",
        "./src/assets/life/eb/016.jpg",
        "./src/assets/life/eb/017.jpg",
    ];

    private dp: string[] = [
        "./src/assets/life/dp/001.jpeg",
        "./src/assets/life/dp/002.jpeg",
        "./src/assets/life/dp/003.jpg",
        "./src/assets/life/dp/004.jpeg",
        "./src/assets/life/dp/005.jpeg",
        "./src/assets/life/dp/006.jpeg",
        "./src/assets/life/dp/007.jpeg",
        "./src/assets/life/dp/008.jpeg",
        "./src/assets/life/dp/009.png",
        "./src/assets/life/dp/010.webp",
        "./src/assets/life/dp/011.jpeg",
        "./src/assets/life/dp/012.jpeg",
        "./src/assets/life/dp/013.webp",
        "./src/assets/life/dp/014.jpeg",
    ];

    private db: string[] = [
        "./src/assets/life/db/001.png",
        "./src/assets/life/db/002.jpeg",
        "./src/assets/life/db/003.jpeg",
        "./src/assets/life/db/004.jpeg",
        "./src/assets/life/db/005.webp",
        "./src/assets/life/db/006.webp",
        "./src/assets/life/db/007.webp",
        "./src/assets/life/db/008.webp",
        "./src/assets/life/db/009.webp",
        "./src/assets/life/db/010.jpeg",
        "./src/assets/life/db/011.jpeg",
        "./src/assets/life/db/012.webp",
        "./src/assets/life/db/013.jpeg",
        "./src/assets/life/db/014.jpeg",
    ];
    private ap: string[] = [
        "./src/assets/life/ap/001.jpeg",
        "./src/assets/life/ap/002.jpeg",
        "./src/assets/life/ap/003.jpg",
        "./src/assets/life/ap/004.jpeg",
        "./src/assets/life/ap/005.webp",
        "./src/assets/life/ap/006.jpeg",
        "./src/assets/life/ap/007.jpeg",
        "./src/assets/life/ap/008.jpeg",
        "./src/assets/life/ap/009.jpeg",
        "./src/assets/life/ap/010.jpeg",
        "./src/assets/life/ap/011.webp",
        "./src/assets/life/ap/012.jpeg",
        "./src/assets/life/ap/013.jpeg",
        "./src/assets/life/ap/014.jpeg",
        "./src/assets/life/ap/015.jpeg",
        "./src/assets/life/ap/016.jpeg",
    ];
    private ab: string[] = [
        "./src/assets/life/ab/001.jpeg",
        "./src/assets/life/ab/002.jpeg",
        "./src/assets/life/ab/003.png",
        "./src/assets/life/ab/004.jpeg",
        "./src/assets/life/ab/005.jpeg",
        "./src/assets/life/ab/006.jpeg",
        "./src/assets/life/ab/007.jpeg",
        "./src/assets/life/ab/008.jpeg",
        "./src/assets/life/ab/009.webp",
        "./src/assets/life/ab/010.jpeg",
        "./src/assets/life/ab/011.jpeg",
        "./src/assets/life/ab/012.jpeg",
        "./src/assets/life/ab/013.jpeg",
        "./src/assets/life/ab/014.jpeg",
    ];
}

export default Images;
