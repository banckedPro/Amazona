import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/Product.js';

// @desc     Fetch All Products
// @route    GET /api/products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  // Set Page Size
  const pageSize = process.env.PAGE_SIZE;

  // Set Page Number
  const page = Number(req.query.pageNumber) || 1;

  // Get Search Keyword
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  // Get total number of documents
  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
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

// @desc     Create a Review
// @route    POST /api/products/:id/reviews
// @access   Private/Admin
const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Resource not found`);
  }

  const { rating, comment } = req.body;

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Product already reviewed');
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({ message: 'Review Added' });
});

export {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
