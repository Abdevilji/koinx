# Ethereum Transaction Expense Tracker

## Overview

A Node.js application to fetch Ethereum transactions, calculate gas expenses, and retrieve the current Ether price. Data is stored in MongoDB.

## Key Features

- **Fetch Transactions**: Retrieves Ethereum transactions using Etherscan API and stores them in MongoDB.
  - **Route**: `GET /api/transactions/:address`
  - **File**: `routes/transactions.js`
  
- **Fetch Ethereum Price**: Fetches the current Ether price from CoinGecko API every 10 minutes.
  - **Route**: `GET /api/price/fetch`
  - **File**: `routes/price.js`
  - **Scheduled Task**: `fetchPrice.js`
  
- **Calculate Expenses**: Calculates the total gas expenses for transactions of a given address.
  - **Route**: `GET /api/expense/:address`
  - **File**: `routes/expense.js`

## Folder Structure

```plaintext
ethereum-expense-tracker/
├── fetchPrice.js          # Scheduled task for fetching Ethereum price
├── index.js               # Main server file
├── models/
│   ├── Transaction.js     # Mongoose model for transactions
│   └── Price.js           # Mongoose model for Ether price
├── routes/
│   ├── transactions.js    # Route for fetching transactions
│   ├── price.js           # Route for fetching Ethereum price
│   └── expense.js         # Route for calculating expenses
└── README.md
