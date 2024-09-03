const express = require('express');
const fetchEthereumPrice = require('../fetchPrice');

const router = express.Router();

// Route to fetch and store Ethereum price on-demand
router.get('/fetch', async (req, res) => {
  try {
    await fetchEthereumPrice();
    res.status(200).json({ message: 'Ethereum price fetched and stored successfully.' });
  } catch (error) {
    console.error('Error in price route:', error);
    res.status(500).json({ error: 'An error occurred while fetching the Ethereum price.' });
  }
});

module.exports = router;
