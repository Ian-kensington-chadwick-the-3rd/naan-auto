
require('dotenv').config()
const mongoose = require('mongoose');

// || 'mongodb://127.0.0.1:27017/naan-auto'
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/naan-auto')



module.exports = mongoose.connection;

