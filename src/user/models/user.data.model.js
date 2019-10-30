class UserData {
  constructor(username, email, password, salt) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.salt = salt;
  }
}

export default UserData;
