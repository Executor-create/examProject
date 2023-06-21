const { Book } = require('../models/Book');
const {Category} = require("../models/Category");

const addBook = async (req, res) => {
  const { title, category, description: { short, full }, countOfPages, quantity } = req.body;
  const fetchedCategory = await Category.findOne({category: {}})

  if(!fetchedCategory) {
    return res.sta
  }

  if (short.length > 256) {
    return res.status(400).send({ error: "Short description is too long" });
  }

  if (countOfPages < 0 || quantity < 0) {
    return res.status(400).send({ error: "Cannot have negative values for count of pages or quantity" });
  }

  const book = new Book({
    title,
    category,
    description: { short, full },
    countOfPages,
    quantity: {
      available: quantity
    }
  });

  const newBook = await book.save().catch((error) => {
    res.status(500).send(error);
  });

  return res.status(201).send(newBook);
}

const getBook = async (req, res) => {
  const { _id } = req.params;

  let book;
  try {
    book = await Book.findById(_id);
  } catch (err) {
   return res.status(404).send(err);
  }

  res.status(200).send(book);
}

const getBookByFilter = async (req, res) => {
  const { categories, title, search, isAvailable } = req.query;

  const filters = {};

  if (categories) {
    const categoryArray = categories.split(',').map((category) => new RegExp(category, 'i'));
    filters.category = { $in: categoryArray };
  }

  if (title)
    filters.title = { $regex: title, $options: 'i' };

  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: 'i' } },
      { 'description.short': { $regex: search, $options: 'i' } },
      { 'description.full': { $regex: search, $options: 'i' } },
    ]
  };

  if (isAvailable) {
    if (isAvailable == 'true') {
      filters['quantity.available'] = { $gt: 0 };
    }
    if (isAvailable === 'false') {
      filters['quantity.available'] = 0;
    }
  }

  let books;
  try {
    books = await Book.find(filters);
  } catch (err) {
    res.status(404).send("Books not found");
  }

  res.status(200).send(books);
}

module.exports = {
  addBook,
  getBook,
  getBookByFilter,
}