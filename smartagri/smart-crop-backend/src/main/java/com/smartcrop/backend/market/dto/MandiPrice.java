package com.smartcrop.backend.market.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MandiPrice {
    private String crop;
    private String category;       // Cereal, Pulses, Commercial, Vegetables
    private double currentPrice;   // ₹/quintal
    private double mspPrice;       // Minimum Support Price ₹/quintal
    private String trend;          // UP, DOWN, STABLE
    private double changePercent;  // e.g. +2.4%
    private String primaryMarket;  // e.g. APMC Hub
    private String sellingAdvice;  // Hold or Sell recommendation
}
