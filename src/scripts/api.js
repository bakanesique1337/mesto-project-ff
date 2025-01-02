const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
  headers: {
    authorization: '1d7e0b7c-fcbb-43a8-a6f9-25005dd0edde',
    'Content-Type': 'application/json'
  }
}

export const getResponseWithCheck = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Произошла ошибка в promise: ${response.status}`);
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then((getResponseWithCheck));
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then((getResponseWithCheck));
}

export const updateUserInfo = (payload) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(payload)
  })
    .then((getResponseWithCheck));
}

export const addCard = (payload) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(payload)
  })
    .then((getResponseWithCheck));
}

export const deleteCardFromServer = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((getResponseWithCheck));
}

export const setLike = (id, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers
  }).then((getResponseWithCheck));
}

export const updateUserAvatar = (payload) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(payload)
  }).then((getResponseWithCheck));
}
