import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(PopupSelector) {
    super({ PopupSelector });
    this._image = this._popupElement.querySelector(".modal__preview-image");
    this._caption = this._popupForm.querySelectorAll(".modal__image-caption");
  }

  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
