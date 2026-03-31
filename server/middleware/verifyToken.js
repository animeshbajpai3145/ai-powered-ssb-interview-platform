import jwt from "jsonwebtoken";
import {createError} from "../utils/createError.js";

export const verifyToken = (req,res,next)=>{
   try{
      const authHeader = req.headers.authorization;
      if(!authHeader){
         return next(createError(401,"No to token provided!"));

      }
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      req.user = decoded;
      next();

   }catch(err){
      next(err);
   }
}