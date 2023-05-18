const { Category } = require('../models/Category');

const addCategory = async (req, res) => {
  const { name } = req.body;

  const category = new Category({ name });

  const newCategory = await category.save().catch((error) => {
    res.status(400).send(error);
  })

  res.status(201).send(newCategory);
}

module.exports = {
  addCategory
}