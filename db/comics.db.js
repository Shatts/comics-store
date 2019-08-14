import * as Comics from "mongoose";

export async function create(comics) {
    comics.save((err) => {
        if (err) throw err;
    });
}

export async function findAll() {
    return Comics.find({}).lean();
}

export async function findOne(comicsId) {
    return Comics.findOne({ _id: comicsId }).lean();
}
