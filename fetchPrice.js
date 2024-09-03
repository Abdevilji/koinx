const axios = require('axios');
const Price = require('./models/Price');

// Function to fetch and store Ethereum price
const fetchEthereumPrice = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'ethereum',
        vs_currencies: 'inr',
      },
    });

    const ethPriceInINR = response.data.ethereum.inr;

    // Save the price in the database
    const price = new Price({ price: ethPriceInINR });
    await price.save();

    console.log(`Ethereum price fetched and stored: ₹${ethPriceInINR}`);
  } catch (error) {
    console.error('Error fetching Ethereum price:', error);
  }
};

module.exports = fetchEthereumPrice;
