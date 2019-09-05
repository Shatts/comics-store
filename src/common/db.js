import mongoose from 'mongoose';
import { ServiceUnavailableException } from './models/http-exception.model.js';
mongoose.Promise = global.Promise;

export class DatabaseConnection {
    options;
    mongoDb;

    constructor(options) {
        this.options = options;
    }

    createConnectionAtlas() {
        const connectionOptions = this.options.additionalOptions ? `?${this.options.additionalOptions}` : '';
        this.mongoDb = `mongodb+srv://${this.options.mongoUser}:${this.options.password}@${this.options.path}${connectionOptions}`;
        return this;
    }

    async connect() {
        try {
            await mongoose.connect(this.mongoDb, {
                dbName: this.options.dbName,
                useNewUrlParser: this.options.isNewUrlParser,
            });
        } catch (e) {
            throw new ServiceUnavailableException('Database is unavailable right now. Please try later');
        }
    }
}
