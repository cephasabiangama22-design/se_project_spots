const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameinput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfiledescriptioninput = editProfileModal.querySelector(
  "#profile-description-input",
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostImagelinkInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionTypeInput = newPostModal.querySelector(
  "#caption-type-input",
);

const profilenameEl = document.querySelector(".profile__name");
const profiledescriptionEl = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function () {
  editProfileNameinput.value = profilenameEl.textContent;
  editProfileModal.classList.add("modal_is-opened");
  editProfiledescriptioninput.value = profiledescriptionEl.textContent;
});
editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

function handleEditprofilesubmit(evt) {
  evt.preventDefault();
  console.log("submitting");
  profilenameEl.textContent = editProfileNameinput.value;
  profiledescriptionEl.textContent = editProfiledescriptioninput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditprofilesubmit);

function handlenewPostSubmit(evt) {
  evt.preventDefault();
  console.log("#card-image-input");
  console.log("#caption-type-input");
  newPostModal.classList.remove("modal_is-opened");
}

newPostForm.addEventListener("submit", handlenewPostSubmit);
