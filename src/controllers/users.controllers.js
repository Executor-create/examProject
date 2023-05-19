const { User } = require('../models/User');
const { Book } = require('../models/Book');

const addUser = async (req, res) => {
  const { name, login, password } = req.body;

  const user = new User({ name, login, password, bookLimit: 5 });

  const newUser = await user.save();

  res.status(200).send(newUser);
}

const getBookForUser = async (req, res) => {
  const { _id } = req.params;
  const { book_id } = req.body;

  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const book = await Book.findById(book_id);

  if (!book || book.quantity.available === 0) {
    return res.status(400).json("Book not available");
  }

  const borrowedBooksCount = user.books.filter(book => !book.dateOfReturn).length;
  if (user.bookLimit > 0 && borrowedBooksCount >= user.bookLimit) {
    return res.status(400).json({ error: 'User has reached the book limit' });
  }

  user.books.push({ book_id });
  await user.save();

  book.quantity.available -= 1
  await book.save();

  res.status(201).send(user);
}

module.exports = {
  addUser,
  getBookForUser,
}