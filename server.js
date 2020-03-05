const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

// import routes
const productRoutes = require('./routers/products');
const orderRoutes = require('./routers/orders');

// config env variables
dotenv.config();

if (process.env.NODE_ENV === 'DEV_MODE') {
  app.use(morgan('dev'));
}

// Middle ware
app.use(cors());
app.use(express.json());

// route middlewares
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
app.get('/', (req, res) => {
  res.send('<h1>🌍 ==> Node Rest API server is up and running 🔥</h1>');
});

// Error Handling
app.use((req, res) => {
  const error = new Error('Not Found');
  error.status = 404 || 500;
  res.send({
    Error: 'Page not found',
    Status: error.status
  });
});

if (process.env.NODE_ENV === 'PRODUCTION_MODE') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(process.env.PORT || 5000, () =>
  console.log(`[[${process.env.NODE_ENV}]] 🌍  ==> NODE REST API server is on 🔥`.yellow.bold)
);
