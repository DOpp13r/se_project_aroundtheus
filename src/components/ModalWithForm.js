import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit, config) {
    super({ modalSelector });
    this._modal = document.querySelector(modalSelector);
    this._config = config;
    this._modalForm = this._modal.querySelector(this._config.inputSelector);
    this.inputList = this._modal.querySelectorAll(".modal__input");
    this.inputValues = {};
    this._submitButton = this._modal.querySelector(".modal__button");
    this._handleFormSubmit = handleFormSubmit;
  }

  setModalLoad(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = "Save";
    }
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", (e) => {
        e.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this._form.reset();
      });
    } else {
    }
  }

  setInputValues(data) {
    this.inputValues.forEach((input) => {
      input.value = data[input.name];
    });

    close();
    {
      this._modal.querySelector(".modal__form").reset();
      super.close();
    }
  }
}
