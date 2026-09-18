package com.smartcrop.backend.bot.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AgriBotResponse {
    private String reply;
    private List<String> actionableTips;
    private String category; // PEST, FERTILIZER, IRRIGATION, WEATHER, GENERAL
}
