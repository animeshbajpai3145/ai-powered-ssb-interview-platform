import Piq from "../models/piq.js";
import {createError} from "../utils/createError.js";



export const createPiq = async(req,res,next)=>{
   try{
       const existing= await Piq.findOne({userId:req.user.id});
       if(existing){
      return next(createError(400,"PIQ already exists"));
       }

   const piq = await Piq.create({
      ...req.body,userId:req.user.id

   });
   console.log(piq);
   res.status(201).json({
      message: "PIQ created successfully",
   });

   }catch(err){
        next(err);
   }
};

export const  getPiq = async(req,res,next)=>{
   try{
       const piq = await Piq.findOne({userId:req.user.id});
       if(!piq){
         return res.status(200).json({
            exists:false,
            message:"PIQ  not found",
         });
       }
       res.status(200).json({
         exists:true,
         piq
         
       });
   }catch(err){
      next(err);
   }
};

export const updatePiq = async (req,res,next)=>{
 try{

   const piq = await Piq.findOne({userId:req.user.id});

   if(!piq){
      return res.status(404).json({
        success:false,
        message:"PIQ not found"
      });
   }

   const updated = await Piq.findOneAndUpdate(
      {userId:req.user.id},
      {$set:req.body},
      {new:true}
   );

   res.status(200).json(updated);

 }catch(err){
   next(err);
 }
}

export const deletePiq = async (req,res,next)=>{
 try{

  const userId = req.user.id;

  const piq = await Piq.findOne({userId});

  if(!piq){
   return res.status(404).json({
    message:"PIQ not found"
   });
  }

   const deleted = await Piq.findByIdAndDelete(piq._id);
   console.log(deleted);
  res.status(200).json({
   message:"PIQ deleted successfully"
  });

 }catch(err){
  next(err);
 }
};

