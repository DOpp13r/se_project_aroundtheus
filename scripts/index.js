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
const previewImage = document.querySelector(".modal__preview-image");
const previewCloseButton = previewImageModal.querySelector(
  "#modal-close-button"
);
const previewImageCaption = document.querySelector(".modal__image-caption");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/*    Functions   */
function closeProfileModal() {
  profileEditModal.classList.remove("modal_opened");
}

function closeAddCardModal() {
  addCardModal.classList.remove("modal_opened");
}

function closePreviewImageModal() {
  previewImageModal.classList.remove("modal_opened");
}

function openPreviewImageModal() {
  previewImageModal.classList.add("modal_opened");
}
function renderCard(data) {
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
}

function getCardElement(data) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardNameEl = cardElement.querySelector(".cards__name");
  // access Delete button for each card to listen for a click, and delete card
  const deleteButton = cardElement.querySelector(".cards__delete");
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
  previewCloseButton.addEventListener("click", () => closePreviewImageModal());
  // set the path to the image to the link field of the object
  cardImageEl.src = data.link;
  // set the image alt text to the name field of the object
  cardImageEl.alt = data.name;
  // set the card title to the name field of the object, too
  cardNameEl.textContent = data.name;
  // return the ready HTML element with the filled-in data
  return cardElement;
}

/*    Event Handlers    */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeProfileModal();
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
  closeAddCardModal();
  addCardForm.reset();
}

function handlePreviewImage(data) {
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewImageCaption.textContent = data.name;
  openPreviewImageModal();
}

/*    Event Listeners  */
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});
profileCloseButton.addEventListener("click", closeProfileModal);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => {
  addCardModal.classList.add("modal_opened");
});
addCardCloseButton.addEventListener("click", closeAddCardModal);
addCardForm.addEventListener("submit", handleAddCardCreate);

initialCards.forEach((data) => {
  renderCard(data, cardListEl);
});
