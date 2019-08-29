import { CustomErrorsEnum } from '../../common/models/custom-error.enum.js';
import { comicsTypeEnum } from '../models/comic-book.helper.js';
import checkAPIs from 'express-validator';

const { body, query } = checkAPIs;

function checkIfArrayOfStringsAndNotEmpty(value) {
    return value.every((val) => typeof val === 'string' && val.length)
}

function checkIfWordWithOneLetter(value) {
    return value.length === 1;
}

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
    body('gallery.s')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString),
    body('gallery.m')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString),
    body('gallery.l')
        .not().isEmpty().withMessage(CustomErrorsEnum.isEmpty)
        .isString().withMessage(CustomErrorsEnum.isString),
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
        .isString().withMessage(CustomErrorsEnum.isString)
        .custom((value) => checkIfArrayOfStringsAndNotEmpty(value)).withMessage(CustomErrorsEnum.isArrayOfStrings),
    body('trimSize')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString)
        .custom((value) => checkIfArrayOfStringsAndNotEmpty(value)).withMessage(CustomErrorsEnum.isArrayOfStrings),
    body('starring')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray)
        .custom((value) => checkIfArrayOfStringsAndNotEmpty(value)).withMessage(CustomErrorsEnum.isArrayOfStrings),
    body('artist')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray)
        .custom((value) => checkIfArrayOfStringsAndNotEmpty(value)).withMessage(CustomErrorsEnum.isArrayOfStrings),
    body('colorist')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray)
        .custom((value) => checkIfArrayOfStringsAndNotEmpty(value)).withMessage(CustomErrorsEnum.isArrayOfStrings),
    body('coverColorist')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray)
        .custom((value) => checkIfArrayOfStringsAndNotEmpty(value)).withMessage(CustomErrorsEnum.isArrayOfStrings),
    body('penciller')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray)
        .custom((value) => checkIfArrayOfStringsAndNotEmpty(value)).withMessage(CustomErrorsEnum.isArrayOfStrings),
    body('backupArtist')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray)
        .custom((value) => checkIfArrayOfStringsAndNotEmpty(value)).withMessage(CustomErrorsEnum.isArrayOfStrings),
    body('inker')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray)
        .custom((value) => checkIfArrayOfStringsAndNotEmpty(value)).withMessage(CustomErrorsEnum.isArrayOfStrings),
    body('coverer')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray)
        .custom((value) => checkIfArrayOfStringsAndNotEmpty(value)).withMessage(CustomErrorsEnum.isArrayOfStrings),
    body('letterer')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray)
        .custom((value) => checkIfArrayOfStringsAndNotEmpty(value)).withMessage(CustomErrorsEnum.isArrayOfStrings),
    body('writer')
        .optional()
        .isArray().withMessage(CustomErrorsEnum.isArray)
        .custom((value) => checkIfArrayOfStringsAndNotEmpty(value)).withMessage(CustomErrorsEnum.isArrayOfStrings),
];

export const filterValidation = [
    query('title')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString)
        .custom((value) => checkIfWordWithOneLetter(value)).withMessage(CustomErrorsEnum.isOneLetter),
    query('characters')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString),
    query('series')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString),
    query('type')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString)
        .isIn([comicsTypeEnum.comicBook, comicsTypeEnum.graphicNovel])
        .withMessage(`${CustomErrorsEnum.isIn} ${comicsTypeEnum.comicBook} or ${comicsTypeEnum.graphicNovel}`),
    query('name')
        .optional()
        .isString().withMessage(CustomErrorsEnum.isString),
    query('startdate')
        .optional()
        .isISO8601().withMessage(CustomErrorsEnum.isDate),
    query('enddate')
        .optional()
        .isISO8601().withMessage(CustomErrorsEnum.isDate),
];
