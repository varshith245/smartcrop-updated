package com.smartcrop.backend.water.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WaterBudgetResponse {
    private String cropName;
    private double dailyWaterLiters;
    private double dailyWaterCubicMeters;
    private double recommendedPumpHours;
    private double floodEquivalentLiters;
    private double waterSavedLiters;
    private int conservationPercent;
    private double estimatedElectricityKwh;
    private String schedulingAdvice;
}
