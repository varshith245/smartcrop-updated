package com.smartcrop.backend.bot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgriBotRequest {
    private String message;
    private String cropContext;
}
