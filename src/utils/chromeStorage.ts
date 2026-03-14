import toast from "react-hot-toast";

// export const getApiKey = () => {
// }

export const saveApiKey = async (apiKey: string): Promise<boolean> => {
  if (!apiKey) return false;

  try {
    await chrome.storage.local.set({ apiKey });
    console.log("API Key stored succesfully!");
    return true;
  } catch (error) {
    toast.error("Failed to save API key");
    console.error("Failed to save API key:", error);
    return false;
  }
};
