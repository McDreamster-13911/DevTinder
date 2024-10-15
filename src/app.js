const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")
const PORT = 8000;
require('dotenv').config();


const app = express();

// APIS

app.post("/signup", async (req,res) => {
    const userObj = {
        firstName : "John",
        lastName : "Doe",
        emailId : "johndoe@gmail.com",
        password: "johndoe@123"
    }

    // Creating a new instance of the User Model
    const user = new User(userObj);

    try {
        await user.save();
        res.send("User Added Successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user data");
    }
    
})




connectDB()
  .then(() => {
    console.log("Connection to the database established successfully");
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.log("Error in establishing Database connection");
  });





