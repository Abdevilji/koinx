const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');

const connectDB= async()=>mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

    exports.connectDB=connectDB;    