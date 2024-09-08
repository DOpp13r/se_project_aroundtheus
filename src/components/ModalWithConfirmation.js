import Modal from "./Modal.js";

export default class ModalWithConfirmation extends Modal {
  constructor({ modalSelector }) {
    const modalElement = document.querySelector(modalSelector);
    if (!modalElement) {
      throw new Error(`The "${modalSelector}" selector not found`);
    }

    super({ modalSelector: modalSelector });
    this._modalForm = modalElement.querySelector(".modal__form");
    this._submitButton = this._modalForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._handleFormSubmit = null;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setModalLoad(submit, loadingText = "Saving...") {
    if (submit) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (typeof this._handleFormSubmit === "function") {
        this._handleFormSubmit();
      } else {
        alert("No submit action defined");
      }
    });
    super.setEventListeners();
  }
}
