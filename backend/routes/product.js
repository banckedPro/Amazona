import products from '../data/products';

const router = require('express').Router();

router.route.get('/api/products', (req, res) => {
  res.json(products);
});

router.route.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);

  res.json(product);
});

export default router;
