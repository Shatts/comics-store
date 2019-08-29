import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const personSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    creditedAs: {
        type: [String],
        required: true,
    },
});

export const Person = mongoose.model('Person', personSchema);
