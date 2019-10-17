import bcrypt from 'bcrypt';
import userService from '../../user/services/user.service.js';
import { UnauthorizedException } from '../../common/models/http-exception.model.js';
import Authorization from '../models/authorization.model.js';
import TokenGenerator from './token.generator.service.js';
import TokenType from '../models/token.type.enum.js';
import { tokenExpirationInMilliSec } from '../models/token.config.js';

class AuthorizationService {
  async signIn(userCredentials) {
    const user = await userService.findByEmail(userCredentials.email);
    if (!user) {
      throw new UnauthorizedException('Credentials data is not valid.');
    }
    const result = bcrypt.compareSync(userCredentials.password, user.password);
    if (!result) {
      throw new UnauthorizedException('Credentials data is not valid.');
    }

    const tokenGenerator = new TokenGenerator();
    const userId = user._id.toString();
    const refreshToken = await tokenGenerator.generateToken(userId, TokenType.REFRESH_TOKEN);
    const accessToken = await tokenGenerator.generateToken(userId, TokenType.ACCESS_TOKEN);
    // TODO: Add update method in order to update user model

    return new Authorization(accessToken, tokenExpirationInMilliSec, refreshToken);
  }

  /*async updateCredentialsWithRefreshToken(userId, refreshToken) {
    const expirationDate = new Date(Date.now() + Number(REFRESH_TOKEN_EXPIRES_IN));
    await userService.updateRefreshToken(userId, refreshToken, expirationDate);
  }

  removeExpiredRefreshToken(userId) {
    this.userService.removeExpiredRefreshTokens(userId);
  }*/

  async refreshAccessToken(refreshToken) {

  }
}

export default AuthorizationService;
