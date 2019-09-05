import { RequestsToDatabase } from '../../common/services/request-to-database.service.js';
import { CrudOperationCreator } from '../../common/services/crud-operations.service.js';
import { Character } from '../models/character.model.js';

class CharacterService extends CrudOperationCreator {
    constructor(db) {
        super(db);
    }

    buildFilters(filters) {
        const constructedFilters = {};

        return constructedFilters;
    }

}

export const characterService = new CharacterService(new RequestsToDatabase(Character));

