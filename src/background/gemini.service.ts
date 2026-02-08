import { GoogleGenAI } from "@google/genai";
import type { PRExtractedData } from "../shared/types";
import { buildPRPrompt } from "./utils/buildPRPrompt";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("Missing Gemini API key");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const analyzePRWithGemini = async (PrPayload: PRExtractedData) => {
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
