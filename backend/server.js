import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from 'dns';
import productRouter from "./routes/productRoute.js";
import contactRouter from "./routes/contactRoute.js";
// import "../backend/config/cloudinary.js"
import 'dotenv/config'
import './config/cloudinary.js'

// change DNS

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  "http://localhost:5000",
  "https://atoz-fronted.vercel.app/",
  "https://atoz-backend-kohl.vercel.app/" 

];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow non-browser tools like Postman
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(' CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // if using cookies or Authorization headers
};

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//api endpoints
app.use("/api/products", productRouter);
app.use("/api/contact", contactRouter);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// connect DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});