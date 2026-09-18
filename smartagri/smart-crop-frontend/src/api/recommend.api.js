import API from "./axios";

// Get AI crop recommendation for a farm
export const getCropRecommendation = (farmId) => API.get(`/recommend/${farmId}`);
