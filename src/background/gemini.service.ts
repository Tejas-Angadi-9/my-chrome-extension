import { GoogleGenAI } from "@google/genai";
import type { BuildPRPromptOptions } from "../interfaces/backgroundScripts.interface";
import buildPRPrompt from "./utils/buildPRPrompt";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("Missing Gemini API key");
}

const ai: GoogleGenAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const analyzePRWithGemini = async (PrPayload: BuildPRPromptOptions) => {
  const prompt: string = buildPRPrompt(PrPayload);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });
    return response.text;
  } catch (error) {
    console.error("GEMINI API FAILED: ", error);
  }
};
