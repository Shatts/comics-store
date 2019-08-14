const express = require('express');
const comicsController = require('../controllers/comics.controller');

const comicsRouter = express.Router();
comicsRouter.get('/', comicsController.getComics);
comicsRouter.get('/:id', comicsController.getComicsById);
comicsRouter.post('/', comicsController.postComics);
comicsRouter.patch('/', comicsController.getComicsById);
comicsRouter.delete('/:id', comicsController.getComicsById);

module.exports = comicsRouter;
