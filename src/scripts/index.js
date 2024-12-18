import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, handleDeleteCard, handleLikeCard} from "../components/card.js";
import {
  closeModal,
  openModal,
} from "../components/modal.js";

const placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

const popups = document.querySelectorAll('.popup');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');

const formEditProfileElement = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfileElement.querySelector('.popup__input_type_name');
const jobInput = formEditProfileElement.querySelector('.popup__input_type_description');

const formCreateNewCardElement = popupNewCard.querySelector('.popup__form');
const cardNameInput = formCreateNewCardElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = formCreateNewCardElement.querySelector('.popup__input_type_url');

const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');


function handleCardFormSubmit(event) {
  event.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const card = {name, link};

  const newCard = createCard(card, cardTemplate, handleDeleteCard, handleLikeCard, fillModalImageFields);
  placesList.prepend(newCard);

  closeModal(popupNewCard);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closeModal(popupEditProfile);
}

function fillModalImageFields(url, altMessage, description) {
  popupImageElement.src = url;
  popupImageElement.alt = altMessage;

  popupCaptionElement.textContent = description;

  openModal(popupImage);
}

function fillEditProfileModalFields(name, job, title, description) {
  name.value = title.textContent;
  job.value = description.textContent;
}

function resetNewCardModal() {
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

initialCards.forEach(card => {
  const cardItem = createCard(card, cardTemplate, handleDeleteCard, handleLikeCard, fillModalImageFields);
  placesList.append(cardItem);
});

addCardButton.addEventListener('click', () => {
  openModal(popupNewCard);
});
editProfileButton.addEventListener('click', () => {
  fillEditProfileModalFields(nameInput, jobInput, profileTitle, profileDescription);
  openModal(popupEditProfile);
})

formCreateNewCardElement.addEventListener('submit', (event) => {
  handleCardFormSubmit(event);
  closeModal(popupNewCard);
  resetNewCardModal(popupNewCard);
});
formEditProfileElement.addEventListener('submit', (event) => {
  handleProfileFormSubmit(event);
  closeModal(popupEditProfile);
});

popups.forEach((popup) => {  // Для каждого попапа делаем следуюущее
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeModal(popup)); // Устанавливаем слушатель на крестик
  popup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget) {    // Устанавливаем слушатель оверлея
      closeModal(popup);
    }
  });
  popup.classList.add('popup_is-animated'); // Добавляем модификатор для плавного открытия и закрытия попапов
});
