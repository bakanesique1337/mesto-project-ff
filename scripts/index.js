// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function handleDeleteCard(event) {
  const cardToDelete = event.target.closest(".card");
  cardToDelete.remove();
}


// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  const cardItem = createCard(card.name, card.link, handleDeleteCard);
  placesList.append(cardItem);
});
