class UserData {
  constructor(username, email, password, salt, role) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.salt = salt;
    this.role = role;
  }
}

export default UserData;
