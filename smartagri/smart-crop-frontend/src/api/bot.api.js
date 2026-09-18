import API from "./axios";

// Send question to AI Agronomist
export const askAgriBot = (message, cropContext = "") =>
  API.post("/bot/ask", { message, cropContext });
