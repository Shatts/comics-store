import express from 'express';
import bodyParser from 'body-parser';
import { comicsRouter } from './comic-book/routes/comic-book.js';
import dotenv from 'dotenv';
import { errorMiddleware } from './common/middlewares/exception.middleware.js';
import { DatabaseConnection } from './common/db.js';
import { databaseConnectionAtlasOptions } from './common/models/database.config.js';
import { characterRouter } from './character/routes/character.js';
import { personRouter } from './person/routes/person.js';

dotenv.config();
const app = express();
new DatabaseConnection(databaseConnectionAtlasOptions).createConnectionAtlas().connect();

app.use(bodyParser.json());
app.use('/comics', comicsRouter);
app.use('/characters', characterRouter);
app.use('/persons', personRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});
