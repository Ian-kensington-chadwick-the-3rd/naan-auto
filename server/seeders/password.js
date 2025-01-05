require('dotenv').config();
const bcrypt = require('bcrypt');
const { Password, User } = require('../models/carschema');
const { v4: uuidv4} = require('uuid');
const db = require('../config/connection')

const saltRounds = 10;
const myEnvPassword = process.env.ADMIN_PASSWORD
const adminUserName = process.env.ADMIN_USERNAME

const seedDataBase = async () => {
    try {
        const existingUserName = await User.findOne()
        const existingPassword = await Password.findOne();
        if (existingPassword && existingUserName) {
            console.log("password has already been inserted skipping creation")
            console.log("admin username already exist skipping creation")
            return;
        }
        const randomId = uuidv4()
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(myEnvPassword, salt);
        await User.create({Username: adminUserName, Admin: randomId })
        await Password.create({ Password: hash });
        
        console.log("database seeded successfully!!!!")
    } catch (err) {
        console.log(myEnvPassword)
        console.log('database failed to insert hash', err)
    }
    
}

module.exports = seedDataBase;