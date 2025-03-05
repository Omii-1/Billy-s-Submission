import express from "express";
import bcrypt from "bcryptjs";

import User from "../model/user.model.js";
import generateTokenSetCookies from "../utils/generateToken.js";

const router = express.Router();

// signup
router.post("/signup", async (req, res) => {
  try {
    const {fullName, email, password} = req.body;

    const user = await User.findOne({email})

    if(user){
      return res.status(400).json({error: "User already exist"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)

    const newUser = new User({
      fullName,
      email,
      password: hashPass
    })

    if(newUser){
      generateTokenSetCookies(newUser._id, newUser.role, res)
      await newUser.save()

      return res.status(201).json({
        msg: "User created successfully",
        _id: newUser._id,
      })
    } else {
      return res.status(400).json({error: "Invalid user data"})
    }
  } catch (error) {
    console.log("Error in singup controller", error.message);
    return res.status(500).json({error: "Internal server error"})
  }
})

// signin
router.post("/signin", async(req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

    if(!user || !isPasswordCorrect){
      return res.status(400).json({error : "Invalid username and password"})
    }

    generateTokenSetCookies(user._id, user.role, res)

    return res.status(201).json({
      message: "Login successfully",
      _id: user._id
    })
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({error: "Internal server error"})
  }
})

// logout
router.post("/logout", (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0})
    res.cookie("role", "", {maxAge: 0})
    return res.status(201).json({message: "Logged out successfully"})
  } catch (error) {
    console.log("Error in logout controlller", error.message);
    return res.status(500).json({error: "Internal server error"})
  }
})

export default router;
