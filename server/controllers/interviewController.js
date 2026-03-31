import InterviewSession from "../models/Interview.js";
import Piq from "../models/piq.js";
import { generateQuestions, generateReport } from "../services/ai.service.js";
import { createError } from "../utils/createError.js";


// START INTERVIEW
export const startInterview = async (req,res,next)=>{
 try{

   const userId = req.user.id;

   const thirtyDaysAgo = new Date();
   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

   const count = await InterviewSession.countDocuments({
     userId,
     createdAt:{
       $gte: thirtyDaysAgo
     }
   });

   if(count >= 3){
     return res.status(400).json({
       message:"You can only take 3 interviews in 30 days"
     });
   }

   const piq = await Piq.findOne({userId});

   if(!piq){
     return res.status(404).json({
       message:"PIQ not found"
     });
   }

   const questions = await generateQuestions(piq);

   const formattedQuestions = questions.map((q,i)=>({
     questionText:q,
     questionNumber:i+1
   }));

   const session = await InterviewSession.create({
     userId,
     piqId:piq._id,
     questions:formattedQuestions,
     status:"started"
   });

   res.status(200).json({
     sessionId:session._id,
     questions:formattedQuestions
   });

 }catch(err){
   next(err);
 }
};



export const submitInterview = async (req,res,next)=>{
 try{

   const {sessionId,responses} = req.body;

   const session = await InterviewSession.findById(sessionId);

   if(!session){
     return res.status(404).json({
       message:"Interview session not found"
     });
   }
     if(session.status === "completed"){
    return res.status(400).json({
      message:"Interview already submitted"
    });
  }


   session.responses = responses;

  try{

  reportData = await generateReport(responses);

}catch(error){

  return next(createError(500,"AI evaluation failed"));

}

   session.report = {
     communicationScore:reportData.communicationScore,
     confidenceScore:reportData.confidenceScore,
     leadershipScore:reportData.leadershipScore,
     reasoningScore:reportData.reasoningScore,
     initiativeScore:reportData.initiativeScore
   };

   session.suggestions = reportData.suggestions;

   session.status = "completed";

   session.reportGeneratedAt = new Date();

   await session.save();

   res.status(200).json({
     message:"Interview submitted successfully",
     sessionId: session._id,
     report:session.report,
     suggestions:session.suggestions,
     generatedAt:session.reportGeneratedAt
   });

 }catch(err){
   next(err);
 }
};




export const getInterviewReport = async (req,res,next)=>{
 try{

   const {sessionId} = req.params;

   const session = await InterviewSession.findById(sessionId);

   if(!session){
     return res.status(404).json({
       message:"Interview not found"
     });
   }

   res.status(200).json({
     report:session.report,
     suggestions:session.suggestions,
     generatedAt:session.reportGeneratedAt
   });

 }catch(err){
   next(err);
 }
};



export const getInterviewHistory = async (req,res,next)=>{
 try{

   const userId = req.user.id;

   const sessions = await InterviewSession.find({
      userId,
      status:"completed"
   })
   .sort({reportGeneratedAt:-1});

   res.status(200).json({
      total:sessions.length,
      history:sessions.map(session => ({
         sessionId:session._id,
         report:session.report,
         suggestions:session.suggestions,
         generatedAt:session.reportGeneratedAt
      }))
   });

 }catch(err){
   next(err);
 }
};