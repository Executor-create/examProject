const { Book } = require('../models/Book');

const addBook = async (req, res) => {
  const { title, category, description: { short, full }, countOfPages, quantity } = req.body;

  if (short.length > 256) {
    return res.status(400).json({ error: "Short description is too long" });
  }

  if (countOfPages < 0 || quantity < 0) {
    return res.status(400).json({ error: "Cannot have negative values for count of pages or quantity" });
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

  res.status(201).send(newBook);
}

const getBook = async (req, res) => {
  const { _id } = req.params;

  const book = await Book.findById(_id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
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

  const books = await Book.find(filters);
  res.status(200).send(books);
}

module.exports = {
  addBook,
  getBook,
  getBookByFilter,
}