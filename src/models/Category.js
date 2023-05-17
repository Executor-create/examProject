const { Schema, model } = require('mongoose');

const categorySchema = Schema({
  _id: { type: String },
  name: { type: String },
});

const Category = new model('categories', categorySchema, 'categories');

module.exports = { Category };