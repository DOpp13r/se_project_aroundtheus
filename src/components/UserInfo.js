class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  setUserInfo({ name, description }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = description;
  }
  setAvatar({ avatar }) {
    this._avatarElement.src = avatar;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }
}

export default UserInfo;
