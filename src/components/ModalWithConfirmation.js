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
      .querySelector(".modal__button-delete")
      .addEventListener("click", () => this._submitFunction());
  }
}
