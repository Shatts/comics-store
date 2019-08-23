import { createComics, deleteOneComics, getAllComics, getOneComics } from '../services/comics.servise.js';

export async function getComics(req, res, next) {
    try {
        const comics = await getAllComics();
        res.send(comics);
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(error);
    }
}

export async function getComicsById(req, res, next) {
    const { id } = req.params;
    try {
        const comics = await getOneComics(id);
        res.send(comics);
    } catch (e) {
        next(e);
    }
}

export async function postComics(req, res, next) {
    const comics = req.body;
    try {
        await createComics(comics);
        res.sendStatus(201);
    } catch (e) {
        next(e);
    }
}

export async function deleteComics(req, res, next) {
    const { id } = req.params;
    try {
        await deleteOneComics(id);
        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
}
