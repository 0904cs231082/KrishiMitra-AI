import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: API_KEY,
});

export async function askGemini(question) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: question,
    });

    console.log("FULL RESPONSE:", response);

    return response.text;
  } catch (error) {
    console.error("GEMINI FULL ERROR:", error);
    throw error;
  }
}