const express = require('express');
const axios = require('axios');
const Transaction = require('../models/Transaction');


const router = express.Router();

router.get('/:address', async (req, res) => {
  const { address } = req.params;
  const { ETHERSCAN_API_KEY } = process.env;

  try {
    // Step 1: Fetch transactions from Etherscan
    const response = await axios.get(`https://api.etherscan.io/api`, {
      params: {
        module: 'account',
        action: 'txlist',
        address: address,
        startblock: 0,
        endblock: 99999999,
        sort: 'asc',
        apikey: ETHERSCAN_API_KEY,
      },
    });

    const transactions = response.data.result;

    if (!transactions.length) {
      return res.status(404).json({ message: 'No transactions found.' });
    }

    // Step 2: Store transactions in MongoDB
    await Transaction.insertMany(
      transactions.map((tx) => ({ ...tx, address }))
    );

    // Step 3: Respond with the transactions
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching or storing transactions:', error);
    res.status(500).json({ error: 'An error occurred while fetching or storing transactions.' });
  }
});

module.exports = router;
