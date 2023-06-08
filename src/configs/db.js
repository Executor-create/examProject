const mongoose = require('mongoose');

async function setupDB() {
  try {
   await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   console.log('DB was connected')
  } catch (error) {
    console.log(error);
  }
}

module.exports = setupDB;