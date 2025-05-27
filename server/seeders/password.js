require('dotenv').config();
const bcrypt = require('bcrypt');
const { User } = require('../models/carschema');
const { v4: uuidv4} = require('uuid');


const saltRounds = 10;
const myEnvPassword = process.env.ADMIN_PASSWORD
const adminUserName = process.env.ADMIN_USERNAME

const seedDataBase = async () => {
    try {
        const adminExist = await User.findOne({username: adminUserName}).exec();
        if (adminExist) {
            console.log("password has already been inserted skipping creation");
            console.log("admin username already exist skipping creation");
            return;
        };
        const randomId = uuidv4()
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(myEnvPassword, salt);
        await User.create({
            username: adminUserName, 
            admin: randomId, 
            password: hash
        });
        console.log("database seeded successfully!!!!");
    } catch (err) {
        console.log('database failed to insert hash', err);
    };
    
};

module.exports = seedDataBase;