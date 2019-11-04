import express from 'express';
import { validationMiddleware } from '../../common/middlewares/validation.middleware.js';
import {
  bodyUserCredentialsValidation,
  bodyUserValidation,
} from '../../user/utils/user.validation.js';
import { registerUser } from '../controllers/registration.controller.js';
import {
  changePassword,
  forgotPassword,
  resetPassword,
  signIn,
  updateTokens,
} from '../controllers/authorization.controller.js';
import {
  changePasswordValidation,
  forgotPasswordValidation,
  refreshTokenValidation,
} from '../utils/auth.validation.js';
import { authMiddleware } from '../../common/middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/register', validationMiddleware(bodyUserValidation), registerUser);
authRouter.post('/login', validationMiddleware(bodyUserCredentialsValidation), signIn);
authRouter.post('/refresh-token', validationMiddleware(refreshTokenValidation), updateTokens);
authRouter.post('/change-password', authMiddleware, validationMiddleware(changePasswordValidation), changePassword);
authRouter.post('/forgot-password', validationMiddleware(forgotPasswordValidation), forgotPassword);
authRouter.post('/reset-password/:id/:token', validationMiddleware(changePasswordValidation), resetPassword);

export default authRouter;
