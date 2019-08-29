import express from 'express';
import { deleteComicBook, getComicBooks, getComicBookById, postComicBook } from '../controllers/comic-book.controller.js';
import { bodyComicsValidation } from '../utils/comic-book.validation.js';
import { validationMiddleware } from '../../common/middlewares/validation.middleware.js';
import { filterValidation } from '../utils/comic-book.validation.js';

export const comicsRouter = express.Router();

comicsRouter.post('/', bodyComicsValidation, validationMiddleware);
comicsRouter.post('/', postComicBook);

comicsRouter.get('/', filterValidation, validationMiddleware);
comicsRouter.get('/', getComicBooks);

comicsRouter.get('/:id', getComicBookById);

comicsRouter.patch('/', getComicBookById);

comicsRouter.delete('/:id', deleteComicBook);

