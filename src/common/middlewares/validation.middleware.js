import { BadRequestException } from '../models/http-exception.model.js';
import checkAPIs from 'express-validator';

const { validationResult } = checkAPIs;

export function validationMiddleware(validationRules) {
    return async (req, res, next) => {
        await Promise.all(validationRules.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestException(errors.errors);
        }
        next();
    };
}
