import express from 'express';
import bodyParser from 'body-parser';
import { comicsRouter } from './comic-book/routes/comic-book.js';
import dotenv from 'dotenv';
import { errorMiddleware } from './common/middlewares/exception.middleware.js';
import { db } from './common/db.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use('/comics', comicsRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port 3000!');
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
});
