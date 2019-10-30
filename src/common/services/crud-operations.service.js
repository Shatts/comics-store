import { CustomNotFoundException } from '../models/http-exception.model.js';

class CrudOperationCreator {
  constructor(db) {
    this.db = db;
  }

  create(data) {
    return this.db.create(data);
  }

  patch(id, data) {
    return this.db.patch(id, data);
  }

  getAll(filters) {
    const constructedFilters = this.buildFilters(filters);
    return this.db.findAll(constructedFilters);
  }

  async getOne(id) {
    return this.db.findOne(id);
  }

  deleteOne(id) {
    return this.db.deleteOne(id);
  }

  buildFilters(filters) {
    throw new Error('Abstract method buildFilters should be implemented!');
  }
}

export default CrudOperationCreator;
