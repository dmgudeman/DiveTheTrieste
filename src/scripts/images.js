

class Images {
    constructor (options){
       this.sector = options.sector || 0;
       this.imageUrls = options.imageUrls || ['assets/life/ep/001_shark.jpg']
       this.images = options.images || [
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
    ];
       this.underImage = new Image();    
    }

    preloadImages(urls, callback) {
        let loaded = 0;
        urls.forEach((url) => {
            const image = new Image();
            image.onload = () => {
                loaded++;
                if (loaded === urls.length) {
                    return this.images;
                    //callback
                }
            };
            image.src = url;
            this.images.push(image);
        });

    }

    draw(){

    }
    pickRandomImage(){
        let imgs = this.images
        let used = []
        let x = Math.floor(Math.random()* imgs.length);
        //  if(!used.includes(imgs[x])){
        //     used.push(imgs[x])
        //     return imgs[x]
        //  } else {
        //     used = [imgs[imgs.length%x+1]]
        //     return imgs[imgs.length%x+1]
        //  }
       return imgs[x]
       
    }
 
    aphoticB = [];
    dysphoticB = [];
    dysphoticP = [];
    euphoticB = [];
    euphoticP = [];

        
}









export default Images;