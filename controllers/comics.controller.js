const { createComics, getAllComics } = require('../services/comics.service');

async function getComics(req, res, next) {
    try {
        const comics = await getAllComics();
        res.send(comics);
        next()
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(error);
    }
}

async function getComicsById(req, res, next) {
    res.send('Hello comics by id!');
}

async function postComics(req, res, next) {
    const comics = req.body;
    try {
        await createComics(comics);
        res.sendStatus(201);
        next()
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(error);
    }
}

module.exports = {
    getComics,
    getComicsById,
    postComics
};
