import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
import { globalRateLimiter } from "./middleware/rateLimiter.js";

import  errorHandler  from "./middleware/error.js";
import userRoutes from "./routes/userRoute.js";
import piqRoutes from "./routes/piqRoute.js";
import interviewRoutes from "./routes/interviewRoute.js";



const app = express();
app.use(cors());
app.use("/api", globalRateLimiter);
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/piqs", piqRoutes);
app.use("/api/interviews",interviewRoutes);
const connect_Db = async()=>{
   try{
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to Database succcesfully!");
   }catch(err){
      console.log("Database connection failed:",err);
   }
}


app.get("/",(req,res)=>{
 res.send("working");


});

app.use(errorHandler);
app.listen(8080,()=>{
   connect_Db();
   console.log("Server is runner on port 8080");
});