import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {createError} from "../utils/createError.js";

export const signup = async(req,res)=>{
   try{
      const {name,email,password} = req.body;
       if(!email || !password  || !name){
   return next(createError(400," All fields are required"));
  }
      const existingUser = await User.findOne({email});
      if(existingUser){
         return next( createError(400,"User already exist!"));
         };
      
      const hashedPassword  = await  bcrypt.hash(password,10);
      const user = new User({
         name,
         email,
         password:hashedPassword
      });
      await user.save();
      res.status(201).json({
         message:"User created successfully!",
      });

   }catch(err){
      next(err);
   }
};

export const login = async (req,res,next)=>{
 try{

  const {email,password} = req.body;


  if(!email || !password){
   return next(createError(400,"Email and password are required"));
  }


  const user = await User.findOne({email});

  if(!user){
   return next(createError(404,"User not found"));
  }


  const isPasswordCorrect = await bcrypt.compare(password,user.password);

  if(!isPasswordCorrect){
   return next(createError(401,"Invalid credentials"));
  }

 
  const token = jwt.sign(
   {id:user._id},
   process.env.JWT_SECRET,
   {expiresIn:"7d"}
  );

  const {password:_,...userData} = user._doc;

  res.status(200).json({
   token,
   user:userData
  });

 }catch(err){
  next(err);
 }
};
 