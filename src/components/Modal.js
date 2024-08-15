export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose() {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListners() {
    this._modalElement.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("modal_opened") ||
        e.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
