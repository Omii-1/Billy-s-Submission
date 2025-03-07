import jwt from "jsonwebtoken";

const generateTokenSetCookies = (userId, role, res) => {
  
  const token = jwt.sign({id: userId, role}, process.env.JWT_SECRET, {
    expiresIn: "15d"
  })

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: "None",
    secure: process.env.NODE_ENV !== "development"
  })
  
  res.cookie("role", role, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: "None",
    secure: process.env.NODE_ENV !== "development"
  })

  res.cookie("id", userId, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: "None",
    secure: process.env.NODE_ENV !== "development"
  })
}

export default generateTokenSetCookies;
