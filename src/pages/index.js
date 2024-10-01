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

/*   Form Elements   */
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileAvatarInput = document.querySelector("#profile-avatar-input");

/*     Buttons and other nodes     */
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#add-card-button");

/*    UserInfo instance    */
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

/*    Initialize the API class */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0cf64498-698a-4a3e-96c1-2e4d20ea25da",
    "Content-Type": "application/json",
  },
});

/*    Function for creation of card    */
function createCard(data) {
  const card = new Card(data, cardTemplate, handleImageClick, api);
  return card.getView();
}

function renderCard(data) {
  const cardElement = createCard(data);
  section.addItem(cardElement);
}

const section = new Section(
  {
    items: [],
    renderer: renderCard,
  },
  ".cards__list"
);

section.renderItems();

/*    ModalWithForm Instances    */
const profileEditModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditModal.setEventListeners();

const addCardModal = new ModalWithForm("#add-card-modal", handleAddCardCreate);
addCardModal.setEventListeners();

const profileAvatarEditModal = new ModalWithForm(
  "#profile-avatar-edit-modal",
  handleProfileAvatarUpdate
);
profileAvatarEditModal.setEventListeners();

// Add an event listener to the button to open the avatar update modal
const profileAvatarEditButton = document.querySelector(
  "#profile-avatar-edit-button"
);
profileAvatarEditButton.addEventListener("click", () => {
  profileAvatarEditModal.open();
  profileAvatarInput.value = "";
});

// Handle profile avatar update function
function handleProfileAvatarUpdate(data) {
  api
    .updateUserAvatar(data.avatar)
    .then((userData) => {
      // Update the avatar image
      const avatarElement = document.querySelector(".profile__avatar");
      avatarElement.src = userData.avatar;
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
        avatar: userData.avatar,
      });

      profileAvatarEditModal.close();
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);

      const errorMessage = document.querySelector(
        "#profile-avatar-input-error"
      );
      errorMessage.textContent = "Failed to update avatar. Please try again.";
    })
    .finally(() => {
      profileAvatarEditModal.setModalLoad(false);
    });
}

/*    Form validators    */
const profileEditForm = document.forms["profile-edit-form"];
const addCardForm = document.forms["add-card-form"];
const profileAvatarForm = document.forms["profile-avatar-edit-form"];
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);
const avatarFormValidator = new FormValidator(config, profileAvatarForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

/*    ModalWithImage Instances    */
const previewImageModal = new ModalWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

/*    Functions for opening/closing modals    */
function handleProfileEditSubmit(data) {
  api
    .updateUserInfo(data.name, data.description)
    .then((userData) => {
      // Update the UI with the new user data
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
        avatar: userData.avatar,
      });

      // Close the modal
      profileEditModal.close();
    })
    .catch((err) => {
      console.error("Error updating user info:", err);
    })
    .finally(() => {
      profileEditModal.setModalLoad(false);
    });
}

function handleAddCardCreate(data) {
  const name = data.title;
  const link = data.link;

  api
    .addCard(name, link)
    .then((newCardData) => {
      renderCard(newCardData);
      addCardModal.close();
      addCardForm.reset();
      addFormValidator.disableButton();
    })
    .catch((err) => {
      console.error("Error adding card:", err);
    })
    .finally(() => {
      addCardModal.setModalLoad(false);
    });
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

/* Load user information and cards on page load */
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });

    cards.forEach((card) =>
      renderCard({
        name: card.name,
        link: card.link,
        id: card._id,
        isLiked: card.isLiked,
        createdAt: card.createdAt,
      })
    );
  })
  .catch((err) => {
    console.error("Error loading user info or cards:", err);
  });
