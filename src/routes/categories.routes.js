const { Router } = require('express');
const categoriesControllers = require('../controllers/categories.controllers');

const router = Router();

router.post('/categories', categoriesControllers.addCategory);

module.exports = router;