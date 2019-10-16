import { RequestsToDatabase } from '../../common/services/request-to-database.service.js';
import { Person } from '../models/person.model.js';
import CrudOperationCreator from '../../common/services/crud-operations.service.js';

class PersonService extends CrudOperationCreator {
  buildFilters(filters) {
    const constructedFilters = {};

    return constructedFilters;
  }
}

export const personService = new PersonService(new RequestsToDatabase(Person));
