import { create, deleteOne, findAll, findOne } from '../db/comics.db.js';
import { NotFoundException } from '../models/http-exception.model.js';

export async function createComics(comics) {
    return await create(comics);
}

export async function getAllComics() {
    return await findAll();
}

export async function getOneComics(comicsId) {
    const comics = await findOne(comicsId);
    if (!comics) {
        throw new NotFoundException(`Comics with id ${comicsId} was not found.`);
    }
    return comics;
}

export async function deleteOneComics(comicsId) {
    return await deleteOne(comicsId);
}
