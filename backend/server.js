import mongoose from "mongoose"
import express from "express";
import dotenv from "dotenv";
// import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js";
import userRoute from "./routes/router.js";
dotenv.config()
const app = express()
connectDB();
const PORT = 3000;


// app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/user", userRoute)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
