export default class Card {
  constructor(
    { name, link },
    cardSelector,
    handleImageClick,
    handleDeleteCard
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".cards__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    const cardTitle = this._element.querySelector(".cards__name");
    cardTitle.textContent = this._name;
    // set event listener
    this._setEventListeners();
    // return card
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._element
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  _handleDeleteCard() {
    if (typeof this._handleDeleteCard === "function") {
      this._handleDeleteCard(this._element);
    } else {
      console.error("Method _handleDeleteCard is not a function");
    }
  }
}
