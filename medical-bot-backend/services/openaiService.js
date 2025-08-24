import { GoogleGenAI } from "@google/genai";
import { OPENAI_API_KEY } from "../config/index.js"; // If still using OpenAI for fallback

const ai = new GoogleGenAI({ apiKey: OPENAI_API_KEY });

export async function askAI(prompt) {
  const response = await ai.models.generateContent({
    model: "gpt-4", // Use OpenAI if needed; else adapt
    contents: prompt,
  });
  return response.text;
}
