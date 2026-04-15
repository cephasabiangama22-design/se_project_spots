const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const newpostBtn = document.querySelector(".profile__add-btn");
const newpostModal = document.querySelector("#new-post-modal");
const newpostCloseBtn = newpostModal.querySelector(".modal__close-btn");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});
editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newpostBtn.addEventListener("click", function () {
  newpostModal.classList.add("modal_is-opened");
});

newpostCloseBtn.addEventListener("click", function () {
  newpostModal.classList.remove("modal_is-opened");
});
