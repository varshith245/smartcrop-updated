package com.smartcrop.backend.weather.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeatherLiveResponse {
    private String location;
    private double temperature;
    private double humidity;
    private double windSpeed;
    private double precipitation;
    private String condition;
    private String sprayAdvisory;
    private String irrigationAdvisory;
    private String uvIndex;
}
