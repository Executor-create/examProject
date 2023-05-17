const mongoose = require('mongoose');

async function setupDB() {
  try {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  } catch (error) {
    console.log(error);
  }
}

module.exports = setupDB;