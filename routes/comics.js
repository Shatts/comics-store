import express from 'express';
import {getComics, getComicsById, postComics} from "../controllers/comics.controller.js";

export const comicsRouter = express.Router();
comicsRouter.get('/', getComics);
comicsRouter.get('/:id', getComicsById);
comicsRouter.post('/', postComics);
comicsRouter.patch('/', getComicsById);
comicsRouter.delete('/:id', getComicsById);

