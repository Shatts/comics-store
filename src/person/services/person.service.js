import { RequestsToDatabase } from '../../common/services/request-to-database.service.js';
import { CrudOperationCreator } from '../../common/services/crud-operations.service.js';
import { Person } from '../models/person.model.js';

class PersonService extends CrudOperationCreator {
    constructor(db) {
        super(db);
    }

    buildFilters(filters) {
        const constructedFilters = {};

        return constructedFilters;
    }

}

export const personService = new PersonService(new RequestsToDatabase(Person));

