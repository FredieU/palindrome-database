const express = require('express');
const router = express.Router();

module.exports = router;

// Set '/api/v1/palindromes' as the main route with 
// sub-routes from './palindromes'.
router.use('/api/v1/palindromes', require('./palindromes'));