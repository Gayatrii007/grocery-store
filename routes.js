const express = require('express');
const router = express.Router();

// Sample products
const products = [
  { id: 1, name: 'Apple', price: 1.00, description: 'Fresh red apple', image: 'apple.jpg' },
  { id: 2, name: 'Banana', price: 0.50, description: 'Ripe yellow bananas', image: 'banana.jpg' },
  { id: 3, name: 'Carrot', price: 0.30, description: 'Fresh carrots', image: 'carrot.jpg' },
  // Add more products here
];

// Index page with product listing
router.get('/', (req, res) => {
  res.render('index', { products });
});

// View product details
router.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p.id == productId);
  
  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.render('product', { product });
});

// Add to cart
router.post('/add-to-cart', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id == productId);

  if (!req.session.cart) {
    req.session.cart = [];
  }

  // Check if product is already in cart
  const existingProduct = req.session.cart.find(item => item.product.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += parseInt(quantity);
  } else {
    req.session.cart.push({ product, quantity: parseInt(quantity) });
  }

  res.redirect('/cart');
});

// View cart
router.get('/cart', (req, res) => {
  res.render('cart', { cart: req.session.cart });
});

// Checkout
router.get('/checkout', (req, res) => {
  res.render('checkout');
});

module.exports = router;
