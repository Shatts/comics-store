import jwt from 'jsonwebtoken';
import {
  ISSUER, AUDIENCE, refreshTokenExpirationInMilliSec, SECRET_KEY, tokenExpirationInMilliSec,
} from '../models/token.config.js';
import TokenType from '../models/token.type.enum.js';


class TokenGenerator {
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

  async decodeToken(token) {
    return jwt.decode(token);
  }
}

export default TokenGenerator;
