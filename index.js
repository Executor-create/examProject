const express = require('express');
const bodyParser = require('body-parser');
const setupDB = require('./src/configs/db');
require('dotenv').config();

const usersRouter = require('./src/routes/users.routes');
const booksRouter = require('./src/routes/books.routes');
const categoriesRouter = require('./src/routes/categories.routes');

const app = express();

app.use(bodyParser.json());

app.use(usersRouter);
app.use(booksRouter);
app.use(categoriesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started ${process.env.PORT}`);
});

setupDB();