import express from 'express';
import { validationMiddleware } from '../../common/middlewares/validation.middleware.js';
import { bodyUserCredentialsValidation, bodyUserValidation } from '../../user/utils/user.validation.js';
import { registerUser } from '../controllers/registration.controller.js';
import { signIn } from '../controllers/authorization.controller.js';
import { refreshTokenValidation } from '../utils/auth.validation.js';
import { updateTokens } from '../controllers/authorization.controller.js';

const authRouter = express.Router();

authRouter.post('/register', validationMiddleware(bodyUserValidation), registerUser);
authRouter.post('/login', validationMiddleware(bodyUserCredentialsValidation), signIn);
authRouter.post('/refresh-token', validationMiddleware(refreshTokenValidation), updateTokens);
//authRouter.post('/change-password', validationMiddleware());
//authRouter.post('/forgot-password', );
//authRouter.post('/logout', );
//https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8

export default authRouter;
