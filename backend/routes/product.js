import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
} from '../controllers/products.js';

import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getProducts).post(protect, admin, createProduct);
router.get('/:id', getProductById);

export default router;
