import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import ModalWithConfirmation from "../components/ModalWithConfirmation.js";

import {
  initialCards,
  config,
  profileEditModal,
  profileEditButton,
  profileEditForm,
  profileName,
  profileDescription,
  profileDescriptionInput,
  addCardButton,
  addCardModal,
  profileAddButton,
  addCardForm,
  previewImage,
  previewCaption,
  profileAvatarButton,
  profileAvatarModal,
  profileAvatarForm,
  cardsDeleteButton,
  cardsDeleteModal,
  cardsDeleteForm,
} from "../utils/constants.js";

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

if (profileAddButton) {
  profileAddButton.addEventListener("click", () => {
    addModal.open();
  });
} else {
  console.error("profileAddButton is not defined");
}
/*     Buttons and other nodes     */
/*
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#add-card-button");
*/

/*    UserInfo instance    */
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

/*    Function for creation of card    */
function createCard(data) {
  const cardElement = new Card(
    data,
    cardTemplate,
    handleImageClick,
    handleDeleteCard,
    handleLike
  );
  return cardElement.getView();
}

function renderCard(data) {
  const addCard = new Card(
    data,
    cardTemplate,
    handleImageClick,
    handleDeleteCard,
    handleLike
  );
  return addCard.getView();
}

/*    ModalWithForm Instances    */
const editModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  config
);
editModal.setEventListeners();

const addModal = new ModalWithForm(
  "#add-card-modal",
  handleAddCardCreate,
  config
);
addModal.setEventListeners();

/*    Form validators    */
console.log(document.forms);
// const profileEditForm = document.forms["profile-edit-form"];
// const addCardForm = document.forms["add-card-form"];
// const profileAvatarForm = document.forms["avatar-edit-form"];
const editFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);
const avatarFormValidator = new FormValidator(config, profileAvatarForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const profileAvatarPopup = new ModalWithForm(
  "#avator-modal",
  handleAvatarSubmit,
  config
);

profileAvatarButton.addEventListener("click", () => {
  profileAvatarPopup.open();
});
profileAvatarPopup.setEventListeners();

/*    ModalWithImage Instances    */
const previewImageModal = new ModalWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

/*    Functions for opening/closing modals    */
function handleProfileEditSubmit(inputValues) {
  editModal.setModalLoad(true);
  api
    .setUserInfo(inputValues.name, inputValues.description)
    .then(() => {
      userInfo.setUserInfo(inputValues);
      editModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editModal.setModalLoad(false);
    });
}

function handleEditButtonClick() {
  profileEditModal.classList.add(".modal__opened");
}

if (profileEditButton) {
  profileEditButton.addEventListener("click", handleEditButtonClick);
}

const previewModal = new ModalWithImage("#modal-preview");
previewModal.setEventListeners();

function handleAddCardCreate(inputValues) {
  //  const name = data.title;
  //  const link = data.link;
  addModal.setModalLoad(true);
  api
    .createCard(inputValues)
    .then((data) => {
      const cardEl = renderCard(data);
      section.addItem(cardEl);
      addModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addModal.setModalLoad(false);
    });
}

function handleAvatarSubmit(url) {
  profileAvatarPopup.setModalLoad(true);
  api
    .updateUserAvatar(url)
    .then((data) => {
      userInfo.setAvatar(data);
      profileAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileAvatarPopup.setModalLoad(false);
    });
}

function handleDeleteCard(addCard) {
  cardsDeletePopup.open();
  cardsDeletePopup.setSubmitAction(() => {
    api
      .deleteCard(addCard._data._id)
      .then(() => {
        addCard.handleDeleteButton();
        cardsDeletePopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardsDeletePopup.setModalLoad(false, "Yes");
      });
  });
}

function handleLike(addCard) {
  if (addCard.isLiked) {
    api
      .dislikeCard(addCard.id)
      .then((data) => {
        addCard.isLiked(false);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(addCard.id)
      .then((data) => {
        addCard.isLiked(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

const cardsDeletePopup = new ModalWithConfirmation({
  modalSelector: "#modal-delete",
});

cardsDeletePopup.setEventListeners();

const cardsConfirmDeleteModal = new ModalWithConfirmation({
  modalSelector: "#modal-delete",
});
cardsConfirmDeleteModal.setSubmitAction(() => {
  cardsConfirmDeleteModal.setModalLoad(true);
  api
    .deleteCard(Card)
    .then(() => {
      cardElement.handleDeleteCard();
      cardsConfirmDeleteModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      cardsConfirmDeleteModal.setModalLoad(false, "Yes");
    });
});

/*    Event Listeners    */
profileAddButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileName.value = userData.name.trim();
  profileDescriptionInput.value = userData.job.trim();
  editFormValidator.resetValidation();
  editModal.open();
});

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addModal.open();
});

function handleImageClick(name, link) {
  previewImageModal.open({ name, link });
}
