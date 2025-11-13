import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("Missing Gemini API key");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const generativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
