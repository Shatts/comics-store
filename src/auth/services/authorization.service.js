import bcrypt from 'bcrypt';
import userService from '../../user/services/user.service.js';
import { UnauthorizedException } from '../../common/models/http-exception.model.js';
import Authorization from '../models/authorization.model.js';
import TokenType from '../models/token.type.enum.js';
import {
  refreshTokenExpirationInMilliSec,
  tokenExpirationInMilliSec,
} from '../models/token.config.js';
import TokenService from './token.service.js';

class AuthorizationService {

  constructor() {
    this.tokenService = new TokenService();
  }

  async signIn(userCredentials) {
    //TODO: Change the implementation of findByEmail to not throw an error if user was not found
    const user = await userService.findByEmail(userCredentials.email);
    if (!user) {
      throw new UnauthorizedException('Credentials data is not valid.');
    }
    const result = bcrypt.compareSync(userCredentials.password, user.password);
    if (!result) {
      throw new UnauthorizedException('Credentials data is not valid.');
    }

    const generatedTokens = await this.generateAndStoreTokens(user._id.toString());

    return new Authorization(generatedTokens.accessToken, tokenExpirationInMilliSec, generatedTokens.refreshToken);
  }

  async generateAndStoreTokens(userId) {
    const refreshToken = await this.tokenService.generateToken(userId, TokenType.REFRESH_TOKEN);
    const accessToken = await this.tokenService.generateToken(userId, TokenType.ACCESS_TOKEN);

    await this.updateCredentialsWithRefreshToken(userId, refreshToken);

    return {
      refreshToken,
      accessToken,
    };
  }

  async updateCredentialsWithRefreshToken(userId, refreshToken) {
    const expirationDate = new Date(Date.now() + Number(refreshTokenExpirationInMilliSec));
    return userService.patch(userId, {
      refreshToken: {
        token: refreshToken,
        expirationDate,
      },
    });
  }

  async updateTokens(refreshToken) {
    const decodedToken = await this.tokenService.verifyToken(refreshToken);
    let user;

    //TODO: Change not to throw exception
    try {
      user = await userService.getOne(decodedToken.id);
    } catch (e) {
      throw new UnauthorizedException('The token is expired or invalid.');
    }

    if (user.refreshToken.token !== refreshToken) {
      throw new UnauthorizedException('The token is expired or invalid.');
    }

    const generatedTokens = await this.generateAndStoreTokens(decodedToken.id);

    return new Authorization(generatedTokens.accessToken, tokenExpirationInMilliSec, generatedTokens.refreshToken);
  }
}

export default AuthorizationService;
