
const mongoose = require("mongoose");
const validator = require("validator");

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
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email Address : " + value);
                }
            },
        },
        password : {
            type: String,
            required: true,
            trim: true,
            minLength: 8,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Enter a strong password : " + value);
                }
            },
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
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error("Invalid Photo URL : " + value);
                }
            },
        },
        about : {
            type: String,
            default: "This is a default desc of the user",
        },
        skills: {
            type: [String],
            validate(value){
                if(value > 8)
                    throw new Error("Skills cannot be more than 8");
            }
        }
    },
    {
        timestamps : true,
    }
);

// Creating a Mongoose Model for the created Schema

const User = mongoose.model("User", userSchema);

module.exports = User;