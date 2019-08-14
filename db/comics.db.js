const Comics = require('../models/comics.model');

async function create(comics) {
    comics.save(function (err) {
        if (err) throw err;
    });
}

async function findAll() {
    return Comics.find({}).lean();
}

module.exports = {
    create,
    findAll
};
