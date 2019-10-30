import userService from '../../user/services/user.service.js';
import UserData from '../../user/models/user.data.model.js';
import { ConflictException } from '../../common/models/http-exception.model.js';
import { PasswordService } from './password.service.js';

class RegistrationService {
  constructor() {
    this.passwordService = new PasswordService();
  }

  async registerUser(userCredentials) {
    const user = await userService.findByEmail(userCredentials.email);
    if (user) {
      throw new ConflictException('User with this email address already exists.');
    }
    const generatedSalt = this.passwordService.generateSalt();
    const encryptedPassword = this.passwordService.createHashedPassword(userCredentials.password, generatedSalt);
    const userToCreate = new UserData(userCredentials.username, userCredentials.email, encryptedPassword, generatedSalt);
    await userService.create(userToCreate);
  }
}

export default RegistrationService;
