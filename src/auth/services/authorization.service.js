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
import { PasswordService } from './password.service';
import * as jwt from 'jsonwebtoken';

class AuthorizationService {
  constructor() {
    this.tokenService = new TokenService();
    this.passwordService = new PasswordService();
  }

  async signIn(userCredentials) {
    const user = await userService.findByEmail(userCredentials.email);
    if (!user) {
      throw new UnauthorizedException('Credentials data is not valid.');
    }
    const result = bcrypt.compareSync(userCredentials.password, user.password);
    if (!result) {
      throw new UnauthorizedException('Credentials data is not valid.');
    }

    const generatedTokens = await this.generateAndStoreTokens({
      userId: user._id.toString(),
      role: user.role
    });

    return new Authorization(generatedTokens.accessToken, tokenExpirationInMilliSec, generatedTokens.refreshToken);
  }

  async generateAndStoreTokens(dataToStore) {
    const refreshToken = await this.tokenService.generateToken(dataToStore, TokenType.REFRESH_TOKEN);
    const accessToken = await this.tokenService.generateToken(dataToStore, TokenType.ACCESS_TOKEN);

    await this.updateCredentialsWithRefreshToken(dataToStore, refreshToken);

    return {
      refreshToken,
      accessToken,
    };
  }

  async updateCredentialsWithRefreshToken(dataToStore, refreshToken) {
    const expirationDate = new Date(Date.now() + Number(refreshTokenExpirationInMilliSec));
    return userService.patch(dataToStore.userId, {
      refreshToken: {
        token: refreshToken,
        expirationDate,
      },
    });
  }

  async updateTokens(refreshToken) {
    const decodedToken = await this.tokenService.verifyToken(refreshToken);
    const user = await userService.getOne(decodedToken.id);

    if (!user || user.refreshToken.token !== refreshToken) {
      throw new UnauthorizedException('The token is expired or invalid.');
    }

    const generatedTokens = await this.generateAndStoreTokens(decodedToken.id);

    return {
      accessToken: generatedTokens.accessToken,
      expirationTime: tokenExpirationInMilliSec,
      refreshToken: generatedTokens.refreshToken,
    };
  }

  async changePassword(user, newPassword) {
    const userData = await userService.getOne(user.id);
    const generatedSalt = this.passwordService.generateSalt();
    const encryptedPassword = this.passwordService.createHashedPassword(newPassword, generatedSalt);
    await userService.patch(userData.id, {
      password: encryptedPassword,
      salt: generatedSalt,
    });
  }

  async forgotPassword(email) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email is not valid.');
    }

    const secret = `${user.password} - ${user.createdAt}`;
    // TODO: Add this to token.service
    // TODO: Add sending to email
    return jwt.sign({ userId: user._id }, secret, { expiresIn: 3600 });
  }

  async resetPassword(id, token, password) {
    const user = await userService.getOne(id);
    if (!user) {
      throw new UnauthorizedException('User is not valid.');
    }
    const secret = `${user.password} - ${user.createdAt}`;
    const payload = jwt.decode(token, secret);
    if (payload.userId !== user._id) {
      throw new UnauthorizedException('User is not valid.');
    }

    const generatedSalt = this.passwordService.generateSalt();
    const encryptedPassword = this.passwordService.createHashedPassword(password, generatedSalt);
    return userService.patch(id, {
      password: encryptedPassword,
      salt: generatedSalt,
    });
  }
}

export default AuthorizationService;
