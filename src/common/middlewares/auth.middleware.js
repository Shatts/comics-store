import { UnauthorizedException } from '../models/http-exception.model';
import TokenService from '../../auth/services/token.service';

const tokenService = new TokenService();

export function authMiddleware(req, res, next) {
  const token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) {
    throw new UnauthorizedException('No access token was provided.');
  }

  req.user = tokenService.verifyToken(token);
  next();
}
