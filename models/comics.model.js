const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comicsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    series: String,
    bookType: String,
    rating: String,
    onSaleDate: {
        type: Date,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    gallery: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['COMIC BOOK', 'GRAPHIC NOVEL']
    },
    binding: String,
    volume: Number,
    pageCount: Number,
    color: String,
    trimSize: String,
    starring: [String],
    artist: [String],
    colorist: [String],
    coverColorist: [String],
    penciller: [String],
    backupArtist: [String],
    inker: [String],
    coverer: [String],
    letterer: [String],
    writer: [String],
});

module.exports = mongoose.model('Comics', comicsSchema);