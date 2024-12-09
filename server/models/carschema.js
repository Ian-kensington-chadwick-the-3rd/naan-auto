const mongoose = require('mongoose')
const { Schema } = mongoose;

const carSchema = new Schema({
    Year:{
        type: Number,
        required: true
    },
    Make:{
        type: String,
        required:true
    },
    Mileage:{
        type: Number,
        required:true
    },
    Description:{
        type: String,        
    },
    Trans:{
        type: String
    },
    imageUrl:{
        type: [String]
    }
});

const Car = mongoose.model('Car',carSchema);

module.exports = { Car };