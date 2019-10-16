import * as bcrypt from 'bcrypt';
import userService from '../../user/services/user.service.js';
import UserData from '../../user/models/user.data.model.js';

class RegistrationService {
  async registerUser(userCredentials) {
    // TODO: Add check for existing email
    const encryptedPassword = await this.createHashedPassword(userCredentials.password);
    const user = new UserData(userCredentials.username, userCredentials.email, encryptedPassword);
    await userService.create(user);
  }

  async createHashedPassword(password) {
    return bcrypt.hash(password, 20);
  }
}

export default RegistrationService;
