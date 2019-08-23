import express from 'express';
import { deleteComics, getComics, getComicsById, postComics } from '../controllers/comics.controller.js';
import checkAPIs from 'express-validator';
import { bodyComicsValidation } from '../utils/comics/validation.js';
import { BadRequestException } from '../models/http-exception.model.js';

const { validationResult } = checkAPIs;
export const comicsRouter = express.Router();

comicsRouter.post('/', bodyComicsValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestException('Bad request');
    }
    next();
});
comicsRouter.post('/', postComics);
comicsRouter.get('/', getComics);
comicsRouter.get('/:id', getComicsById);
comicsRouter.patch('/', getComicsById);
comicsRouter.delete('/:id', deleteComics);

