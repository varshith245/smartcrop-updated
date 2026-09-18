import API from "./axios";

// Record or update soil health parameters
export const saveSoilData = (data) => API.post("/soil", data);

// Get soil data for a specific farm
export const getSoilByFarm = (farmId) => API.get(`/soil/farm/${farmId}`);
