const { User } = require('../models/User');

const addUser = async (req, res) => {
  const { name, login, password } = req.body;

  const user = new User({ name, login, password, bookLimit: 5 });

  const newUser = await user.save();

  res.status(200).send(newUser);
}

module.exports = {
  addUser,
}