import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {comicsRouter} from "./routes/comics.js";

const app = express();
app.use(bodyParser.json());
app.use('/comics', comicsRouter);

const mongoDB = 'mongodb+srv://Kris:FSno3WQDXSx7Ld5R@clustercomics-bdljh.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {dbName: 'site', useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
