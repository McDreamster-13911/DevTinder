const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")
const PORT = 8000;
require('dotenv').config();


const app = express();

// Middlware to receive and read data in JSON format
app.use(express.json());



// APIS

app.post("/signup", async (req,res) => {
    // console.log(req.body);
    const userObj = new User(req.body);

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





