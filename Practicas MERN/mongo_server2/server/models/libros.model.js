import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true }
}, { timestamps: true });

export default model('Book', bookSchema);