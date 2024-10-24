const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const User = require("./models/user")
const PORT = 8000;
require('dotenv').config();
const {validateSignUpData} = require("./utils/validation");

const app = express();

// Middlware to receive and read data in JSON format
app.use(express.json());



// APIS
// Signup API - POST to add / insert new user
app.post("/signup", async (req,res) => {
    // console.log(req.body);

    try{

    // Validation of Data
    validateSignUpData(req);

    const {firstName, lastName, emailId, password, age, gender} = req.body;
    
    // Encrypting Password
    const passwordHash = await bcrypt.hash(password, 10);

  
    // Creating a new instance of the User Model
    // const userObj = new User(req.body); // This is a very bad of writing creating the User Instance

    const userObj = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
    });

    const user = new User(userObj);
    
    await user.save();
    res.send("User Added Successfully");
    }
    catch(err){
        res.status(400).send(`Error saving the user data : ${err}`);
    }
    
})

// Login API - POST to login
app.post("/login", async (req,res) => {
  try{
      const {emailId, password} = req.body;

      const user = await User.findOne({emailId: emailId});

      if(!user){
        throw new Error("Invalid Credentials");
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if(isPasswordValid)
      {
        res.send("Login Successful!");
      }
      else{
        throw new Error("Invalid Credentials");
      }



  }catch(err){
      res.status(400).send("ERROR: "+ err.message);
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
    const ALLOWED_UPDATES = [
      "about", "photoUrl", "gender", "age"
    ];
  
    const isUpdateAllowed = Object.keys(data).every(key => ALLOWED_UPDATES.includes(key));
  
    if(!isUpdateAllowed)
    {
      throw new Error("Update not allowed");
    }
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





