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


const passwordSchema = new Schema({
    Password:{
        type: String
    }
})

const Password = mongoose.model('Password',passwordSchema);

const userSchema = new Schema({
    Username:{
        type: String,
        required: true
    },
    Admin:{
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);



module.exports = { Car, Password, User };