import jwt from 'jsonwebtoken';
import {
  AUDIENCE,
  ISSUER,
  refreshTokenExpirationInMilliSec,
  SECRET_KEY,
  tokenExpirationInMilliSec,
} from '../models/token.config.js';
import TokenType from '../models/token.type.enum.js';
import { UnauthorizedException } from '../../common/models/http-exception.model.js';


class TokenService {
  async generateToken(userId, type) {
    const token = {
      type,
      id: userId,
      iss: ISSUER,
      aud: AUDIENCE,
    };
    const expiration = type === TokenType.ACCESS_TOKEN ? tokenExpirationInMilliSec : refreshTokenExpirationInMilliSec;

    return this.signToken(token, expiration);
  }

  async signToken(token, expirationInMs) {
    return jwt.sign(token, SECRET_KEY, { expiresIn: expirationInMs });
  }

  async verifyToken(token) {
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (e) {
      throw new UnauthorizedException('The token is expired or invalid.');
    }

    return decodedToken;
  }
}

export default TokenService;
