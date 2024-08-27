class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetch(url, options = {}) {
    return fetch(`${this._baseUrl}${url}`, {
      ...options,
      headers: {
        ...this._headers,
        ...options.headers,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        throw err;
      });
  }

  getInitialCards() {
    return this._fetch("/cards");
  }

  getUserInfo() {
    return this._fetch("/users/me");
  }

  updateUserProfile(name, about) {
    return this._fetch("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  updateUserAvatar(avatar) {
    return this._fetch("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  addCard(name, link) {
    return this._fetch("/cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  dislikeCard(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }
}

/*  loadUserAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f5b79730-6f48-4bb4-b0bf-8df04866d781",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((userInfo) => {
    console.log(userInfo);
  })
  .catch((err) => {
    console.error(err);
  });
