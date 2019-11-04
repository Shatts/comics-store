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

export async function changePassword(req, res, next) {
  const { user } = req;
  const { newPassword } = req.body;
  try {
    await authService.changePassword(user, newPassword);
    res.send(204);
  } catch (e) {
    next(e);
  }
}

export async function forgotPassword(req, res, next) {
  const { email } = req.body;
  try {
    const generatedToken = await authService.forgotPassword(email);
    res.send(generatedToken);
  } catch (e) {
    next(e);
  }
}

export async function resetPassword(req, res, next) {
  const { password } = req.body;
  const { id, token } = req.params;

  try {
    await authService.resetPassword(id, token, password);
    res.send(204);
  } catch (e) {
    next(e);
  }
}
