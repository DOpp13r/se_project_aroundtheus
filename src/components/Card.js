export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeCard,
    api
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this.isLiked = isLiked;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this.api = api;
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

    this.renderLikeIcon();
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeCard(this);
      });

    this._element
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });

    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  handleRemoveCard() {
    this._element.remove();
    this._element = null;
  }

  toggleLikeIcon() {
    this._element
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  renderLikeIcon() {
    if (this.isLiked) {
      this._element
        .querySelector(".cards__like-button")
        .classList.add("cards__like-button_active");
    } else {
      this._element
        .querySelector(".cards__like-button")
        .classList.remove("cards__like-button_active");
    }
  }

  handleLikeIcon(isLiked) {
    this.isLiked = isLiked;
    this.toggleLikeIcon();
  }
}
