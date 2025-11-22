import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("Missing Gemini API key. Please set VITE_GEMINI_API_KEY in your .env file");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Using Gemini 3.0 Pro Preview for advanced reasoning and analysis
export const generativeModel = genAI.getGenerativeModel({ 
  model: "gemini-3-pro-preview",
  generationConfig: {
    temperature: 1.0, // Recommended default for Gemini 3
  }
});
