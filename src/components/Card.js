export default class Card {
  constructor(
    //    { name, link },
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
    this._element = null;
    this.isLiked = data.isLiked || false;
    this.id = data._id;
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
    if (!this._element) {
      console.error("Card element is not initialized");
      return;
    }

    const likeButton = this._element.querySelector(".cards__like-button");
    const deleteButton = this._element.querySelector(".card__like-button");
    const cardsImage = this._element.querySelector(".cards__image");

    if (likeButton) {
      likeButton.addEventListener("click", () => {
        this._handleLike(this);
      });
    }
    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        this._handleDeleteCard(this);
      });
    }
    if (cardsImage) {
      cardsImage.addEventListener("click", () => {
        this._handleImageClick(this._data);
      });
    }
  }
  /*      .querySelector(".cards__like-button")
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
*/

  _handleLikeIcon() {
    this._element
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  isLiked(isLiked) {
    this.isLiked = isLiked;
    this._handleLike();
  }

  handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }
}
