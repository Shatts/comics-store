export class RequestsToDatabase {
    databaseModel;

    constructor(databaseModel) {
        this.databaseModel = databaseModel;
    }

    async create(dataToAdd) {
        return new this.databaseModel(dataToAdd).save();
    }

    findAll(filters) {
        return this.databaseModel.find({
            ...filters
        }).lean();
    }

    async findOne(id) {
        return this.databaseModel.findOne({ _id: id }).lean().exec();
    }

    deleteOne(id) {
        return this.databaseModel.deleteOne({ _id: id }).lean();
    }
}
