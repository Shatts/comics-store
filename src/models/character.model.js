import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const characterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    gallery: {
        type: [String],
        required: true,
    },
    alias: String,
    description: {
        type: String,
        required: true,
    },
    firstAppearance: {
        type: String,
        required: true,
    },
    relatedCharacters: {
        type: [String],
        required: true,
    },
    powers: [String],
    baseOfOperations: String,
    realName: String,
    facebookLink: String,
    alingment: String,
    occupation: String,
});

export const Character = mongoose.model('Character', characterSchema);
