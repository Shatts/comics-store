import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const gallerySchema = new Schema({
    xs: String,
    s: String,
    m: String,
    l: String,
});

export const Gallery = mongoose.model('Gallery', gallerySchema);
