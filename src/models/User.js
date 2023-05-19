const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  name: { type: String },
  login: { type: String },
  password: { type: String },
  bookLimit: { type: Number },
  books: [{
    _id: { type: ObjectId },
    book_id: { type: String },
    dateOfTake: { type: Date },
    dateOfReturn: { type: Date },
    comment: { type: String },
  }],
});

const User = new model('users', userSchema, 'users');

module.exports = { User };