package com.smartcrop.backend.water.controller;

import com.smartcrop.backend.water.dto.WaterBudgetRequest;
import com.smartcrop.backend.water.dto.WaterBudgetResponse;
import com.smartcrop.backend.water.service.WaterBudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/water")
@RequiredArgsConstructor
public class WaterBudgetController {

    private final WaterBudgetService waterBudgetService;

    @PostMapping("/budget")
    public WaterBudgetResponse calculateBudget(@RequestBody WaterBudgetRequest request) {
        return waterBudgetService.calculate(request);
    }
}
