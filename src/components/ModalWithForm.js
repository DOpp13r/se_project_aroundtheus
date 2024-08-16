import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._inputList = this._modalForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListners() {
    super.setEventListners();
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
  }
}
