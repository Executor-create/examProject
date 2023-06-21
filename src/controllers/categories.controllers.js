const { Category } = require('../models/Category');
const { Book } = require("../models/Book");

const addCategory = async (req, res) => {
  const { name } = req.body;

  const category = new Category({ name });

  let newCategory;
  try {
    newCategory = await category.save();
  } catch (err) {
    return res.status(400).send(err);
  }

  res.status(201).send(newCategory);
}

const updateCategory = async (req, res) => {
  const { _id } = req.params;
  const { name } = req.body;

  let category;
  let updatedCategory;
  // let updatedBooks;
  try {
    category = await Category.findById(_id);

    updatedCategory = await Category.findByIdAndUpdate(
      _id,
      { name },
    );

    updatedBooks = await Book.updateMany({ category: category.name }, { category: name });
  } catch (err) {
    res.status(404).send(err);
  }

  res.status(200).send({ updatedCategory });
  //updatedBooks: updatedBooks.modifiedCount
}

module.exports = {
  addCategory,
  updateCategory
}