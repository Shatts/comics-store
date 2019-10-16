import { RequestsToDatabase } from '../../common/services/request-to-database.service.js';

class UserDbService extends RequestsToDatabase {

  async findOneByEmail(email) {
    return this.databaseModel.findOne({ email }).lean().exec();
  }
}

export default UserDbService;
