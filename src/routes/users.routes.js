const { Router } = require('express');
const usersControllers = require('../controllers/users.controllers');

const router = Router();

router.post('/users', usersControllers.addUser);
router.post('/users/:_id/books', usersControllers.getBookForUser);

module.exports = router;