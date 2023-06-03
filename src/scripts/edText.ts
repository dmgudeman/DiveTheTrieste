import { textObjects } from "./constants";
import CalcConstant from "./calcConstant";
import { ITextObject } from "./types";

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
    private textElTypes: string[];
    private zoneFlag: string;
    private textObjects: ITextObject[];
    private calcConstants: CalcConstant;

    constructor() {
        this.edContainer = document.getElementById("edContainer") || null;
        this.edTitle = document.getElementById("edTitle") || null;
        this.edText = document.getElementById("edText") || null;
        this.textEls = [this.edContainer, this.edTitle, this.edText];
        this.textElStrings = ["edContainer", "edTitle", "edText"];
        this.textElSuffixes = ["EdContainer", "EdTitle", "EdText"];
        this.textElTypes = ["id", "title", "text"];
        this.textObjects = textObjects;
        this.calcConstants = new CalcConstant();
    }

    updateEdText(num: number) {
        this.setEdStyle(num);
        this.setEdText(num);
    }

    setEdStyle(num: number) {
        this.clearAllEdElementsClassList(); 
        this.textEls.forEach((textEl, idx) => { 
            let className = this.textElStrings[idx];
            let className2 =
                this.cssOne[num] + "Style" + this.textElSuffixes[idx];
            textEl.classList.add(className);
            textEl.classList.add(className2);
        });
    }

    initialEdSetup(){
        this.updateEdText(1)
    }

    setEdText(num: number) {
        let textObject = this.calcConstants.getTextObject(num);
        this.edTitle.textContent = textObject.title;
        this.edText.textContent = textObject.text;
    }

    clearOneEdElementClassList(element: HTMLElement) {
        while (element.classList.length > 0) {
            element.classList.remove(element.classList.item(0));
        }
    }

    clearAllEdElementsClassList(){
        this.textEls.forEach((textEl) => {
            this.clearOneEdElementClassList(textEl);  
        });
    }
}

export default EdText;
