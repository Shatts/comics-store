import express from 'express';
import { deleteComicBook, getComicBooks, getComicBookById, postComicBook } from '../controllers/comic-book.controller.js';
import { bodyComicsValidation } from '../utils/comic-book.validation.js';
import { validationMiddleware } from '../../common/middlewares/validation.middleware.js';
import { filterValidation } from '../utils/comic-book.validation.js';
import { adminMiddleware } from '../../common/middlewares/admin.middleware.js';

export const comicsRouter = express.Router();

comicsRouter.post('/', validationMiddleware(bodyComicsValidation));
comicsRouter.post('/', postComicBook);
comicsRouter.get('/', validationMiddleware(filterValidation));
// TODO: Check admin middleware
comicsRouter.get('/', getComicBooks, adminMiddleware);
comicsRouter.get('/:id', getComicBookById);
comicsRouter.delete('/:id', deleteComicBook);
