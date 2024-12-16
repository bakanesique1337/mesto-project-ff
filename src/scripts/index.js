import '../pages/index.css';
import {initialCards} from './cards';
import {createCard, handleDeleteCard, handleLikeCard} from "../components/cards";
import {handleCloseModal, handleOpenModal} from "../components/modal";

export const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

export const addCardButton = document.querySelector('.profile__add-button');
export const editProfileButton = document.querySelector('.profile__edit-button');

export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupEditCard = document.querySelector('.popup_type_edit');

export const formEditProfileElement = popupEditCard.querySelector('.popup__form');
export const nameInput = formEditProfileElement.querySelector('.popup__input_type_name');
export const jobInput = formEditProfileElement.querySelector('.popup__input_type_description');

export const formCreateNewCardElement = popupNewCard.querySelector('.popup__form');
export const cardNameInput = formCreateNewCardElement.querySelector('.popup__input_type_card-name');
export const cardLinkInput = formCreateNewCardElement.querySelector('.popup__input_type_url');

function handleCardFormSubmit(event) {
  event.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const card = {name, link};

  const newCard = createCard(card, handleDeleteCard, handleOpenModal, createModalImage);
  placesList.prepend(newCard);

  handleCloseModal();
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  handleCloseModal();
}

function createModalImage(card) {
  const popupImage = document.querySelector('.popup_type_image');

  const popupImageElement = popupImage.querySelector('.popup__image');
  popupImageElement.src = card.link;
  popupImageElement.alt = card.name;

  const popupCaptionElement = popupImage.querySelector('.popup__caption');
  popupCaptionElement.textContent = card.name;

  return popupImage;
}

initialCards.forEach(card => {
  const cardItem = createCard(card, handleDeleteCard, handleOpenModal, createModalImage, handleLikeCard);
  placesList.append(cardItem);
});

addCardButton.addEventListener('click', () => {
  handleOpenModal(popupNewCard);
});

editProfileButton.addEventListener('click', () => {
  handleOpenModal(popupEditCard);
})

formCreateNewCardElement.addEventListener('submit', handleCardFormSubmit);
formEditProfileElement.addEventListener('submit', handleProfileFormSubmit);

