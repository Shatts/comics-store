import { ComicBook } from '../models/comic-book.model.js';
import { RequestsToDatabase } from '../../common/services/request-to-database.service.js';
import { CrudOperationCreator } from '../../common/services/crud-operations.service.js';

class ComicBookService extends CrudOperationCreator {
    constructor(db) {
        super(db);
    }

    buildFilters(filters) {
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

}

const db = new RequestsToDatabase(ComicBook);
export const comicsService = new ComicBookService(db);

