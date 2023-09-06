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
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createProduct);
});

// @desc     Update a Products
// @route    POST /api/products
// @access   Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Resource not Found.`);
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();
  res.status(201).json(updatedProduct);
});

// @desc     Delete a Products
// @route    POST /api/products
// @access   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Resource not found`);
  }

  await Product.deleteOne({ _id: product._id });
  res.status(200).json({ message: 'Product Deleted Successfully' });
});

export {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
