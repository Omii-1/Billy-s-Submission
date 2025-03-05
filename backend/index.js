import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'

import connectToMongoose from "./db/conn.js"
import userAuth from "./routes/userAuth.routes.js"
import movieRoutes from "./routes/movie.routes.js"

configDotenv({
  path: "./.env"
})

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", userAuth);
app.use("/api/v1/movie", movieRoutes);

app.listen(port, () => {
  connectToMongoose()
  console.log(`Server running on port ${port}`);
})