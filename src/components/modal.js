export function handleOpenModal(modalContainer) {
  modalContainer.classList.add('popup_is-opened');

  document.addEventListener('keydown', handleEscapeButton);
}

function handleEscapeButton(event, modal) {
  if (event.key === "Escape") {
    handleCloseModal(modal);
  }
}

export function handleOverlayClick(event, modal) {
  if (event.target.classList.contains('popup')) {
    handleCloseModal(modal);
  }
}

export function handleCloseModal(modal) {
  if (modal) {
    modal.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', handleEscapeButton);
  }
}
