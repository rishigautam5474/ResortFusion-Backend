// const express = require('express');
import env from "dotenv";
import express from "express";
import connectMongoDb from "./connection.js";
import userRouter from './routes/userRoute.js'
import adminRouter from './routes/adminRoute.js'
const app = express();

env.config();

//MongoDb Connection
connectMongoDb(
  "mongodb+srv://rishigautam5474:rishi5474@rishiapidatabase.rstsy.mongodb.net/ResortFusionHotelStar"
).then(() => {
  "Connect MongoDb";
}).catch((err) => {
    console.log(err)
});

// Port
const PORT = 5001;

//Middleware
app.use(express.json());

//Routers
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)

app.get("/api", (req, res) => {
  res.send("Welcome ResortFusion");
});

app.listen(PORT, () => {
    console.log(`${PORT} yes I am Connected`);
});