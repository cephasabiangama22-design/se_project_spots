import Api from "../utils/Api.js";

import "./index.css";

import {
  settings,
  enableValidation,
  resetValidation,
  disabledButton,
} from "../scripts/validation.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8c9f7ee2-d55e-4acb-a562-ebd391db8148",
    "Content-Type": "application/json",
  },
});

// editProfile form
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);
const editProfileSubmitBtn =
  editProfileModal.querySelector(".modal__submit-btn");

// newpost pop form
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const newPostImageLinkInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionTypeInput = newPostModal.querySelector(
  "#caption-type-input",
);

const previewModal = document.querySelector("#preview-modal");
const modalImageEl = previewModal.querySelector(".modal__image");
const modalTitlePreview = previewModal.querySelector(".modal__title");
const modalCloseBtnPreview = previewModal.querySelector(".modal__close-btn");

//Delete form elements

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector("#delete-form");
const deleteCancelBtn = deleteForm.querySelector(".modal__cancel-btn");
const deleteCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteSubmitBtn = deleteForm.querySelector(".modal__delete-btn");

//Profile

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");

//Profile Avatar form
const avatarModalEl = document.querySelector("#avatar-modal");
const editprofileAvatarCloseBtn =
  avatarModalEl.querySelector(".modal__close-btn");
const avatarInput = avatarModalEl.querySelector("#avatar-input");
const avatarForm = avatarModalEl.querySelector(".modal__form");
const avatarsubmitabtn = avatarModalEl.querySelector(".modal__submit-btn");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

let selectedCard, selectedCardId;

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    console.log(cards);
    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;

    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardImageEl.addEventListener("click", () => {
    modalImageEl.src = data.link;
    modalImageEl.alt = data.name;
    modalTitlePreview.textContent = data.name;

    openModal(previewModal);
  });

  cardLikeBtn.classList.toggle("card__like-btn_active", data.isLiked);
  cardLikeBtn.addEventListener("click", () => {
    const isLiked = cardLikeBtn.classList.contains("card__like-btn_active");

    const likeRequest = isLiked
      ? api.unlikeCard(data._id)
      : api.likeCard(data._id);

    likeRequest
      .then((updatedCard) => {
        cardLikeBtn.classList.toggle(
          "card__like-btn_active",
          updatedCard.isLiked,
        );
      })
      .catch(console.error);
  });

  cardDeleteBtn.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  return cardElement;
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;

  const inputList = [editProfileNameInput, editProfileDescriptionInput];

  resetValidation(editProfileForm, inputList, settings);

  openModal(editProfileModal);
});
editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

profileAvatarBtn.addEventListener("click", function () {
  openModal(avatarModalEl);
});

editprofileAvatarCloseBtn.addEventListener("click", function () {
  closeModal(avatarModalEl);
});

deleteCancelBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

deleteCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const defaultText = deleteSubmitBtn.textContent;
  deleteSubmitBtn.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      deleteSubmitBtn.textContent = defaultText;
    });
}
deleteForm.addEventListener("submit", handleDeleteSubmit);

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const defaultText = editProfileSubmitBtn.textContent;
  editProfileSubmitBtn.textContent = "Saving...";
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((userInfo) => {
      profileNameEl.textContent = userInfo.name;
      profileDescriptionEl.textContent = userInfo.about;

      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      editProfileSubmitBtn.textContent = defaultText;
    });
}

avatarForm.addEventListener("submit", handleEditAvatarSubmit);

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  const defaultText = avatarSubmitBtn.textContent;
  avatarSubmitBtn.textContent = "Saving...";

  api
    .editAvatar(avatarInput.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModalEl);
    })
    .catch(console.error)
    .finally(() => {
      avatarSubmitBtn.textContent = defaultText;
    });
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const defaultText = newPostSubmitBtn.textContent;
  newPostSubmitBtn.textContent = "Saving...";

  api
    .addCard({
      name: newPostCaptionTypeInput.value,
      link: newPostImageLinkInput.value,
    })
    .then((card) => {
      const cardElement = getCardElement(card);

      cardsList.prepend(cardElement);
      closeModal(newPostModal);
      newPostForm.reset();
      disabledButton(newPostSubmitBtn, settings);
    })
    .catch(console.error)
    .finally(() => {
      newPostSubmitBtn.textContent = defaultText;
    });
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

[editProfileModal, newPostModal, previewModal, deleteModal].forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(modal);
    }
  });
});

modalCloseBtnPreview.addEventListener("click", () => {
  closeModal(previewModal);
});
enableValidation(settings);
