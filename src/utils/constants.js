export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditForm = document.querySelector("#profile-edit-form");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileNameInput = document.querySelector("#profile-name-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

export const addCardModal = document.querySelector("#add-card-modal");
export const addCardButton = document.querySelector("#add-card-button");
export const addCardForm = document.querySelector("#add-card-form");
export const addCardSubmit = addCardModal.querySelector(".modal__button");

export const previewImage = document.querySelector(".modal__preview-image");
export const previewCaption = document.querySelector(".modal__image-caption");

export const profileAvatarButton = document.querySelector(
  ".profile__avatar_button"
);
export const profileAvatarModal = document.querySelector("#avatar-modal");
export const profileAvatarForm =
  profileAvatarModal.querySelector(".modal__form");

export const cardsDeleteButton = document.querySelector("#cards-delete-button");
export const cardsDeleteModal = document.querySelector("#modal-delete");
export const cardsDeleteForm =
  cardsDeleteModal.querySelector("#modal-delete-form");
