import { RequestsToDatabase } from '../../common/services/request-to-database.service.js';
import { Character } from '../models/character.model.js';
import CrudOperationCreator from '../../common/services/crud-operations.service.js';

class CharacterService extends CrudOperationCreator {
  buildFilters(filters) {
    const constructedFilters = {};

    return constructedFilters;
  }
}

const characterService = new CharacterService(new RequestsToDatabase(Character));
export default characterService;
