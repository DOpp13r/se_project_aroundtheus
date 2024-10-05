export default class Api {
  constructor(data) {
    this.baseUrl = data.baseUrl;
    this.headers = data.headers;
  }

  // Method to get initial cards
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  // Method to get user info
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  // Method to update user profile
  updateUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  // Method to update user avatar
  updateUserAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(this._checkResponse);
  }

  // Method to add a new card
  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  // Method to delete a card
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  // Method to like a card
  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  // Method to dislike a card
  dislikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
