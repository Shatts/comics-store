import { CustomErrorsEnum } from '../custom-error.js';
import { comicsTypeEnum } from '../../models/comics.helper.js';
import checkAPIs from 'express-validator';

const { body } = checkAPIs;

//TODO: Add validation to nested object gallery
//TODO: Add validation to string of arrays
export const bodyComicsValidation = [
    body('name')
        .not().isEmpty().withMessage(CustomErrorsEnum.isEmpty)
        .isString().withMessage(CustomErrorsEnum.isString),
    body('price')
        .not().isEmpty().withMessage(CustomErrorsEnum.isEmpty)
        .isNumeric().withMessage(CustomErrorsEnum.isNumeric)
        .not().isString().withMessage(CustomErrorsEnum.notString),
    body('onSaleDate')
        .not().isEmpty().withMessage(CustomErrorsEnum.isEmpty)
        .isISO8601(),
    body('coverImage')
        .not().isEmpty().withMessage(CustomErrorsEnum.isEmpty)
        .isString().withMessage(CustomErrorsEnum.isString),
    body('type')
        .not().isEmpty().withMessage(CustomErrorsEnum.isEmpty)
        .isString().withMessage(CustomErrorsEnum.isString)
        .isIn([comicsTypeEnum.comicBook, comicsTypeEnum.graphicNovel])
        .withMessage(`${CustomErrorsEnum.isIn} ${comicsTypeEnum.comicBook} or ${comicsTypeEnum.graphicNovel}`),
    /*body('gallery')
        .not().isEmpty().withMessage(CustomErrorsEnum.isEmpty)
        .isArray().withMessage(CustomErrorsEnum.isArray),*/
    body('description')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString),
    body('series')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString),
    body('bookType')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString),
    body('rating')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString),
    body('binding')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString),
    body('series')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString),
    body('volume')
        .optional()
        .isInt().withMessage(CustomErrorsEnum.isInt),
    body('pageCount')
        .optional()
        .isInt().withMessage(CustomErrorsEnum.isInt),
    body('color')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString),
    body('trimSize')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString),
    body('starring')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray),
    body('artist')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray),
    body('colorist')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray),
    body('coverColorist')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray),
    body('penciller')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray),
    body('backupArtist')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray),
    body('inker')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray),
    body('coverer')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray),
    body('letterer')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray),
    body('writer')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray),
];
