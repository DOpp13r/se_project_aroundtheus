import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._inputList = this._modalForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._modalButton = this._modalForm.querySelector(".modal__button");
    this._modalButtonText = this._modalButton.textContent;
  }

  setModalLoad(isLoading) {
    if (isLoading) {
      this._modalButton.textContent = "Saving...";
      this._modalButton.disabled = true;
    } else {
      this._modalButton.textContent = this._modalButtonText;
      this._modalButton.disabled = false;
    }
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  // setEventListeners() {
  //   this._modalForm.addEventListener("submit", (e) => {
  //     const modalData = this._getInputValues();
  //     e.preventDefault();
  //     this.setModalLoad(true);
  //     this._handleFormSubmit(modalData)
  //       .then(() => {
  //         console.log(`Success:`, modalData);
  //         this.close();
  //         this._modalForm.reset();
  //       })
  //       .catch((err) => {
  //         console.error(`Error:`, err);
  //       })
  //       .finally(() => {
  //         this.setModalLoad(false);
  //       });
  //   });
  //   super.setEventListeners();
  // }

  close() {
    this._modalForm.reset();
    super.close();
  }
}
