const { create, findAll } = require('../db/comics.db');
const Comics = require('../models/comics.model');

async function createComics(comics) {
    try {
      const comicsData = new Comics(comics);
      return await create(comicsData)
    } catch(e) {
      throw new Error(e.message)
    }
}

async function getAllComics() {
    try {
        return await findAll()
    } catch(e) {
        throw new Error(e.message)
    }
}

module.exports = {
    createComics,
    getAllComics
};
