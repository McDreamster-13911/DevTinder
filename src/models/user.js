
const mongoose = require("mongoose");

// Creating the User Schema
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        emailId : {
            type: String
        },
        password : {
            type: String
        },
        age : {
            type : Number
        },
        gender : {
            type: String
        }
    }
);

// Creating a Mongoose Model for the created Schema

const User = mongoose.model("User", userSchema);

module.exports = User;