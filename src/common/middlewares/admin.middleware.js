import { UnauthorizedException } from '../models/http-exception.model';
import TokenService from '../../auth/services/token.service';
import { RolesEnum } from '../../user/models/user.helper';

const tokenService = new TokenService();

export function adminMiddleware(req, res, next) {
  const token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) {
    throw new UnauthorizedException('No access token was provided.');
  }

  const user = tokenService.verifyToken(token);
  if (user.role !== RolesEnum.admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}
