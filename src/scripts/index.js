import '../pages/index.css';
import {createCard, handleDeleteCard, handleLikeCard} from "../components/card.js";
import {
  closeModal,
  openModal,
} from "../components/modal.js";
import {
  clearValidation,
  enableValidation
} from "./validation";
import {
  addCard,
  setLike,
  deleteCardFromServer,
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar
} from "./api";
import {handleSubmit} from "./utils";

const placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const avatarElement = document.querySelector('.profile__image');

const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

const popups = Array.from(document.querySelectorAll('.popup'));
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupUpdateAvatar = document.querySelector('.popup_type_edit-avatar');

const formUpdateAvatarElement = popupUpdateAvatar.querySelector('.popup__form');
const avatarUrlInput = formUpdateAvatarElement.querySelector('.popup__input_type_avatar-url')

const formEditProfileElement = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfileElement.querySelector('.popup__input_type_name');
const jobInput = formEditProfileElement.querySelector('.popup__input_type_description');

const formCreateNewCardElement = popupNewCard.querySelector('.popup__form');
const cardNameInput = formCreateNewCardElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = formCreateNewCardElement.querySelector('.popup__input_type_url');

const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');

const popupDeleteCard = document.querySelector('.popup_type_delete_card');

let userId;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    const {name, about, avatar, _id} = user;
    fillProfileWithResponse(name, about, avatar, profileTitle, profileDescription, avatarElement);
    userId = _id;

    Array.from(cards).forEach(card => {
      const cardItem = createCard(
        card,
        userId,
        cardTemplate,
        handleDeleteCard,
        deleteCardFromServer,
        openModal,
        closeModal,
        popupDeleteCard,
        handleLikeCard,
        setLike,
        fillModalImageFields
      );
      placesList.append(cardItem);
    });
  })
  .catch((error) => {
    console.log(`Произошла ошибка при загрузке информации пользователя и листа карточек: ${error}`);
  });

const fillProfileWithResponse = (name, about, avatarUrl, title, description, avatarElement) => {
  title.textContent = name;
  description.textContent = about;
  avatarElement.style.backgroundImage = `url(${avatarUrl})`;
}

const handleCardFormSubmit = (event) => {
  event.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const likes = 0;
  const owner = userId;
  const card = {name, link, likes, owner};

  function makeRequest() {
    return addCard(card).then((cardData) => {
      const newCard = createCard(
        cardData,
        userId,
        cardTemplate,
        handleDeleteCard,
        deleteCardFromServer,
        openModal,
        closeModal,
        popupDeleteCard,
        handleLikeCard,
        setLike,
        fillModalImageFields
      );

      placesList.prepend(newCard);
      formCreateNewCardElement.reset();

      closeModal(popupNewCard);
    });
  }

  handleSubmit(makeRequest, event);
}

const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const about = jobInput.value;

  function makeRequest() {
    return updateUserInfo({name, about}).then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;

      closeModal(popupEditProfile);
    });
  }

  handleSubmit(makeRequest, event);
}

const handleUpdateAvatarSubmit = (event) => {
  event.preventDefault();

  const newUrl = avatarUrlInput.value;

  function makeRequest() {
    return updateUserAvatar({avatar: newUrl}).then((userData) => {
      avatarElement.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(popupUpdateAvatar);
    })
  }

  handleSubmit(makeRequest, event);
}

function fillModalImageFields(url, name) {
  popupImageElement.src = url;
  popupImageElement.alt = name;
  popupCaptionElement.textContent = name;

  openModal(popupImage);
}

function fillEditProfileModalFields(name, job, title, description) {
  name.value = title.textContent;
  job.value = description.textContent;
}

addCardButton.addEventListener('click', () => {
  openModal(popupNewCard);
});
editProfileButton.addEventListener('click', () => {
  clearValidation(formEditProfileElement, validationConfig);
  fillEditProfileModalFields(nameInput, jobInput, profileTitle, profileDescription);
  openModal(popupEditProfile);
});
avatarElement.addEventListener('click', () => {
  clearValidation(formUpdateAvatarElement, validationConfig);
  openModal(popupUpdateAvatar);
});

formCreateNewCardElement.addEventListener('submit', (event) => {
  handleCardFormSubmit(event);
});
formEditProfileElement.addEventListener('submit', (event) => {
  handleProfileFormSubmit(event);
});
formUpdateAvatarElement.addEventListener('submit', (event) => {
  handleUpdateAvatarSubmit(event);
})

popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeModal(popup));
  popup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget) {
      closeModal(popup);
    }
  });
  popup.classList.add('popup_is-animated');
});

enableValidation(validationConfig);

