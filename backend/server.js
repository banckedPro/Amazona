import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import products from './data/products.js';
import connectDB from './config/db.js';

// Initialized Express
const app = express();

// Configuring Environment
dotenv.config();

// Connecting to DB
connectDB();

app.get('/', function (req, res) {
  res.send('Server Started');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);

  res.json(product);
});

// Starting Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server started on PORT ${PORT} in ${process.env.NODE_ENV} mode`.yellow
  );
});
