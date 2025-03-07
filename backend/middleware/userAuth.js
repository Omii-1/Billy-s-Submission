import jwt from "jsonwebtoken"
import User  from "../model/user.model.js"

const userAuth = async(req, res, next) => {
  let token = req.cookies.jwt; 

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1]; 
  }

  if(!token) {
    return res.status(400).json({error: "Unauthorized - No token provided"})
  }

  try {
    const decodedToken = jwt.verify(token , process.env.JWT_SECRET)
    
    const user = await User.findById(decodedToken?.id).select("-password")

    if(!user){
      return res.status(400).json({error: "User not found"})
    }

    req.user = user

    next()
  } catch (error) {
    console.log("Error in auth.middleware: ", error)
    return res.status(500).json({message: "Internal server error"})
  }
}

export default userAuth;