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

const allowedOrigins = [
  "https://billy-s-frontend.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", userAuth);
app.use("/api/v1/movie", movieRoutes);

app.listen(port, () => {
  connectToMongoose()
  console.log(`Server running on port ${port}`);
})