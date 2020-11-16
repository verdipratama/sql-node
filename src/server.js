/* eslint-disable no-unused-vars */
/* eslint-disable node/no-unpublished-require */
import '../config/config';
import { router as routes } from './routes/index';
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

// REST API routes
app.use('/api', routes);

// Error Handling
app.use('/api', catch404);
app.use('/api', errorHandler);

// Handlebars setup
const publicDirectory = path.join(__dirname, '../public');
app.set('view engine', 'hbs');
app.use(express.static(publicDirectory));

// Route Middlewares Handlebars
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.send('<h1>🌍 ==> Node Rest API server is up and running 🔥</h1>');
});

if (process.env.NODE_ENV === 'PRODUCTION_MODE') {
  app.use(express.static('bin/build'));

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
