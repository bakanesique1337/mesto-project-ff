export function createCard(
  card,
  userId,
  callbacks,
  setCardElementAndIdDelete
) {
  const {
    cardTemplate,
    deleteCardModal,
    openModal,
    handleLikeCard,
    setLike,
    fillImageModal
  } = callbacks;

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;

  const cardImage = cardElement.querySelector('.card__image');
  const cardLikes = cardElement.querySelector('.card__likes-count');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  const {name, _id, link, likes, owner} = card;
  cardImage.src = link;
  cardImage.alt = name;
  cardLikes.textContent = likes.length;

  cardImage.addEventListener('click', () => {
    fillImageModal(link, name);
  });

  if (owner['_id'] === userId) {
    deleteButton.addEventListener('click', () => {
      openModal(deleteCardModal);
      setCardElementAndIdDelete(cardElement, _id);
    });
  } else {
    deleteButton.style.visibility = 'hidden';
  }

  likeButton.addEventListener('click', () => {
    handleLikeCard(likeButton, _id, cardLikes, setLike);
  });

  const userHasLiked = likes.some(like => like['_id'] === userId)
  if (userHasLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  return cardElement;
}

export function handleDeleteCard(
  cardElement,
  deleteCard,
  cardId,
  closeModal,
  deleteCardModal) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      closeModal(deleteCardModal);
    })
    .catch((error) => {
      console.log(`Возникла ошибка при удалении карточки:`, error);
    });
}

export function handleLikeCard(button, cardId, likesCountElement, setLike) {
  const isLiked = button.classList.contains('card__like-button_is-active');

  setLike(cardId, isLiked)
    .then((updatedCard) => {
      button.classList.toggle('card__like-button_is-active');
      likesCountElement.textContent = updatedCard.likes.length;
    })
    .catch((err) => console.log(`Возникла ошибка при установке лайка на сервере: ${err}`));
}
