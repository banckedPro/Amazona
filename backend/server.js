import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';

import productRouter from './routes/product.js';
import userRouter from './routes/user.js';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Initialized Express
const app = express();

// Configuring Environment
dotenv.config();

// Connecting to DB
connectDB();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res) {
  res.send('Server Started');
});

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// Use Middlewares
app.use(errorHandler);
app.use(notFound);

// Starting Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server started on PORT ${PORT} in ${process.env.NODE_ENV} mode`.yellow
  );
});
