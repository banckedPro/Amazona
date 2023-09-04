import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/Product.js';

// @desc     Fetch All Products
// @route    GET /api/products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
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

  res.status(200).json(product);
});

// @desc     Create a Products
// @route    POST /api/products
// @access   Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createProduct);
});

export { getProductById, getProducts, createProduct };
