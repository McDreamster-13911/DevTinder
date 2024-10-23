
const mongoose = require("mongoose");

// Creating the User Schema
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50,
        },
        lastName: {
            type: String
        },
        emailId : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password : {
            type: String,
            required: true,
            trim: true,
            minLength: 8,
        },
        age : {
            type : Number,
            required: true,
            min: 18,

        },
        gender : {
            type: String,
            required: true,
            validate(value) {
                if(!["male", "female"].includes(value))
                {
                    throw new Error("Invalid Gender");
                }
            }
        },
        photoUrl : {
            type: String,
        },
        about : {
            type: String,
            default: "This is a default desc of the user",
        },
        skills: {
            type: [String],
        }
    },
    {
        timestamps : true,
    }
);

// Creating a Mongoose Model for the created Schema

const User = mongoose.model("User", userSchema);

module.exports = User;