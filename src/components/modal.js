export function openModal(modalContainer) {
  modalContainer.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

function closeByEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

export function closeModal(modal) {
  if (modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
  }
}
