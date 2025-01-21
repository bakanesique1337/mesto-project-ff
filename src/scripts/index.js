import '../pages/index.css';
import {createCard, handleDeleteCard, handleLikeCard} from "../components/card.js";
import {closeModal, openModal,} from "../components/modal.js";
import {clearValidation, enableValidation} from "./validation";
import {
  addCard,
  deleteCardFromServer,
  getInitialCards,
  getUserInfo,
  setLike,
  updateUserAvatar,
  updateUserInfo
} from "./api";
import {handleSubmit} from "../utils/utils";
import {
  addCardButton,
  avatarElement,
  avatarUrlInput,
  cardLinkInput,
  cardNameInput,
  cardTemplate,
  editProfileButton,
  formCreateNewCardElement,
  formEditProfileElement,
  formUpdateAvatarElement,
  jobInput,
  nameInput,
  placesList,
  popupCaptionElement,
  popupDeleteCard,
  popupEditProfile,
  popupImage,
  popupImageElement,
  popupNewCard,
  popups,
  popupUpdateAvatar,
  profileDescription,
  profileTitle,
  submitDeleteCardButton,
  validationConfig
} from "../utils/constants";

let userId;
let cardElementToDelete;
let cardIdToDelete;

const cardCallbacks = {
  cardTemplate: cardTemplate,
  deleteCardModal: popupDeleteCard,
  deleteCard: handleDeleteCard,
  openModal: openModal,
  handleLikeCard: handleLikeCard,
  setLike: setLike,
  fillImageModal: fillModalImageFields
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    const {name, about, avatar, _id} = user;
    fillProfileWithResponse(name, about, avatar, profileTitle, profileDescription, avatarElement);
    userId = _id;

    Array.from(cards).forEach(cardData => {
      renderCard(cardData);
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
      renderCard(cardData);
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
    return updateUserInfo({name, about})
      .then((userData) => {
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
    return updateUserAvatar({avatar: newUrl})
      .then((userData) => {
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

function renderCard(item, method = "prepend") {
  const cardElement = createCard(item, userId, cardCallbacks, setCardElementAndIdToDelete);
  placesList[method](cardElement);
}

function setCardElementAndIdToDelete(element, id) {
  cardElementToDelete = element;
  cardIdToDelete = id;
}

addCardButton.addEventListener('click', () => {
  clearValidation(formCreateNewCardElement, validationConfig);
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

submitDeleteCardButton.addEventListener('click', () => {
  handleDeleteCard(
    cardElementToDelete,
    deleteCardFromServer,
    cardIdToDelete,
    closeModal,
    popupDeleteCard,
    cardCallbacks,
    submitDeleteCardButton);
});

formCreateNewCardElement.addEventListener('submit', handleCardFormSubmit);
formEditProfileElement.addEventListener('submit', handleProfileFormSubmit);
formUpdateAvatarElement.addEventListener('submit', handleUpdateAvatarSubmit);

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

