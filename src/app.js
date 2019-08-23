import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { comicsRouter } from './routes/comics.js';
import dotenv from 'dotenv';
import { errorMiddleware } from './services/exception.middleware.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use('/comics', comicsRouter);
app.use(errorMiddleware);

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

app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3000!');
});
