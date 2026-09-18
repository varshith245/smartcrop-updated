import API from "./axios";

// Calculate crop water budget and pump runtimes
export const calculateWaterBudget = (data) => API.post("/water/budget", data);
