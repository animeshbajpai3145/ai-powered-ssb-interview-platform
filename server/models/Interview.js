import mongoose from "mongoose";

const InterviewSessionSchema = new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  piqId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Piq"
  },

  questions:[
    {
      questionText:{
        type:String,
        required:true
      },
      questionNumber:Number
    }
  ],

  responses:[
    {
      question:String,
      answer:String
    }
  ],

  report:{
    communicationScore:Number,
    confidenceScore:Number,
    leadershipScore:Number,
    reasoningScore:Number,
    initiativeScore:Number
  },

  suggestions:[String],

  currentQuestionIndex:{
    type:Number,
    default:0
  },

  totalQuestions:{
    type:Number,
    default:5
  },

  status:{
    type:String,
    enum:["started","completed"],
    default:"started"
  }

},{timestamps:true});


// Index for fast queries
InterviewSessionSchema.index({ userId:1, createdAt:1 });

export default mongoose.model("InterviewSession", InterviewSessionSchema);