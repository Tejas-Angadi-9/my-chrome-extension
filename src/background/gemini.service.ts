const GEMINI_API_KEY = "AIzaSyAyDHe3jAFFakK9u74UMO08P16KWgNcDCw";

import { GoogleGenAI } from "@google/genai";
import type { PRExtractedData } from "../shared/types";
import { buildPRPrompt } from "./utils/buildPRPrompt";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

console.log("GEMINI MODULE STARTED");

export const analyzePRWithGemini = async (PrPayload: PRExtractedData) => {
  console.log("📦 Payload received in background:", PrPayload);

  const prompt: string = buildPRPrompt(PrPayload);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5.flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });
    console.log("✅ Gemini API success");
    console.log("RESPONSE: ", response.text);
    return response.text;
  } catch (error) {
    console.error("GEMINI API FAILED: ", error);
  }
};
