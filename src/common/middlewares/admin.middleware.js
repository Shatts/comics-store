import { UnauthorizedException } from '../models/http-exception.model';
import TokenService from '../../auth/services/token.service';
import { RolesEnum } from '../../user/models/user.helper';

const tokenService = new TokenService();

// toDO: you need to have 2 separete middlewares for authentication and for user role check
// toDO: pick better name for middleware. adminOnlyMiddleware? adminOnlyGuard?
//  maybe create unified middleware to handle any role, given as a parameter to middleware?
export function adminMiddleware(req, res, next) {
  // toDO: why you need expect x-access-token here?
  const token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) {
    // toDO: better move error messages to separate variables,
    //  as it will be much easier to extend it with template vars
    //  and code line will not be as long
    throw new UnauthorizedException('No access token was provided.');
  }

  const user = tokenService.verifyToken(token);
  if (user.role !== RolesEnum.admin) {
    // toDO: If you omit this part: `.json({ message: 'Unauthorized' });`
    //  will your response will differ much?
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}
