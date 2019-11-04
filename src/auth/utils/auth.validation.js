import checkAPIs from 'express-validator';
import CustomErrorsEnum from '../../common/models/custom-error.enum.js';

const { body } = checkAPIs;

export const refreshTokenValidation = [
  body('refreshToken')
    .not()
    .isEmpty()
    .withMessage(CustomErrorsEnum.isEmpty)
    .isString()
    .withMessage(CustomErrorsEnum.isString),
];

export const changePasswordValidation = [
  body('newPassword')
    .not()
    .isEmpty()
    .withMessage(CustomErrorsEnum.isEmpty)
    .isString()
    .withMessage(CustomErrorsEnum.isString),
];

export const forgotPasswordValidation = [
  body('email')
    .not()
    .isEmpty()
    .withMessage(CustomErrorsEnum.isEmpty)
    .isEmail()
    .withMessage(CustomErrorsEnum.isEmail),
];
