class Modal {
    private modal: HTMLElement | null;
    private closeButton: HTMLSpanElement | null;

    constructor() {
        this.modal = document.getElementById("modal");
        this.closeButton = document.getElementsByClassName(
            "close"
        )[0] as HTMLSpanElement | null;

        if (this.closeButton) {
            this.closeButton.addEventListener("click", () => {
             this.hideModal();
            });
        }

        if (this.modal) {
            window.addEventListener("click", (event) => {
                if (event.target === this.modal) {
                    this.hideModal()
                }
            });
        }
    }

    displayModalInitially() {
        if (!(localStorage.getItem("modalDisplayed") === "true")) {
            this.showModal();
        }
    }

    showModal() {
        if (this.modal) {
            this.modal.style.display = "block";
        }
    }

    hideModal() {
        if(this.modal) {
            this.modal.style.display = "none";
        }
        localStorage.setItem("modalDisplayed", 'true');
    }
}

export default Modal;
