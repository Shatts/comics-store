import { CustomNotFoundException } from '../models/http-exception.model.js';

export class CrudOperationCreator {
    db;

    constructor(db) {
        this.db = db;

    }

    create(data) {
        return this.db.create(data);
    }

    getAll(filters) {
        const constructedFilters = this.buildFilters(filters);
        return this.db.findAll(constructedFilters);
    }

    async getOne(id) {
        const data = await this.db.findOne(id);
        if (!data) {
            throw new CustomNotFoundException(this.db.databaseModel.modelName, id);
        }
        return data;
    }

    deleteOne(id) {
        return this.db.deleteOne(id);
    }

    buildFilters(filters) {
        throw new Error('Abstract method buildFilters should be implemented!');
    }
}
