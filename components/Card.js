export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".cards__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".cards__title").textContent = this._name;
    // set event listener
    this._setEventListeners();
    // return card
    return this._cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    this._element
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => this._handleDeleteIcon());

    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => this._handleImageClick(data));
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  _handleDeleteIcon() {
    this._element.remove();
    this._element = null;
  }
}
