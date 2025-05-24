const mongoose = require('mongoose'); 
require('dotenv').config()

// || 'mongodb://127.0.0.1:27017/naan-auto'
mongoose.connect(process.env.MONGODB_URI );

module.exports = mongoose.connection;

