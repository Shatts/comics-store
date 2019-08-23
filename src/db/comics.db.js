import { Comics } from '../models/comics.model.js';

//TODO: Add errors
export async function create(comics) {
    Comics.create(comics, (err, small) => {
        //if (err) return handleError(err);
        if (err) console.log(err);
    });
    return true;
}

//TODO: Add filters
export async function findAll() {
    return Comics.find({}).lean();
}

export async function findOne(comicsId) {
    return Comics.findOne({ _id: comicsId }).lean();
}

//TODO: Add errors
export async function deleteOne(comicsId) {
    return Comics.deleteOne({ _id: comicsId }).lean();
}
