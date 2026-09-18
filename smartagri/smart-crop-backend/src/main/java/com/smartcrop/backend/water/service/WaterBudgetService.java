package com.smartcrop.backend.water.service;

import com.smartcrop.backend.water.dto.WaterBudgetRequest;
import com.smartcrop.backend.water.dto.WaterBudgetResponse;
import org.springframework.stereotype.Service;

@Service
public class WaterBudgetService {

    public WaterBudgetResponse calculate(WaterBudgetRequest request) {
        String crop = request.getCropName() != null ? request.getCropName().toLowerCase() : "crop";
        double acres = request.getLandAreaAcres() > 0 ? request.getLandAreaAcres() : 1.0;
        String soil = request.getSoilType() != null ? request.getSoilType().toLowerCase() : "loam";
        String method = request.getIrrigationMethod() != null ? request.getIrrigationMethod() : "Drip";
        double pumpHp = request.getPumpHp() > 0 ? request.getPumpHp() : 5.0;

        // Base daily liters per acre
        double baseLitersPerAcre = 4000.0;
        if (crop.contains("rice") || crop.contains("paddy")) baseLitersPerAcre = 8500.0;
        else if (crop.contains("cotton")) baseLitersPerAcre = 4600.0;
        else if (crop.contains("wheat")) baseLitersPerAcre = 3600.0;
        else if (crop.contains("tomato") || crop.contains("vegetable")) baseLitersPerAcre = 3400.0;
        else if (crop.contains("maize") || crop.contains("corn")) baseLitersPerAcre = 4200.0;

        // Soil multiplier
        double soilMultiplier = 1.0;
        if (soil.contains("sandy")) soilMultiplier = 1.25;
        else if (soil.contains("clay")) soilMultiplier = 0.88;

        // Method factor
        double methodFactor = 1.0;
        if ("Flood".equalsIgnoreCase(method)) methodFactor = 2.1;
        else if ("Sprinkler".equalsIgnoreCase(method)) methodFactor = 1.25;
        else methodFactor = 1.0; // Drip is most efficient baseline

        double dailyLiters = Math.round(baseLitersPerAcre * acres * soilMultiplier * methodFactor);
        double floodLiters = Math.round(baseLitersPerAcre * acres * soilMultiplier * 2.1);
        double waterSaved = Math.max(0, floodLiters - dailyLiters);
        int conservationPercent = floodLiters > 0 ? (int) Math.round((waterSaved / floodLiters) * 100) : 0;

        // Pump discharge: approx 6,000 liters/hr per HP
        double pumpDischargePerHour = pumpHp * 6000.0;
        double pumpHours = Math.round((dailyLiters / pumpDischargePerHour) * 10.0) / 10.0;
        if (pumpHours < 0.3) pumpHours = 0.3;

        // Electricity consumption (1 HP approx 0.746 kWh)
        double kwh = Math.round(pumpHp * 0.746 * pumpHours * 10.0) / 10.0;

        String advice = "Drip".equalsIgnoreCase(method)
                ? "Excellent efficiency! Split runtime into 2 daily cycles (morning and evening) to maintain steady rhizosphere root moisture."
                : "Flood".equalsIgnoreCase(method)
                ? "Warning: Surface flood irrigation incurs high evaporative and percolation losses. Switching to Drip will save ~" + (int) waterSaved + " liters daily."
                : "Sprinkler irrigation provides good coverage. Operate during low-wind hours to prevent drift distortion.";

        return WaterBudgetResponse.builder()
                .cropName(request.getCropName())
                .dailyWaterLiters(dailyLiters)
                .dailyWaterCubicMeters(Math.round((dailyLiters / 1000.0) * 10.0) / 10.0)
                .recommendedPumpHours(pumpHours)
                .floodEquivalentLiters(floodLiters)
                .waterSavedLiters(waterSaved)
                .conservationPercent(conservationPercent)
                .estimatedElectricityKwh(kwh)
                .schedulingAdvice(advice)
                .build();
    }
}
