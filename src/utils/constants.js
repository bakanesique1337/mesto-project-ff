export const placesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const avatarElement = document.querySelector('.profile__image');
export const addCardButton = document.querySelector('.profile__add-button');
export const editProfileButton = document.querySelector('.profile__edit-button');
export const popups = Array.from(document.querySelectorAll('.popup'));
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupEditProfile = document.querySelector('.popup_type_edit');
export const popupUpdateAvatar = document.querySelector('.popup_type_edit-avatar');
export const formUpdateAvatarElement = document.forms['edit-avatar'];
export const avatarUrlInput = formUpdateAvatarElement.querySelector('.popup__input_type_avatar-url')
export const formEditProfileElement = document.forms['edit-profile'];
export const nameInput = formEditProfileElement.querySelector('.popup__input_type_name');
export const jobInput = formEditProfileElement.querySelector('.popup__input_type_description');
export const formCreateNewCardElement = document.forms['new-place'];
export const cardNameInput = formCreateNewCardElement.querySelector('.popup__input_type_card-name');
export const cardLinkInput = formCreateNewCardElement.querySelector('.popup__input_type_url');
export const popupImage = document.querySelector('.popup_type_image');
export const popupImageElement = popupImage.querySelector('.popup__image');
export const popupCaptionElement = popupImage.querySelector('.popup__caption');
export const popupDeleteCard = document.querySelector('.popup_type_delete_card');
export const submitDeleteCardButton = popupDeleteCard.querySelector('.popup__button');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
