import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import colors from 'colors';
import connectDB from './config/db.js';

import productRouter from './routes/product.js';
import userRouter from './routes/user.js';
import orderRouter from './routes/order.js';
import uploadRouter from './routes/uploadRoutes.js';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Initialized Express
const app = express();

// Configuring Environment
dotenv.config();

// Connecting to DB
connectDB();

// Body Parser Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookie Parser Middleware
app.use(cookieParser());
app.get('/', function (req, res) {
  res.send('Server Started');
});

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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
