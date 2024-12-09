const mongoose = require('mongoose'); 


mongoose.connect( 'mongodb://127.0.0.1:27017/naan-auto');

module.exports = mongoose.connection;

// process.env.MONGODB_URI ||