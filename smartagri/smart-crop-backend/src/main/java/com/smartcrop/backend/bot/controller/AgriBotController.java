package com.smartcrop.backend.bot.controller;

import com.smartcrop.backend.bot.dto.AgriBotRequest;
import com.smartcrop.backend.bot.dto.AgriBotResponse;
import com.smartcrop.backend.bot.service.AgriBotService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bot")
@RequiredArgsConstructor
public class AgriBotController {

    private final AgriBotService agriBotService;

    @PostMapping("/ask")
    public AgriBotResponse ask(@RequestBody AgriBotRequest request) {
        return agriBotService.ask(request);
    }
}
