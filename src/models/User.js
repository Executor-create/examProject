const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  _id: { type: ObjectId },
  name: { type: String },
  login: { type: String },
  password: { type: String },
  bookLimit: { type: Number },
  books: [{
    id: { type: ObjectId },
    dateOfTake: { type: Date },
    dateOfReturn: { type: Date },
    comment: { type: String },
  }],
});

const User = new model('users', userSchema);

module.exports = { User };