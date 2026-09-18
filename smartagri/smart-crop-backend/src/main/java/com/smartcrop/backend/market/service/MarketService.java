package com.smartcrop.backend.market.service;

import com.smartcrop.backend.market.dto.MandiPrice;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MarketService {

    private static final List<MandiPrice> PRICES = List.of(
        MandiPrice.builder()
            .crop("Paddy (Basmati)")
            .category("Cereal")
            .currentPrice(3850.0)
            .mspPrice(2203.0)
            .trend("UP")
            .changePercent(3.2)
            .primaryMarket("Karnal APMC")
            .sellingAdvice("High demand in export market. Favorable window to sell 60% of stock.")
            .build(),
        MandiPrice.builder()
            .crop("Wheat")
            .category("Cereal")
            .currentPrice(2480.0)
            .mspPrice(2275.0)
            .trend("STABLE")
            .changePercent(0.5)
            .primaryMarket("Khanna APMC")
            .sellingAdvice("Prices steady near MSP. Safe to hold or liquidate based on storage cost.")
            .build(),
        MandiPrice.builder()
            .crop("Cotton (Medium Staple)")
            .category("Commercial")
            .currentPrice(7120.0)
            .mspPrice(6620.0)
            .trend("UP")
            .changePercent(4.1)
            .primaryMarket("Rajkot Mandi")
            .sellingAdvice("Spinning mill inquiries surging. Sell in tranches.")
            .build(),
        MandiPrice.builder()
            .crop("Maize")
            .category("Cereal")
            .currentPrice(2150.0)
            .mspPrice(2090.0)
            .trend("STABLE")
            .changePercent(1.1)
            .primaryMarket("Davanagere APMC")
            .sellingAdvice("Poultry feed mill demand consistent. Good liquidity.")
            .build(),
        MandiPrice.builder()
            .crop("Soybean")
            .category("Oilseed")
            .currentPrice(4780.0)
            .mspPrice(4600.0)
            .trend("DOWN")
            .changePercent(-1.8)
            .primaryMarket("Indore Mandi")
            .sellingAdvice("Crush margins tighter. Hold stock if moisture is under 10%.")
            .build(),
        MandiPrice.builder()
            .crop("Tomato")
            .category("Horticulture")
            .currentPrice(1900.0)
            .mspPrice(0.0)
            .trend("UP")
            .changePercent(8.5)
            .primaryMarket("Kolar APMC")
            .sellingAdvice("Perishable vegetable. Liquidate daily harvests immediately.")
            .build(),
        MandiPrice.builder()
            .crop("Onion")
            .category("Horticulture")
            .currentPrice(2600.0)
            .mspPrice(0.0)
            .trend("UP")
            .changePercent(5.4)
            .primaryMarket("Lasalgaon APMC")
            .sellingAdvice("Arrivals tapering. High realization period.")
            .build(),
        MandiPrice.builder()
            .crop("Potato")
            .category("Horticulture")
            .currentPrice(1450.0)
            .mspPrice(0.0)
            .trend("STABLE")
            .changePercent(0.2)
            .primaryMarket("Agra APMC")
            .sellingAdvice("Cold storage releases active. Sell steadily.")
            .build(),
        MandiPrice.builder()
            .crop("Chickpea (Gram)")
            .category("Pulses")
            .currentPrice(5850.0)
            .mspPrice(5440.0)
            .trend("UP")
            .changePercent(2.8)
            .primaryMarket("Latur APMC")
            .sellingAdvice("Festival consumption demand rising. Attractive selling opportunity.")
            .build()
    );

    public List<MandiPrice> getAllPrices() {
        return PRICES;
    }

    public Map<String, Object> estimateRevenue(String crop, double yieldTons) {
        double quintals = yieldTons * 10.0; // 1 ton = 10 quintals
        MandiPrice matching = PRICES.stream()
                .filter(p -> p.getCrop().toLowerCase().contains(crop.toLowerCase()) || crop.toLowerCase().contains(p.getCrop().toLowerCase()))
                .findFirst()
                .orElse(PRICES.get(0));

        double grossRevenue = quintals * matching.getCurrentPrice();
        double mspRevenue = quintals * (matching.getMspPrice() > 0 ? matching.getMspPrice() : matching.getCurrentPrice());

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("crop", matching.getCrop());
        result.put("yieldTons", yieldTons);
        result.put("quintals", quintals);
        result.put("ratePerQuintal", matching.getCurrentPrice());
        result.put("grossRevenue", grossRevenue);
        result.put("mspRevenue", mspRevenue);
        result.put("premiumOverMsp", Math.max(0, grossRevenue - mspRevenue));
        result.put("trend", matching.getTrend());
        result.put("advice", matching.getSellingAdvice());

        return result;
    }
}
