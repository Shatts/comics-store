import { NotFoundException } from '../../common/models/http-exception.model.js';
import { ComicBook } from '../models/comic-book.model.js';
import { RequestsToDatabase } from '../../common/services/request-to-database.service.js';

const db = new RequestsToDatabase(ComicBook);

export function createComicBook(comics) {
    return db.create(comics);
}

export function getAllComicBooks(filters) {
    const bla = buildFilters(filters);
    return db.findAll(bla);
}

export function getOneComicBook(comicsId) {
    const comics = db.findOne(comicsId);
    if (!comics) {
        throw new NotFoundException(`Comics with id ${comicsId} was not found.`);
    }
    return comics;
}

export function deleteOneComicBook(comicsId) {
    return db.deleteOne(comicsId);
}

export function buildFilters(filters) {
    const constructedFilters = {};

    if (filters.title) {
        const firstLetterRegExp = `^${filters.title}`;
        constructedFilters.name = new RegExp(firstLetterRegExp, 'i');
    }

    if (filters.characters) {
        constructedFilters.starring = { $in: [filters.characters.split(',')] };
    }

    if(filters.series) {
        constructedFilters.series = filters.series;
    }

    if (filters.type) {
        constructedFilters.type = filters.type;
    }

    if (filters.name) {
        constructedFilters.name = filters.name;
    }

    return constructedFilters;
}
