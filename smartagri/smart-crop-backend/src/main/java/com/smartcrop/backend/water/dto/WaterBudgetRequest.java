package com.smartcrop.backend.water.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WaterBudgetRequest {
    private String cropName;
    private double landAreaAcres;
    private String soilType;
    private String irrigationMethod; // Drip, Sprinkler, Flood
    private double pumpHp;           // e.g. 3.0, 5.0, 7.5
}
