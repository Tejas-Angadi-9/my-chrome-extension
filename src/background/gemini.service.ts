import { GoogleGenAI } from "@google/genai";
import type { BuildPRPromptOptions } from "../interfaces/backgroundScripts.interface";
import buildPRPrompt from "./utils/buildPRPrompt";
import toast from "react-hot-toast";
import { ERROR_MESSAGES } from "../shared/constants";

export const analyzePRWithGemini = async (PrPayload: BuildPRPromptOptions) => {
  const GEMINI_API_KEY = await new Promise<string | undefined>((resolve) => {
    chrome.storage.local.get(["apiKey"], (result) => {
      resolve(result.apiKey as string | undefined);
    });
  });
  console.log("GEMINI_API_KEY: ", GEMINI_API_KEY);

  if (!GEMINI_API_KEY) {
    throw new Error("Missing or invalid Gemini API key. Check your .env file.");
  }

  const ai: GoogleGenAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

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
    toast.error(ERROR_MESSAGES.GEMINI_API_ERROR);
    console.error("GEMINI API FAILED: ", error);
  }
};
