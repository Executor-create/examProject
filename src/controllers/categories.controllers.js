const { Category } = require('../models/Category');
const { Book } = require("../models/Book");

const addCategory = async (req, res) => {
  const { name } = req.body;

  const category = new Category({ name });

  const newCategory = await category.save().catch((error) => {
    res.status(400).send(error);
  })

  res.status(201).send(newCategory);
}

const updateCategory = async (req, res) => {
  const { _id } = req.params;
  const { name } = req.body;

  const category = await Category.findById(_id)

  const updatedCategory = await Category.findByIdAndUpdate(
    _id,
    { name },
  );

  if (!updatedCategory) {
    return res.status(404).send('Category not found');
  }

  const books = await Book.find({ category: category.name });

  if (books.length > 0) {
    await Book.updateMany({ category: category.name }, { category: name });
  }

  res.status(200).send(updatedCategory);
}

module.exports = {
  addCategory,
  updateCategory
}