import jwt from "jsonwebtoken";

const generateTokenSetCookies = (userId, role, res) => {
  const token = jwt.sign({userId, role}, process.env.JWT_SECRET, {
    expiresIn: "15d"
  })

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  })

  res.cookie("role", role)
}

export default generateTokenSetCookies;
