import mongoose from 'mongoose';

export class RequestsToDatabase {
    databaseModel;

    constructor(databaseModel) {
        this.databaseModel = databaseModel;
    }

    create(dataToAdd) {
        return new this.databaseModel(dataToAdd).save();
    }

    update(id, dataToAdd) {
        return this.databaseModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, dataToAdd, { upsert: true })
          .lean();
    }

    patch(id, dataToAdd) {
        return this.databaseModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {$set: dataToAdd}).lean();
    }

    findAll(filters) {
        return this.databaseModel.find({
            ...filters
        })
          .lean();
    }

    findOne(id) {
        return this.databaseModel.findOne({ _id: id })
          .lean()
          .exec();
    }

    deleteOne(id) {
        return this.databaseModel.deleteOne({ _id: id }).lean();
    }
}
