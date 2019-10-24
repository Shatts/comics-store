class UserData {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    // toDO: maybe move password encryption here
    this.password = password;
  }
}

export default UserData;
