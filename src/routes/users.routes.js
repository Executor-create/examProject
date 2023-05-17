const { Router } = require('express');
const usersControllers = require('../controllers/users.controllers');

const router = Router();

router.post('/users', usersControllers.addUser);

module.exports = router;