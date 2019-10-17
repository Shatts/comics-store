import checkAPIs from 'express-validator';
import CustomErrorsEnum from '../../common/models/custom-error.enum.js';

const { body } = checkAPIs;

export const bodyUserValidation = [
  body('username')
    .not()
    .isEmpty()
    .withMessage(CustomErrorsEnum.isEmpty)
    .isString()
    .withMessage(CustomErrorsEnum.isString),
  body('email')
    .not()
    .isEmpty()
    .withMessage(CustomErrorsEnum.isEmpty)
    .isEmail()
    .withMessage(CustomErrorsEnum.isEmail),
  body('password')
    .not()
    .isEmpty()
    .withMessage(CustomErrorsEnum.isEmpty)
    .isString()
    .withMessage(CustomErrorsEnum.isString),
];

export const bodyUserCredentialsValidation = [
  body('email')
    .not()
    .isEmpty()
    .withMessage(CustomErrorsEnum.isEmpty)
    .isEmail()
    .withMessage(CustomErrorsEnum.isEmail),
  body('password')
    .not()
    .isEmpty()
    .withMessage(CustomErrorsEnum.isEmpty)
    .isString()
    .withMessage(CustomErrorsEnum.isString),
];
