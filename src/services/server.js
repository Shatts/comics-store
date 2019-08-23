import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
    DATABASE_NAME,
} = process.env;
const mongoDB = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { dbName: DATABASE_NAME, useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
