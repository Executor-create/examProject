const { Book } = require('../models/Book');

const addBook = async (req, res) => {
  const { title, category, description: { short, full }, countOfPages, quantity } = req.body;

  if (short.length > 256) {
    return res.status(400).send(JSON.stringify("Short description is too long"));
  }

  if (countOfPages < 0 || quantity < 0) {
    return res.status(400).send(JSON.stringify("Cannot have negative values for count of pages or quantity"));
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

module.exports = {
  addBook
}