import API from "./axios";

// Predict crop disease based on symptoms
export const predictDisease = (data) => API.post("/disease/predict", data);

// Get all disease diagnostic records
export const getAllDiseases = () => API.get("/disease/all");

// Get disease details by ID
export const getDiseaseById = (id) => API.get(`/disease/${id}`);

// Delete a disease record
export const deleteDisease = (id) => API.delete(`/disease/delete/${id}`);
