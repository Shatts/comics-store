import {createComics, getAllComics, getOneComics} from "../services/comicsServise.js";

export async function getComics(req, res, next) {
    try {
        const comics = await getAllComics();
        res.send(comics);
        next()
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(error);
    }
}

export async function getComicsById(req, res, next) {
    const {id} = req.params;
    try {
        const comics = await getOneComics(id);
        res.send(comics);
        next()
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(error);
    }
}

export async function postComics(req, res, next) {
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
