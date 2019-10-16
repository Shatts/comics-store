import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userService from '../../user/services/user.service';
import { UnauthorizedException } from '../../common/models/http-exception.model.js';
import Authorization from '../models/authorization.model';


dotenv.config();

const SECRET_KEY = process.env.secretKey;

class AuthorizationService {
  async signIn(userCredentials) {
    const user = await userService.findByEmail(userCredentials.email);
    const result = bcrypt.compareSync(userCredentials.password, user.password);
    if (!result) {
      throw new UnauthorizedException('Password is not valid');
    }

    // TODO: Change expiresIn
    const expiresIn = 60 * 60;
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn });
    const refreshToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn * 100 });

    // TODO: Add update method in order to update user model
    // https://gist.github.com/zmts/802dc9c3510d79fd40f9dc38a12bccfc
    // https://medium.com/quick-code/jwt-access-and-refresh-token-with-vapor-3-85a0aee5291b
    //await userService.

    return new Authorization(accessToken, expiresIn, refreshToken);
  }
}

export default AuthorizationService;
