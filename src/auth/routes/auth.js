import express from 'express';
import { validationMiddleware } from '../../common/middlewares/validation.middleware.js';
import { bodyUserCredentialsValidation, bodyUserValidation } from '../../user/utils/user.validation.js';
import { registerUser } from '../controllers/registration.controller.js';
import { signIn } from '../controllers/authorization.controller.js';
import { refreshTokenValidation } from '../utils/auth.validation.js';

const authRouter = express.Router();

authRouter.post('/register', validationMiddleware(bodyUserValidation), registerUser);
authRouter.post('/login', validationMiddleware(bodyUserCredentialsValidation), signIn);
authRouter.post('/refresh-token', validationMiddleware(refreshTokenValidation), signIn);
//authRouter.post('/change-password');
//authRouter.post('/forgot-password', );
//authRouter.post('/logout');

export default authRouter;
