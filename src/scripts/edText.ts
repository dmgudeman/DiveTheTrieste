


class EdText {


    private cssOne = ["upperPelagic", "upper", "middle", "middle", "lower", "lower"]
    private edContainer: HTMLElement;
    private edTitle: HTMLElement;
    private edText: HTMLElement;
    private zoneFlag : string;

    constructor() {
        this.edContainer = document.getElementById("fadeInContainer") || null;
        this.edTitle = document.getElementById("fadeInTitle") || null;
        this.edText = document.getElementById("fadeInText") || null;
       
    }

    updateEdText(num:number) {
        if (num === 0)


    }

    // if (this.flag === EUPHOTIC_PELAGIC) {
    //     this.edText.changeEducationalText(textObjects[0]);
    //     this.edText.addEdTextStyle("upperPelagic");
    // } else if (this.flag === EUPHOTIC_BENTHIC) {
    //     this.edText.changeEducationalText(textObjects[1]);
    //     this.edText.addEdTextStyle("upper");
    // } else if (this.flag === DYSPHOTIC_PELAGIC) {
    //     this.edText.changeEducationalText(textObjects[2]);
    //     this.edText.addEdTextStyle("middle");
    // } else if (this.flag === DYSPHOTIC_BENTHIC) {
    //     this.edText.changeEducationalText(textObjects[3]);
    //     this.edText.addEdTextStyle("middle");
    // } else if (this.flag === APHOTIC_PELAGIC) {
    //     this.edText.changeEducationalText(textObjects[4]);
    //     this.edText.addEdTextStyle("lower");
    // } else if (this.flag === APHOTIC_BENTHIC) {
    //     this.edText.changeEducationalText(textObjects[5]);
    //     this.edText.addEdTextStyle("lower");
    // }


    
   
  
    
}


export default EdText;