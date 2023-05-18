const { Router } = require('express');
const booksControllers = require('../controllers/books.controllers');

const router = Router();

router.post('/books', booksControllers.addBook);

module.exports = router;