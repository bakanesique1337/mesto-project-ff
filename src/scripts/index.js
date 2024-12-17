import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, handleDeleteCard, handleLikeCard} from "../components/cards.js";
import {
  handleCloseModal,
  handleOpenModal,
  handleOverlayClick,
} from "../components/modal.js";

const placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditCard = document.querySelector('.popup_type_edit');

const formEditProfileElement = popupEditCard.querySelector('.popup__form');
const nameInput = formEditProfileElement.querySelector('.popup__input_type_name');
const jobInput = formEditProfileElement.querySelector('.popup__input_type_description');
const modalCloseButtons = document.querySelectorAll('.popup__close');

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

  const newCard = createCard(card, cardTemplate, handleDeleteCard, handleLikeCard);
  addImageModalListener(newCard);
  placesList.prepend(newCard);

  handleCloseModal();
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  handleCloseModal(event.target.closest('.popup'));
}

function createModalImage(image, description) {

  popupImageElement.src = image.src;
  popupImageElement.alt = image.alt;

  popupCaptionElement.textContent = description.textContent;

  return popupImage;
}

function addImageModalListener(card) {
  const cardImage = card.querySelector('.card__image');
  const cardDescription = card.querySelector('.card__description');
  cardImage.addEventListener('click', () => {
    const popup = createModalImage(cardImage, cardDescription);
    handleOpenModal(popup);
  });
}

function fillEditProfileModalFields(name, job, title, description) {
  name.value = title.textContent;
  job.value = description.textContent;
}

function resetNewCardModal(modal) {
  modal.querySelector('.popup__input_type_card-name').value = '';
  modal.querySelector('.popup__input_type_url').value = '';
}

function resetImageModal(modal) {
  const modalImage = modal.querySelector('.popup__image');
  modalImage.src = '';
  modalImage.alt = '';
  modal.querySelector('.popup__caption').textContent = '';
}

initialCards.forEach(card => {
  const cardItem = createCard(card, cardTemplate, handleDeleteCard, handleLikeCard);

  addImageModalListener(cardItem);
  placesList.append(cardItem);
});

addCardButton.addEventListener('click', () => {
  handleOpenModal(popupNewCard);
});
editProfileButton.addEventListener('click', () => {
  fillEditProfileModalFields(nameInput, jobInput, profileTitle, profileDescription);
  handleOpenModal(popupEditCard);
})

formCreateNewCardElement.addEventListener('submit', (event) => {
  const formParentModal = formCreateNewCardElement.closest('.popup');
  handleCardFormSubmit(event);
  handleCloseModal(formParentModal);
  resetNewCardModal(formParentModal);
});
formEditProfileElement.addEventListener('submit', (event) => {
  const formParentModal = formCreateNewCardElement.closest('.popup');
  handleProfileFormSubmit(event);
  handleCloseModal(formParentModal);
});

modalCloseButtons.forEach((element) => {
  element.addEventListener('click', () => {
    const parentModal = element.closest('.popup');
    handleCloseModal(parentModal);
    if (parentModal.classList.contains('popup_type_new-card')) {
      resetNewCardModal(parentModal);
    }
    if (parentModal.classList.contains('popup_type_image')) {
      resetImageModal(parentModal);
    }
  })
});

popupNewCard.addEventListener('click', (event) => handleOverlayClick(event, popupNewCard));
popupEditCard.addEventListener('click', (event) => handleOverlayClick(event, popupEditCard))
popupImage.addEventListener('click', (event) => handleOverlayClick(event, popupImage))

