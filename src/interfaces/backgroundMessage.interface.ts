import type { PRExtractedData } from "../shared/types";

export interface IhandleAnalaysePrMessage {
  payload: PRExtractedData;
  sendResponse: (response: unknown) => void;
}
