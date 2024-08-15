import Modal from "./Modal";

export default class ModalWithImage extends Modal {
  constructor(ModalSelector) {
    super({ ModalSelector });
    this._image = this._modalElement.querySelector(".modal__preview-image");
    this._caption = this._modalForm.querySelectorAll(".modal__image-caption");
  }

  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
