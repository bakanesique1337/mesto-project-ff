export function createCard(card, cardTemplate, deleteCard, likeCard, fillImageModal) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;

  const cardImage = cardElement.querySelector('.card__image');
  const {name, link} = card;
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', () => {
    fillImageModal(link, name);
  });

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    likeCard(likeButton);
  });

  return cardElement;
}

export function handleDeleteCard(cardElement) {
  cardElement.remove();
}

export function handleLikeCard(button) {
  button.classList.toggle('card__like-button_is-active');
}
