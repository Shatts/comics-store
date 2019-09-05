import { comicsService } from '../services/comic-book.servise.js';

export async function getComicBooks(req, res, next) {
    const filters = req.query;
    try {
        const comics = await comicsService.getAll(filters);
        res.send(comics);
    } catch (e) {
        next(e);
    }
}

export async function getComicBookById(req, res, next) {
    const { id } = req.params;
    try {
        const comics = await comicsService.getOne(id);
        res.send(comics);
    } catch (e) {
        next(e);
    }
}

export async function postComicBook(req, res, next) {
    const comics = req.body;
    try {
        const createdComicBook = await comicsService.create(comics);
        res.send(createdComicBook);
    } catch (e) {
        next(e);
    }
}

export async function deleteComicBook(req, res, next) {
    const { id } = req.params;
    try {
        await comicsService.deleteOne(id);
        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
}
