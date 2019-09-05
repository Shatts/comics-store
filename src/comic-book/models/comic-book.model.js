import mongoose from 'mongoose';
import { comicsTypeEnum } from './comic-book.helper.js';
import { gallerySchema } from './gallery.model.js';
import { databaseComicBookName } from './comic-book.helper.js';

const Schema = mongoose.Schema;
const comicBookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: String,
    series: String,
    bookType: String,
    rating: String,
    onSaleDate: {
        type: Date,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    gallery: {
        type: [gallerySchema],
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: [comicsTypeEnum.comicBook, comicsTypeEnum.graphicNovel],
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

export const ComicBook = mongoose.model(databaseComicBookName, comicBookSchema);
