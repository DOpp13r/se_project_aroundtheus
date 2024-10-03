import Modal from "./Modal.js";

export default class ModalWithConfirmation extends Modal {
  constructor({ modalSelector }) {
    super({ modalSelector });
  }
  setSubmitFunction(submitFunction) {
    this._submitFunction = submitFunction;
  }
  setEventListeners() {
    super.setEventListeners();
    this._modalElement
      .querySelector(".modal__form")
      .addEventListener("submit", this._submitFunction);
  }

  // export default class ModalWithConfirmation extends Modal {
  //   constructor({ modalSelector, handleConfirm }) {
  //     super({ modalSelector });
  //     this._handleConfirm = handleConfirm;
  //   }

  //   setEventListeners() {
  //     super.setEventListeners();
  //   }

  //   open() {
  //     super.open();
  //     this._modalButton = this._modalElement.querySelector(".modal__button");
  //     this._closeButton = this._modalElement.querySelector(".modal__close");

  //     if (this._modalButton) {
  //       this._modalButton.addEventListener("click", (e) => {
  //         e.preventDefault();
  //         this.handleConfirm();
  //         this.close();
  //       });
  //     }

  //     if (this._closeButton) {
  //       this._closeButton.addEventListener("click", () => {
  //         this.close();
  //       });
  //     }

  //     this._modalElement.addEventListener("click", (e) => {
  //       if (e.target.classList.contains("modal_opened")) {
  //         this.close();
  //       }
  //     });
  //   }

  close() {
    super.close();
  }
}
