import bcrypt from 'bcrypt';

export class PasswordService {
  generateSalt() {
    return bcrypt.genSaltSync();
  }

  createHashedPassword(password, salt) {
    return bcrypt.hashSync(password, salt);
  }
}
