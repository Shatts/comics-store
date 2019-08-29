import { ServiceUnavailableException } from '../models/http-exception.model.js';

export class RequestsToDatabase {
    databaseModel;

    constructor(databaseModel) {
        this.databaseModel = databaseModel;
    }

    create(dataToAdd) {
        this.databaseModel.create(dataToAdd, (err, data) => {
            if (err) throw new ServiceUnavailableException('Database is unavailable right now. Please try later');
            console.log(data);
        });
        return true;
    }

    findAll(filters) {
        return this.databaseModel.find({
            ...filters
        }).lean();
    }

    findOne(id) {
        return this.databaseModel.findOne({ _id: id }).lean();
    }

    deleteOne(id) {
        return this.databaseModel.deleteOne({ _id: id }).lean();
    }
}
