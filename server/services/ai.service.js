

import { GoogleGenerativeAI } from "@google/generative-ai";

    

export const generateQuestions = async (piq) => {
  
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

  

  const prompt = `
You are an SSB interview officer.

Based on the following PIQ generate 5 interview questions.

${JSON.stringify(piq)}

Return ONLY a JSON array of questions.
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  return JSON.parse(text.replace(/```json|```/g, ""));
};

export const generateReport = async (responses) => {
  
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

const prompt =`Evaluate the candidate's responses for an SSB interview.

Candidate Responses:
${JSON.stringify(responses)}

Score the candidate from 1 to 10 in the following areas:

1. Communication
2. Confidence
3. Leadership
4. Reasoning
5. Initiative

Also provide only 3 improvement suggestions for the candidate.

IMPORTANT:
Return ONLY valid JSON. Do not include any explanation or extra text.

Use this exact JSON structure:

{
  "communicationScore": number,
  "confidenceScore": number,
  "leadershipScore": number,
  "reasoningScore": number,
  "initiativeScore": number,
  "suggestions": [
    "suggestion 1",
    "suggestion 2",
    "suggestion 3"
  ]
}`;


  const result = await model.generateContent(prompt);

  const text = result.response.text();

  return JSON.parse(text.replace(/```json|```/g, ""));
};