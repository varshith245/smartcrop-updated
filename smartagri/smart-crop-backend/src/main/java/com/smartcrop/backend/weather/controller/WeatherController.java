package com.smartcrop.backend.weather.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.smartcrop.backend.weather.dto.WeatherLiveResponse;
import com.smartcrop.backend.weather.entity.Weather;
import com.smartcrop.backend.weather.service.WeatherService;

@RestController
@RequestMapping("/api/weather")
@RequiredArgsConstructor
public class WeatherController {

    private final WeatherService weatherService;

    @PostMapping
    public Weather save(@RequestBody Weather weather) {
        return weatherService.save(weather);
    }

    @GetMapping
    public String test() {
        return "weather ok";
    }

    // 🌦️ Live Weather & Agro Advisory by coordinates
    @GetMapping("/live")
    public WeatherLiveResponse getLiveWeather(
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lon,
            @RequestParam(required = false) String location) {
        return weatherService.getLiveWeather(lat, lon, location);
    }

    // 🌾 Live Weather by Farm ID
    @GetMapping("/farm/{farmId}")
    public WeatherLiveResponse getFarmLiveWeather(@PathVariable Long farmId) {
        return weatherService.getLiveWeatherByFarm(farmId);
    }
}
