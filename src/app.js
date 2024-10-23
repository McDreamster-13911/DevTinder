const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")
const PORT = 8000;
require('dotenv').config();


const app = express();

// Middlware to receive and read data in JSON format
app.use(express.json());



// APIS
// Signup API - POST to add / insert new user
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
        res.status(400).send(`Error saving the user data : ${err}`);
    }
    
})

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req,res) => {

    try{
        const users = await User.find();
        console.log(users);
        if(!users)
        {
          res.status(404).send("Users not found");
        }
        else
          res.send(users);
    }
    catch(err)
    {
      res.status(400).send("Something went wrong");
    }
})

// User API - GET specific user by email
app.get("/user", async (req,res) => {

  const userEmail = req.body.emailId;
  try{
    const user = await User.findOne({emailId : userEmail});
    console.log(user);

    if(!user){
      res.status(404).send("User not found");
    }
    else
      res.send(user);
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }
})

// Delete User API - DELETE a specific user
app.delete("/user", async (req,res) => {

  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted sucessfully");
  }
  catch(err) {
    res.status(400).send("Something went wrong");
  }
})

// Update User API - PATCH a specific use
app.patch("/user", async (req,res) => {
  const userEmail = req.body.emailId;
  const data = req.body;
  try{
    const user = await User.updateOne({emailId : userEmail}, data, {runValidators: true});
    res.send("User updated successfully");
  }catch(err){
    res.status(400).send(`Something went wrong : ${err}`);
  }
})


// Connection to the database
connectDB()
  .then(() => {
    console.log("Connection to the database established successfully");
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.log("Error in establishing Database connection");
  });





