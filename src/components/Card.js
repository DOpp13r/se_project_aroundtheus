// import ModalWithConfirmation from "./modalwithconfirmation";

export default class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    api
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
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

    if (localStorage.getItem(`card-${this._id}-liked`) === "true") {
      this._element
        .querySelector(".cards__like-button")
        .classList.add("cards__like-button_active");
    }

    this._setEventListeners();
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
        this._handleDeleteCard(this);
      });

    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  _handleLikeIcon() {
    if (
      this._element
        .querySelector(".cards__like-button")
        .classList.contains("cards__like-button_active")
    ) {
      this.api
        .dislikeCard(this._id)
        .then((data) => {
          this._element
            .querySelector(".cards__like-button")
            .classList.remove("cards__like-button_active");
          localStorage.removeItem(`card-${this._id}-liked`);
        })
        .catch((err) => {
          console.error("Error disliking card:", err);
        });
    } else {
      this.api
        .likeCard(this._id)
        .then((data) => {
          this._element
            .querySelector(".cards__like-button")
            .classList.add("cards__like-button_active");
          localStorage.setItem(`card-${this._id}-liked`, true);
        })
        .catch((err) => {
          console.error("Error liking card:", err);
        });
    }
  }

  // _handleDeleteIcon() {
  //   const deleteConfirmationModal = new ModalWithConfirmation({
  //     modalSelector: "#delete-confirmation-modal",
  //     handleConfirm: () => {
  //       this._deleteCard();
  //     },
  //   });
  //   deleteConfirmationModal.open();
  // }

  // _deleteCard() {
  //   this.api
  //     .deleteCard(this._id)
  //     .then(() => {
  //       this._element.remove();
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting card:", error);
  //     });
  // }
}
