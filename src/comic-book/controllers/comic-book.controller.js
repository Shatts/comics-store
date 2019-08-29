import { createComicBook, deleteOneComicBook, getAllComicBooks, getOneComicBook } from '../services/comic-book.servise.js';

export async function getComicBooks(req, res, next) {
    const filters = req.query;
    try {
        const comics = await getAllComicBooks(filters);
        res.send(comics);
    } catch (e) {
        console.log(e.message);
        res.sendStatus(500) && next(error);
    }
}

export async function getComicBookById(req, res, next) {
    const { id } = req.params;
    try {
        const comics = await getOneComicBook(id);
        res.send(comics);
    } catch (e) {
        next(e);
    }
}

export async function postComicBook(req, res, next) {
    const comics = req.body;
    try {
        await createComicBook(comics);
        res.sendStatus(201);
    } catch (e) {
        next(e);
    }
}

export async function deleteComicBook(req, res, next) {
    const { id } = req.params;
    try {
        await deleteOneComicBook(id);
        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
}
