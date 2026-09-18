import API from "./axios";

// Get all live commodity prices and MSP data
export const getMandiPrices = () => API.get("/market/prices");

// Calculate projected harvest revenue based on current market rates
export const estimateHarvestRevenue = (crop, yieldTons) =>
  API.get("/market/estimate", { params: { crop, yieldTons } });
