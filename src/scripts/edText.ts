class EdText {
    private cssOne = [
        "upperPelagic",
        "upper",
        "middle",
        "middle",
        "lower",
        "lower",
    ];
    private edContainer: HTMLElement;
    private edTitle: HTMLElement;
    private edText: HTMLElement;
    private textEls: HTMLElement[];
    private textElStrings: string[];
    private textElSuffixes: string[];
    private zoneFlag: string;

    constructor() {
        this.edContainer = document.getElementById("edContainer") || null;
        this.edTitle = document.getElementById("edTitle") || null;
        this.edText = document.getElementById("edText") || null;
        this.textEls = [this.edContainer, this.edTitle, this.edText];
        this.textElStrings = ["edContainer", "edTitle", "edText"];
        this.textElSuffixes = ["EdContainer", "EdTitle", "EdText"]
    }

    updateEdText(num: number) {
            this.textEls.forEach((textEl, idx) => {
                this.clearClassList(textEl)
                let className = this.textElStrings[idx];
                let className2 = this.cssOne[num] + "Style" + this.textElSuffixes[idx];
                console.log("CLASSNAME", className);
                textEl.classList.add(className);
                textEl.classList.add(className2);
            });
        
    }
    clearClassList(element: HTMLElement) {
        while (element.classList.length > 0) {
            element.classList.remove(element.classList.item(0));
        }
    }
}

// export function addEdTextStyle(flag) {
//     const Text = document.getElementById("fadeInText");
//     const Title = document.getElementById("fadeInTitle");
//     const Container = document.getElementById("fadeInContainer");

//     const textEls = [Text, Title, Container];
//     const textElStrings = ["Text", "Title", "Container"];
//     Container.style.opacity = "1";

//     // reset classList
//     textEls.forEach((textEl, idx) => {
//         const className = "fadeIn" + textElStrings[idx];
//         textEl.classList.add(className);
//     });

//     textEls.forEach((textEl, idx) => {
//         const className = flag + "Style" + textElStrings[idx];
//         textEl.classList.add(className);
//     });
//     fadeInText(Title, Text);
// }

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

export default EdText;
