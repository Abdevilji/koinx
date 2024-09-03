const express = require('express');
const Transaction = require('../models/Transaction');
const Price = require('../models/Price');

const router = express.Router();

// Route to calculate total expenses and return the current Ether price
router.get('/:address', async (req, res) => {
  const { address } = req.params;

  try {
    // Fetch transactions from the database
    const transactions = await Transaction.find({ from: address });
    console.log(transactions);

    if (!transactions.length) {
      return res.status(404).json({ message: 'No transactions found for this address.' });
    }

    // Calculate total expenses
    let totalExpenses = transactions.reduce((acc, tx) => {
      const gasUsed = parseFloat(tx.gasUsed);
      const gasPrice = parseFloat(tx.gasPrice);
      const expense = (gasUsed * gasPrice) / 1e18; 
      return acc + expense;
      
    }, 0);
    console.log(totalExpenses);
    // Fetch the latest Ether price
    const latestPriceDoc = await Price.findOne().sort({ timestamp: -1 });
    const currentEtherPrice = latestPriceDoc ? latestPriceDoc.price : null;

    if (!currentEtherPrice) {
      return res.status(500).json({ error: 'Unable to retrieve the current Ether price.' });
    }

    // Respond with total expenses and current Ether price
    res.json({
      totalExpenses: totalExpenses.toFixed(18), // To display up to 18 decimal places
      currentEtherPrice: currentEtherPrice.toFixed(2), // To display the price with 2 decimal places
    });
  } catch (error) {
    console.error('Error calculating expenses:', error);
    res.status(500).json({ error: 'An error occurred while calculating expenses.' });
  }
});

module.exports = router;
