import jwt from 'jsonwebtoken';
import { ISSUER } from '../models/token.config.js';
import { AUDIENCE } from '../models/token.config.js';
import { refreshTokenExpirationInMilliSec } from '../models/token.config.js';
import { SECRET_KEY } from '../models/token.config.js';

class TokenGenerator {
  async generateToken(userId, type) {
    const refreshToken = {
      type,
      id: userId,
      iss: ISSUER,
      aud: AUDIENCE,
    };
    return this.signToken(refreshToken, refreshTokenExpirationInMilliSec);
  }

  async signToken(token, expirationInMs) {
    return jwt.sign(token, SECRET_KEY, { expiresIn: expirationInMs });
  }

}

export default TokenGenerator;
