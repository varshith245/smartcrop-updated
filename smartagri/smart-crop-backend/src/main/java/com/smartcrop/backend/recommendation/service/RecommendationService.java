package com.smartcrop.backend.recommendation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.smartcrop.backend.soil.service.SoilService;
import com.smartcrop.backend.weather.service.WeatherService;
import com.smartcrop.backend.soil.entity.SoilData;
import com.smartcrop.backend.weather.entity.Weather;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final SoilService soilService;
    private final WeatherService weatherService;

    public String getRecommendation(Long farmId) {
        double ph = 6.5;
        double nitrogen = 45.0;

        try {
            SoilData soil = soilService.getByFarm(farmId);
            if (soil != null) {
                ph = soil.getPh();
                nitrogen = soil.getNitrogen();
            }
        } catch (Exception ignored) {
            // Safe fallback if farm has not completed a soil test yet
        }

        Weather weather = weatherService.getWeather(farmId);
        double rainfall = weather != null ? weather.getRainfall() : 250;
        double temp = weather != null ? weather.getTemperature() : 28;

        if (ph < 6.5 && rainfall > 200) {
            return "Rice";
        }

        if (nitrogen > 50 && temp < 30) {
            return "Wheat";
        }

        if (ph >= 6.0 && ph <= 7.5 && temp >= 24) {
            return "Cotton";
        }

        return "Maize";
    }
}
