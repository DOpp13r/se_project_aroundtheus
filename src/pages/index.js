import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithConfirmation from "../components/modalwithconfirmation.js";
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
  const card = new Card(
    data,
    cardTemplate,
    handleImageClick,
    handleDeleteCard,
    handleLikeCard,
    api
  );
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

const profileAvatarEditButton = document.querySelector(
  "#profile-avatar-edit-button"
);

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

// Handle profile avatar update function
function handleProfileAvatarUpdate(inputValues) {
  console.log("inputValues:", inputValues);
  console.log("inputValues.avatar:", inputValues.avatar);

  profileAvatarEditModal.setModalLoad(true);
  api
    .updateUserAvatar(inputValues.avatar)
    .then((data) => {
      // Update the avatar image
      userInfo.setAvatar(data.avatar);
      avatarFormValidator.disableButton();
      profileAvatarEditModal.close();
      profileAvatarForm.reset();
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

/*    Functions for opening/closing modals    */
function handleProfileEditSubmit(data) {
  profileEditModal.setModalLoad(true);
  api
    .updateUserInfo(data.name, data.description)
    .then(() => {
      // Update the UI with the new user data
      userInfo.setUserInfo(data);
      editFormValidator.disableButton();
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
  addCardModal.setModalLoad(true);
  api
    .addCard(name, link)
    .then((cardData) => {
      renderCard(cardData);
      addFormValidator.disableButton();
      addCardForm.reset();
      addCardModal.close();
    })
    .catch((err) => {
      console.error("Error adding card:", err);
    })
    .finally(() => {
      addCardModal.setModalLoad(false);
    });
}

const deleteConfirmationModal = new ModalWithConfirmation({
  modalSelector: "#delete-confirmation-modal",
});

deleteConfirmationModal.setEventListeners();

function handleDeleteCard(card) {
  deleteConfirmationModal.open();
  deleteConfirmationModal.setSubmitFunction(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.handleRemoveCard();
        deleteConfirmationModal.close();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  });
}

function handleImageClick(name, link) {
  previewImageModal.open({ name, link });
}

function handleLikeCard(card) {
  if (card._isLiked) {
    api
      .dislikeCard(card._id)
      .then((data) => {
        card.handleLikeIcon(false);
      })
      .catch((err) => {
        console.error("Error disliking card:", err);
      });
  } else {
    api
      .likeCard(card._id)
      .then((data) => {
        card.handleLikeIcon(true);
      })
      .catch((err) => {
        console.error("Error liking card:", err);
      });
  }
}

/*    Event Listeners    */
profileEditButton.addEventListener("click", () => {
  profileEditModal.open();
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name.trim();
  profileDescriptionInput.value = userData.job.trim(); // Update this line
  editFormValidator.resetValidation();
});

addCardButton.addEventListener("click", () => {
  addCardModal.open();
  addFormValidator.resetValidation();
});

profileAvatarEditButton.addEventListener("click", () => {
  profileAvatarEditModal.open();
});

/* Load user information and cards on page load */
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    const { name, about, avatar } = userData;
    userInfo.setUserInfo({ name, description: about, avatar });
    section.setItems(cards);
    section.renderItems();
  })
  .catch((err) => {
    console.error("Error loading user info or cards:", err);
  });
