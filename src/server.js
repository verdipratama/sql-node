import { errorHandler, catch404 } from './routes/error';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

const app = express();

// config env variables
dotenv.config();

// Allow Morgan during development
if (process.env.NODE_ENV === 'DEV_MODE') {
  app.use(morgan('dev'));
}

// Middleware
app.use(cors());
app.use(express.json({ limit: 10e7 }));
app.use(express.urlencoded({ extended: false, limit: 10e7 }));

// Route Middlewares
app.get('/', (req, res) => {
  res.send('<h1>🌍 ==> Node Rest API server is up and running 🔥</h1>');
});

// Error Handling
app.use(catch404);
app.use(errorHandler);

if (process.env.NODE_ENV === 'PRODUCTION_MODE') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')),
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
