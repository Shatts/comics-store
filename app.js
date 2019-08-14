const express = require('express'),
    comicsRouter = require('./routes/comics'),
    characterRouter = require('./routes/character'),
    personRouter = require('./routes/person'),
    mongoose = require('mongoose'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/comics', comicsRouter);
/*app.use('/characters', characterRouter);
app.use('/persons', personRouter);*/


const mongoDB = 'mongodb+srv://Kris:FSno3WQDXSx7Ld5R@clustercomics-bdljh.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {dbName: 'site', useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
