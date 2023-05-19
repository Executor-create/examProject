const { Router } = require('express');
const booksControllers = require('../controllers/books.controllers');

const router = Router();

router.post('/books', booksControllers.addBook);
router.get('/books/:_id', booksControllers.getBook);
router.get('/books', booksControllers.getBookByFilter);

module.exports = router;