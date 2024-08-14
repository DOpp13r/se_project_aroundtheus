import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import { initialCards, config } from "../utils/constants.js";

/*    Template    */
const cardTemplate = "#card-template";

/*   Form Elements   */
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/*     Buttoms and other nodes     */
const profileEditButton = document.querySelector("#profile-edit-button");
/* const profileCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
); */
const addCardButton = document.querySelector(".profile__add-button");
// const addCardCloseButton = addCardModal.querySelector("#modal-close-button");

/*    UserInfo instance    */
const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  descriptionSelector: "#profile-description",
});

/*    Function for creation of card    */
function createCard(data) {
  const card = new Card(data, cardTemplate, handleImageClick);
  return card.getView();
}

function renderCard(data) {
  const cardElement = createCard(data);
  section.addItem(cardElement);
}

const section = new Section(
  {
    items: initialCards,
    renderer: renderer,
  },
  ".cards__list"
);

section.renderItems();

/*    Form validators    */
const profileEditForm = document.querySelector(".profile-edit-modal");
const addCardForm = document.querySelector("#add-card-modal");
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

/*    PopupWithForm Instances    */
const profileEditModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditModal.setEventListeners();
const addCardModal = new PopupWithForm("#add-card-modal", handleAddCardCreate);
addCardModal.setEventListeners();

/*    PopupWithImage Instances    */
const previewImageModal = new PopupWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

/*    Functions for opening/closing modals    */
function handleProfileEditSubmit(data) {
  userInfo.setUserInfo({ name: data.name, job: data.description });
  profileEditModal.close();
}

function handleAddCardCreate(data) {
  const name = data.title;
  const link = data.url;
  renderer({ name, link });
  addCardModal.close();
  addCardForm.reset();
  addFormValidator.disableButton();
}

/*    Event Listeners    */
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name.trim();
  profileDescriptionInput.value = userData.job.trim();
  editFormValidator.resetValidation();
  profileEditModal.open();
});

addCardButton.addEventListener("click", () => {
  addCardModal.open();
});

function handleImageClick({ name, link }) {
  previewImageModal.open(name, link);
}

/*
const addCardNameInput = addCardForm.querySelector("#add-card-title-input");
const addCardUrlInput = addCardForm.querySelector("#add-card-url-input");

// const previewImageModal = document.querySelector("#preview-image-modal");
const previewCloseButton = previewImageModal.querySelector(
  "#modal-close-button"
);

const allModals = document.querySelectorAll(".modal");

const cardContainer = document.querySelector(".cards__list");
console.log(cardContainer);

const cardListEl = document.querySelector(".cards__list");

/*    Event Listeners  
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

allModals.forEach((modal) => {
  modal.addEventListener("click", clickCloseOverlay);
});

initialCards.forEach((data) => {
  const cardElement = createCard(data);
  cardContainer.append(cardElement);
});
*/
