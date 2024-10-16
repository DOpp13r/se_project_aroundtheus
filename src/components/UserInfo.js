class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    this.setAvatar(avatar);
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src,
    };
  }
}

export default UserInfo;
