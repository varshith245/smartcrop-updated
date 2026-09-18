package com.smartcrop.backend.bot.service;

import com.smartcrop.backend.bot.dto.AgriBotRequest;
import com.smartcrop.backend.bot.dto.AgriBotResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgriBotService {

    public AgriBotResponse ask(AgriBotRequest request) {
        String query = request.getMessage() != null ? request.getMessage().toLowerCase() : "";

        if (query.contains("fertilizer") || query.contains("urea") || query.contains("dap") || query.contains("npk") || query.contains("nitrogen")) {
            return AgriBotResponse.builder()
                    .reply("For balanced crop nutrition, avoid dumping nitrogen all at once. Split nitrogen into 3 equal doses: 50% at basal sowing, 25% at tillering/vegetative growth, and 25% at flowering/panicle initiation. Always combine with adequate potassium for disease resistance.")
                    .actionableTips(List.of(
                            "Apply neem-coated urea in split applications to reduce leaching by 20%.",
                            "Incorporate single superphosphate (SSP) at root depth before sowing.",
                            "Spray 0.5% zinc sulfate if interveinal chlorosis appears on young leaves."
                    ))
                    .category("FERTILIZER")
                    .build();
        }

        if (query.contains("disease") || query.contains("pest") || query.contains("spot") || query.contains("blight") || query.contains("worm") || query.contains("spray")) {
            return AgriBotResponse.builder()
                    .reply("Crop disease detected. For leaf blight or fungal brown spot, ensure standing water is drained if overlogged. Apply Mancozeb 75% WP (2 g/L) or Carbendazim (1 g/L). For sucking pests or aphids, use organic Neem oil (5ml/L) or Imidacloprid 17.8 SL (0.5ml/L).")
                    .actionableTips(List.of(
                            "Spray during calm early morning or late afternoon (wind < 10 km/h).",
                            "Alternate chemical classes to prevent pesticide resistance.",
                            "Check underside of leaves for early nymph colonies."
                    ))
                    .category("PEST")
                    .build();
        }

        if (query.contains("water") || query.contains("irrigation") || query.contains("drip") || query.contains("dry") || query.contains("pump")) {
            return AgriBotResponse.builder()
                    .reply("Irrigation scheduling must target critical crop growth stages. For cereals, crown root initiation and flowering are most moisture-sensitive. Drip irrigation saves 45-60% water compared to flood irrigation and delivers nutrients straight to the root zone.")
                    .actionableTips(List.of(
                            "Irrigate during morning or evening to minimize evaporation loss.",
                            "Check soil at 10-15 cm depth: if it forms a ball without crumbling, moisture is adequate.",
                            "Maintain drip lateral pressure at 1.0 to 1.5 kg/cm²."
                    ))
                    .category("IRRIGATION")
                    .build();
        }

        if (query.contains("rice") || query.contains("paddy")) {
            return AgriBotResponse.builder()
                    .reply("Paddy (Rice) thrives in clay-loam soils with high water holding capacity. Keep 2-3 cm standing water until grain hardening. Maintain transplanting spacing of 20 x 15 cm with 2-3 seedlings per hill.")
                    .actionableTips(List.of(
                            "Drain field 10-14 days before harvest to promote uniform ripening.",
                            "Watch for stem borer: install pheromone traps at 5 traps/acre.",
                            "Apply potash at panicle stage for plump, heavy grains."
                    ))
                    .category("CROP_SPECIFIC")
                    .build();
        }

        if (query.contains("wheat")) {
            return AgriBotResponse.builder()
                    .reply("Wheat requires a cool winter germination followed by warm ripening weather. Crown Root Initiation (CRI) at 20-25 days after sowing is the single most critical irrigation stage—never delay this watering.")
                    .actionableTips(List.of(
                            "Ideal sowing temperature: 20°C to 22°C.",
                            "Treat seeds with Trichoderma viride (4g/kg) against root rot.",
                            "Ensure seed drill depth does not exceed 4-5 cm."
                    ))
                    .category("CROP_SPECIFIC")
                    .build();
        }

        // Default smart response
        return AgriBotResponse.builder()
                .reply("Hello Farmer! I am your SmartCrop AI Agronomist. You can ask me about crop disease control, fertilizer dosage (NPK), irrigation scheduling, or market selling strategies.")
                .actionableTips(List.of(
                        "Try asking: 'How to control leaf blight in paddy?'",
                        "Try asking: 'What is the best fertilizer dose for wheat?'",
                        "Try asking: 'How many hours should I run drip irrigation for cotton?'"
                ))
                .category("GENERAL")
                .build();
    }
}
