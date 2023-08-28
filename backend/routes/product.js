import express from 'express';
import { getProducts, getProductById } from '../controllers/products.js';
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProducts);

export default router;
