import express from "express";
import bcrypt from "bcryptjs";
import zod from "zod";

import User from "../model/user.model.js";
import generateTokenSetCookies from "../utils/generateToken.js";

const router = express.Router();

const signUpBody = zod.object({
  fullName: zod.string().min(4, "Name must be at least 4 chars"),
  email: zod.string().email("Invalid email"),
  password: zod.string().min(6, "Password must be at least 6 chars"),
}).strict();

const signInBody = zod.object({
  email: zod.string().email("Invalid email"),
  password: zod.string().min(6, "Password must be at least 6 chars"),
}).strict();

// signup
router.post("/signup", async (req, res) => {
  try {
    const validation = signUpBody.safeParse(req.body);

    if(!validation.success){
      return res.status(400).json({
        error: validation.error.format()
      })
    }
    
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
        message: "User created successfully",
        _id: newUser._id,
        role: newUser.role
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

    const validation = signInBody.safeParse({email, password});

    if(!validation.success){
      return res.status(400).json({
        error: validation.error.format()
      })
    }


    const user = await User.findOne({email});

    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

    if(!user || !isPasswordCorrect){
      return res.status(400).json({error : "Invalid username and password"})
    }
    
    generateTokenSetCookies(user._id, user.role, res)

    return res.status(201).json({
      message: "Login successfully",
      _id: user._id,
      role: user.role,
    })
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({error: "Internal server error"})
  }
})

// logout
router.post("/logout", (req, res) => {
  try {
    res.cookie("jwt", "", {
      expires: new Date(0), 
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "None",
    });

    res.cookie("role", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "None",
    });

    res.cookie("id", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "None",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// checking the cookies
router.get("/check", (req, res) => {
  const { jwt, role, id } = req.cookies;

  if(!jwt || !role || !id){
    return res.status(401).json({
      isAuthenticated: false,
      error: "User is not authenticated"
    })
  }

  return res.status(201).json({
    message: "User is authenticated",
    isAuthenticated: true,
    id,
    role
  })
})


export default router;
