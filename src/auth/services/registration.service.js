import bcrypt from 'bcrypt';
import userService from '../../user/services/user.service.js';
import UserData from '../../user/models/user.data.model.js';

class RegistrationService {
  async registerUser(userCredentials) {
    // TODO: Add check for existing email
    const encryptedPassword = await this.createHashedPassword(userCredentials.password);
    const user = new UserData(userCredentials.username, userCredentials.email, encryptedPassword);
    await userService.create(userCredentials);
  }

  async createHashedPassword(password) {
    // toDO: make salt dynamic
    return bcrypt.hashSync(password, 15);
  }
}

export default RegistrationService;
