import User from '../models/user.model.js';
import { CustomNotFoundException } from '../../common/models/http-exception.model.js';
import UserDbService from './user.db.service.js';
import CrudOperationCreator from '../../common/services/crud-operations.service.js';

class UserService extends CrudOperationCreator {
  async findByEmail(email) {
    return this.db.findOneByEmail(email);
    /*if (!user) {
      throw new CustomNotFoundException(this.db.databaseModel.modelName, email);
    }
    return user;*/
  }

  // eslint-disable-next-line no-unused-vars
  buildFilters(filters) {
    return {};
  }
}

const db = new UserDbService(User);
const userService = new UserService(db);

export default userService;
