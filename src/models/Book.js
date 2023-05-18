const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  title: { type: String },
  category: { type: String },
  createdAt: { type: Date },
  description: {
    short: { type: String },
    full: { type: String },
  },
  quantity: {
    total: { type: Number },
    available: { type: Number }
  },
  countOfPages: { type: Number },
});

const Book = new model('books', bookSchema, 'books');

module.exports = { Book }