import jwt from "jsonwebtoken";

const generateTokenSetCookies = (userId, role, res) => {
  
  const token = jwt.sign({id: userId, role}, process.env.JWT_SECRET, {
    expiresIn: "15d"
  })

  const isProduction = process.env.NODE_ENV === "PROD";

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction
  })
  
  res.cookie("role", role, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction
  })

  res.cookie("id", userId, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction
  })
}

export default generateTokenSetCookies;
