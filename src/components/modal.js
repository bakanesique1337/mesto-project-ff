import {jobInput, nameInput, profileDescription, profileTitle} from "../scripts";

export function handleOpenModal(modalContainer) {
  switchModalVisibility(modalContainer, 'on');

  if (modalContainer.classList.contains('popup_type_edit')) {
    fillEditProfileModalFields(nameInput, jobInput, profileTitle, profileDescription);
  }

  modalContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
      handleCloseModal();
    }
  })

  window.addEventListener('keydown', handleEscapeButton);
}

function fillEditProfileModalFields(name, job, title, description) {
  name.value = title.textContent;
  job.value = description.textContent;
}

function switchModalVisibility(modal, state) {
  switch (state) {
    case 'on':
      modal.style.visibility = "visible";
      modal.style.opacity = "1.0";
      modal.classList.add('popup_is-opened');
      return;
    case 'off':
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
      modal.classList.remove('popup_is-opened');
      return;
  }
}

function handleEscapeButton(event) {
  if (event.key === "Escape") {
    handleCloseModal();
  }
}

export function handleCloseModal() {
  const modal = document.querySelector('.popup_is-opened');

  if (modal) {
    switchModalVisibility(modal, 'off');

    if (modal.classList.contains('popup_type_new-card')) {
      resetModal(modal, 'card');
    }
    if (modal.classList.contains('popup_type_image')) {
      resetModal(modal, 'image')
    }

    modal.removeEventListener('click', handleCloseModal);
    window.removeEventListener('keydown', handleEscapeButton);
  }
}

function resetModal(modal, type) {
  switch (type) {
    case 'card':
      modal.querySelector('.popup__input_type_card-name').value = '';
      modal.querySelector('.popup__input_type_url').value = '';
      return;
    case 'image':
      const modalImage = modal.querySelector('.popup__image');
      modalImage.src = '';
      modalImage.alt = '';
      modal.querySelector('.popup__caption').textContent = '';
      return;
  }
}
