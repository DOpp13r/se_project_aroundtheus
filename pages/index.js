import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
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

const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/*    Elements   */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector(".profile__add-button");
const addCardCloseButton = addCardModal.querySelector("#modal-close-button");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardNameInput = addCardForm.querySelector("#add-card-title-input");
const addCardUrlInput = addCardForm.querySelector("#add-card-url-input");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector("#modal-preview-image");
const previewImageCaption = document.querySelector("#modal-image-caption");
const previewCloseButton = previewImageModal.querySelector(
  "#modal-close-button"
);

const forAllModals = document.querySelectorAll(".modal");

const cardContainer = document.querySelector(".cards__list");
console.log(cardContainer);

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);
addCardModal.addEventListener("submit", handleAddCardCreate);
addFormValidator.enableValidation();
editFormValidator.enableValidation();
// const cardListEl = document.querySelector(".cards-container");
//const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

/*    Functions   */
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", clickCloseESC);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", clickCloseESC);
  console.log("Modal closed", modal);
}

function getCardElement(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

/* function renderCard(data, cardListEl) {
  const cardElement = createCard(data);
  cardListEl.append(cardElement);
} */

/* function createCard(data) {
  const cardElement = new Card(data, "#card-template", handleImageClick);
  return cardElement.getView();
} */

function handleImageClick(name, link) {
  const modalImage = previewImageModal.querySelector("#modal-preview-image");
  const modalTitle = previewImageModal.querySelector("#modal-image-caption");
  modalImage.src = link;
  modalImage.alt = name;
  modalTitle.textContent = name;
  console.log(`Image clicked: ${name}, ${link}`);
}

addCardButton.addEventListener("click", () => openModal(addCardModal));
/* function getCardElement(data) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardNameEl = cardElement.querySelector(".cards__name");
  // access Delete button for each card to listen for a click, and delete card
  const deleteButton = cardElement.querySelector(".cards__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  // access Like button for each card to listen for a click, and set it to be active
  const likeButton = cardElement.querySelector(".cards__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button_active");
  });
  // access image preview to listen for a click to close the preview
  cardImageEl.addEventListener("click", () => handlePreviewImage(data));
  // set the path to the image to the link field of the object
  cardImageEl.src = data.link;
  // set the image alt text to the name field of the object
  cardImageEl.alt = data.name;
  // set the card title to the name field of the object, too
  cardNameEl.textContent = data.name;
  // return the ready HTML element with the filled-in data
  return cardElement;
}
*/

/*    Event Handlers    */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardCreate(e) {
  e.preventDefault();
  const name = addCardNameInput.value;
  const link = addCardUrlInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardListEl.prepend(cardElement);
  closeModal(addCardModal);
  addCardForm.reset();
}

/* function handlePreviewImage(data) {
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewImageCaption.textContent = data.name;
  openModal(previewImageModal);
} */

function clickCloseESC(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    return closeModal(modal);
  }
}

function clickCloseOverlay(e) {
  console.log("Clicked on overlay", e.target);
  if (e.target.classList.contains("modal")) {
    console.log("Closing modal triggered");
    closeModal(e.target);
  }
}

/*    Event Listeners  */
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
addCardForm.addEventListener("submit", handleAddCardCreate);

previewCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

forAllModals.forEach((modal) => {
  modal.addEventListener("click", clickCloseOverlay);
});

initialCards.forEach((data) => {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardContainer.append(cardElement);
  //renderCard(data, cardListEl);
});
