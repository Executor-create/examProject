const { Router } = require('express');
const categoriesControllers = require('../controllers/categories.controllers');

const router = Router();

router.post('/categories', categoriesControllers.addCategory);
router.patch('/categories/:_id', categoriesControllers.updateCategory);

module.exports = router;