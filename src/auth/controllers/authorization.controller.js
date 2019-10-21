import AuthorizationService from '../services/authorization.service.js';

const authService = new AuthorizationService();

export async function signIn(req, res, next) {
  const userCredentials = req.body;
  try {
    const tokens = await authService.signIn(userCredentials);
    res.send(tokens);
  } catch (e) {
    next(e);
  }
}

export async function updateTokens(req, res, next) {
  const { refreshToken } = req.body;
  try {
    const tokens = await authService.updateTokens(refreshToken);
    res.send(tokens);
  } catch (e) {
    next(e);
  }
}
