/* eslint-disable no-unused-vars */
/* eslint-disable node/no-unpublished-require */
import '../config/config';
import { errorHandler, catch404 } from './routes/error';

const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');

const app = express();

// Allow Morgan during development
if (process.env.NODE_ENV === 'DEV_MODE') {
  app.use(morgan('dev'));
}

// Middleware
app.use(cors());
app.use(express.json({ limit: 10e7 }));
app.use(express.urlencoded({ extended: false, limit: 10e7 }));

// Error Handling
// app.use(catch404);
// app.use(errorHandler);

// HBS CONNECT
const publicDirectory = path.join(__dirname, '../public');
app.set('view engine', 'hbs');
app.use(express.static(publicDirectory));

// Route Middlewares
app.get('/', (req, res) => {
  // res.send('<h1>🌍 ==> Node Rest API server is up and running 🔥</h1>');
  res.render('index');
});

if (process.env.NODE_ENV === 'PRODUCTION_MODE') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'bin', 'build', 'index.html')),
  );
}

app.listen(process.env.PORT || 5000, () =>
  console.log(
    `[[${
      process.env.NODE_ENV
    }]] 🌍  ==> NODE REST API server is on http://localhost:${
      process.env.PORT || 5000
    } 🔥`.yellow.bold,
  ),
);
