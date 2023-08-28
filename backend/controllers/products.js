import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/Product.js';

// @desc     Fetch All Products
// @route    GET /api/products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc     Fetch All Products
// @route    GET /api/products
// @access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Product not Found`);
  }

  res.json(product);
});

export { getProductById, getProducts };
