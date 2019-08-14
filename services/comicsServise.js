import {create, findAll, findOne} from "../db/comics.db.js";

export async function createComics(comics) {
    try {
        const comicsData = new Comics(comics);
        return await create(comicsData);
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function getAllComics() {
    try {
        return await findAll();
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function getOneComics(comicsId) {
    try {
        return await findOne(comicsId);
    } catch (e) {
        throw new Error(e.message);
    }
}
