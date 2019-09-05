import dotenv from 'dotenv';

dotenv.config();
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
    DATABASE_NAME,
} = process.env;

export const databaseConnectionAtlasOptions = {
    mongoUser: MONGO_USER,
    password: MONGO_PASSWORD,
    path: MONGO_PATH,
    dbName: DATABASE_NAME,
    isNewUrlParser: true,
    additionalOptions: 'retryWrites=true&w=majority',
};
