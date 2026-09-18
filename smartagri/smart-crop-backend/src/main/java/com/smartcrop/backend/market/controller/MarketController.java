package com.smartcrop.backend.market.controller;

import com.smartcrop.backend.market.dto.MandiPrice;
import com.smartcrop.backend.market.service.MarketService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/market")
@RequiredArgsConstructor
public class MarketController {

    private final MarketService marketService;

    @GetMapping("/prices")
    public List<MandiPrice> getPrices() {
        return marketService.getAllPrices();
    }

    @GetMapping("/estimate")
    public Map<String, Object> estimate(
            @RequestParam(defaultValue = "Paddy (Basmati)") String crop,
            @RequestParam(defaultValue = "5.0") double yieldTons) {
        return marketService.estimateRevenue(crop, yieldTons);
    }
}
