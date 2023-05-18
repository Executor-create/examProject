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

module.exports = {
  addBook,
  getBook,
}