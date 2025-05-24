const mongoose = require('mongoose');


// || 'mongodb://127.0.0.1:27017/naan-auto'
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(process.env.MONGODB_URI)
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

module.exports = mongoose.connection;

