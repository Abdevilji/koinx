const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const priceRoutes = require('./routes/price');
const fetchEthereumPrice = require('./fetchPrice');
const transactionRoutes = require('./routes/transactions');
const expenseRoutes = require('./routes/expense');

const { connectDB } = require('./config/db');

dotenv.config();



const app = express();

connectDB();

app.use(express.json());

app.use('/api/transactions', transactionRoutes);
app.use('/api/price', priceRoutes);
app.use('/api/expense', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Schedule the job to run every 10 minutes (600,000 milliseconds)
setInterval(fetchEthereumPrice, 600000);

// Fetch the price immediately when the server starts
fetchEthereumPrice();