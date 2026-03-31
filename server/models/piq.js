import mongoose from "mongoose";



const PiqSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  fullName: {
    type: String,
    required: true
  },

  placeOfBirth: {
    type: String
  },

  education: {
    tenthSchool: String,
    tenthPercentage: Number,

    twelfthSchool: String,
    twelfthPercentage: Number,
    stream: String,

    graduationCollege: String,
    degree: String,
    cgpa: Number
  },

  hobbies: [
    {
      type: String
    }
  ],

  achievements: [
    {
      type: String
    }
  ],

  goal: {
    type: String
  },

  family: {
    fatherOccupation: String,
    motherOccupation: String,
    siblings: Number
  }

},
{ timestamps: true }
);

export default mongoose.model("Piq", PiqSchema);