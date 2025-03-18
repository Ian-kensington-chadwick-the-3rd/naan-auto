const mongoose = require('mongoose')
const { Schema } = mongoose;

const carSchema = new Schema({
    year:{
        type: Number,
        required: true
    },
    make:{
        type: String,
        required:true
    },
    model:{
        type: String,
        required:true
    },
    mileage:{
        type: Number,
        required:true
    },
    description:{
        type: String,        
    },
    trans:{
        type: String
    },
    imageUrl:{
        type: [String]
    },
    price:{
        type: Number
    },
    vin: {
        type: String
    },
    drivetrain:{
        type: String
    },
    exteriorColor:{
        type: String
    },
    interiorColor:{
        type: String
    },
    fuelType:{
        type: String
    },
    engineType: {
        type: String
    },
    condition:{
        type: String
    },
    titleHistory:{
        type: String
    },
    ownership:{
        type: String
}
});

const Car = mongoose.model('Car',carSchema);


const passwordSchema = new Schema({
    password:{
        type: String
    }
})

const Password = mongoose.model('Password',passwordSchema);

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    admin:{
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);



module.exports = { Car, Password, User };