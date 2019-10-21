import bcrypt from 'bcrypt';
import userService from '../../user/services/user.service.js';
import { UnauthorizedException } from '../../common/models/http-exception.model.js';
import Authorization from '../models/authorization.model.js';
import TokenGenerator from './token.generator.service.js';
import TokenType from '../models/token.type.enum.js';
import { tokenExpirationInMilliSec, refreshTokenExpirationInMilliSec } from '../models/token.config.js';

const tokenGenerator = new TokenGenerator();
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

    const userId = user._id.toString();
    const refreshToken = await tokenGenerator.generateToken(userId, TokenType.REFRESH_TOKEN);
    const accessToken = await tokenGenerator.generateToken(userId, TokenType.ACCESS_TOKEN);

    await this.updateCredentialsWithRefreshToken(userId, refreshToken);

    return new Authorization(accessToken, tokenExpirationInMilliSec, refreshToken);
  }

  // TODO: Check if we add few refreshTokens
  async updateCredentialsWithRefreshToken(userId, refreshToken) {
    const expirationDate = new Date(Date.now() + Number(refreshTokenExpirationInMilliSec));
    return userService.patch(userId, {
      refreshTokens: [{
        token: refreshToken,
        expirationDate,
      }],
    });
  }

  async updateTokens(refreshToken) {
    //https://gist.github.com/zmts/802dc9c3510d79fd40f9dc38a12bccfc
    //https://stackoverflow.com/questions/51292406/jwt-check-if-token-expired
    const decodedToken = await tokenGenerator.decodeToken(refreshToken);
    const userId = decodedToken.id;

    const user = await userService.getOne(userId);
    if(refreshToken === user.refreshTokens[0].token && this.isTokenDateExpired(user.refreshTokens[0].expirationDate)) {

    }
    console.log(decodedToken);

  }

  isTokenDateExpired(tokenDate) {
    const tokenExpirationDate = new Date(tokenDate);
    const currentDate = new Date();

    return currentDate > tokenExpirationDate;
  }
  /*
  removeExpiredRefreshToken(userId) {
    this.userService.removeExpiredRefreshTokens(userId);
  } */

}

export default AuthorizationService;
