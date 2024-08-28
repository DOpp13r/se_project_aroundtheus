import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import { initialCards, config } from "../utils/constants.js";

/*    Template    */
const cardTemplate = "#card-template";

/*    Api    */
const api = new Api({
  projectUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f5b79730-6f48-4bb4-b0bf-8df04866d781",
    "Content-Type": "application/json",
  },
});

let section;
api;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    section = new Section(
      {
        items: cards,
        renderer: (userData) => {
          const cardEl = renderCard(userData);
          section.addItem(cardEl);
        },
      },
      ".cards__list"
    );
    section.renderItems();

    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });

    userInfo.setAvatar({ avatar: userData.avatar });
  })
  .catch((err) => {
    console.log(err);
  });

/*   Form Elements   */
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/*     Buttons and other nodes     */
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#add-card-button");

/*    UserInfo instance    */
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
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

/*    ModalWithForm Instances    */
const profileEditModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditModal.setEventListeners();
const addCardModal = new ModalWithForm("#add-card-modal", handleAddCardCreate);
addCardModal.setEventListeners();

/*    Form validators    */
console.log(document.forms);
const profileEditForm = document.forms["profile-edit-form"];
const addCardForm = document.forms["add-card-form"];
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/*    ModalWithImage Instances    */
const previewImageModal = new ModalWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

/*    Functions for opening/closing modals    */
function handleProfileEditSubmit(data) {
  userInfo.setUserInfo({ name: data.name, description: data.description });
  profileEditModal.close();
}

function handleAddCardCreate(data) {
  const name = data.title;
  const link = data.link;

  console.log(`Creating card with name: ${name} and link: ${link}`);

  renderCard({ name, link });
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
  addFormValidator.resetValidation();
  addCardModal.open();
});

function handleImageClick(name, link) {
  previewImageModal.open({ name, link });
}
