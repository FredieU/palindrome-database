const express = require('express');
const router = express.Router()
const { getPalindromes, savePalindrome } = require('../data/palindromes.model');

module.exports = router

// Main endpoint to return a list of existing palindromes.
router.get('/', async (req, res) => {
  await getPalindromes()
  .then(palindromes => res.status(200).json(palindromes))
  .catch(err => {
    res.status(500).json({error: err.message});
  });
});

// Checks whether the string is a palindrome, returns an object with a 
// true/false key.
router.post('/check/:string', async (req, res) => {
  const string = req.params.string.replace(/[\s',.;:`?]/g, '').toLowerCase();
  const reverse = string.split('').reverse().join('').toLowerCase();

  if(req.params.string.length == 0) {
    res.status(400).json({message: 'Submitted string is empty.'});
  } else if(string == reverse) {
    await savePalindrome(req.params.string)
    .then(response => {
      const status = !response.message ? 201 : 200;
      res.status(status).json({isPalindrome: true, ...response});
    })
    .catch((err) => {
      res.status(500).json({error: err})
    });
  } else {
    res.status(200).json({isPalindrome: false, string: req.params.string});
  }
});