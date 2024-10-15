const mongoose = require("mongoose");
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const connection_string = process.env.DATABASE_CONNECT_STRING;


const connectDB = async() => {
    await mongoose.connect(
        connection_string
    );
}; 

module.exports  = connectDB;

