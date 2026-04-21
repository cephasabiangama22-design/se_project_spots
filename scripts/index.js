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

const newpostBtn = document.querySelector(".profile__add-btn");
const newpostModal = document.querySelector("#new-post-modal");
const newpostCloseBtn = newpostModal.querySelector(".modal__close-btn");
const newpostImagelinkinput = newpostModal.querySelector("#card-image-input");
const newpostCaptionTypeinput = newpostModal.querySelector(
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

newpostBtn.addEventListener("click", function () {
  newpostModal.classList.add("modal_is-opened");
});

newpostCloseBtn.addEventListener("click", function () {
  newpostModal.classList.remove("modal_is-opened");
});

function handleEditprofilesubmit(evt) {
  evt.preventDefault();
  console.log("submitting");
  profilenameEl.textContent = editProfileNameinput.value;
  profiledescriptionEl.textContent = editProfiledescriptioninput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditprofilesubmit);
