import { BadRequestException } from '../models/http-exception.model.js';
import checkAPIs from 'express-validator';

const { validationResult } = checkAPIs;

export function validationMiddleware(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestException(errors.errors);
    }
    next();
}
