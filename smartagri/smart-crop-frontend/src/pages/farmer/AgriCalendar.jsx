import React, { useState } from "react";

export default function AgriCalendar() {
  const [activeSeason, setActiveSeason] = useState("Kharif");

  const calendarData = {
    Kharif: {
      timing: "June – October (Monsoon Season)",
      description: "Crops sown with the onset of the southwest monsoon rains and harvested in autumn.",
      crops: [
        {
          name: "Paddy (Rice)",
          sowing: "June – July",
          transplanting: "July",
          irrigationCritical: "Panicle initiation & grain filling",
          harvesting: "October – November",
          color: "#00c6ff",
        },
        {
          name: "Cotton",
          sowing: "May – June",
          transplanting: "Direct seeding",
          irrigationCritical: "Square formation & boll development",
          harvesting: "November – January",
          color: "#38ef7d",
        },
        {
          name: "Maize (Corn)",
          sowing: "June – July",
          transplanting: "Direct seeding",
          irrigationCritical: "Tasseling and silking stages",
          harvesting: "September – October",
          color: "#ffd700",
        },
        {
          name: "Soybean",
          sowing: "Late June – Early July",
          transplanting: "Direct seeding",
          irrigationCritical: "Pod formation & seed filling",
          harvesting: "October",
          color: "#ff9966",
        },
      ],
    },
    Rabi: {
      timing: "October – March (Winter Season)",
      description: "Crops sown in winter after monsoon rains recede and harvested in spring.",
      crops: [
        {
          name: "Wheat",
          sowing: "November – December",
          transplanting: "Direct drilling",
          irrigationCritical: "Crown root initiation (21 days) & flowering",
          harvesting: "March – April",
          color: "#ffd700",
        },
        {
          name: "Mustard",
          sowing: "October – November",
          transplanting: "Direct seeding",
          irrigationCritical: "Pre-flowering and pod development",
          harvesting: "February – March",
          color: "#00F260",
        },
        {
          name: "Chickpea (Gram)",
          sowing: "October – November",
          transplanting: "Direct drilling",
          irrigationCritical: "Pre-flowering (avoid excess water)",
          harvesting: "March",
          color: "#ff8008",
        },
        {
          name: "Potato",
          sowing: "October – November",
          transplanting: "Tuber planting",
          irrigationCritical: "Stolon formation & tuber bulking",
          harvesting: "January – February",
          color: "#00c6ff",
        },
      ],
    },
    Zaid: {
      timing: "March – June (Summer Short Season)",
      description: "Short duration summer crops grown between Rabi harvest and Kharif sowing using assured irrigation.",
      crops: [
        {
          name: "Watermelon / Muskmelon",
          sowing: "February – March",
          transplanting: "Direct or nursery",
          irrigationCritical: "Fruit development and ripening",
          harvesting: "May – June",
          color: "#ff4b1f",
        },
        {
          name: "Cucumber",
          sowing: "March – April",
          transplanting: "Bed seeding",
          irrigationCritical: "Frequent light irrigation every 3-4 days",
          harvesting: "May – June",
          color: "#11998e",
        },
        {
          name: "Moong (Green Gram)",
          sowing: "March – April",
          transplanting: "Direct broadcasting",
          irrigationCritical: "Pod development stage",
          harvesting: "June",
          color: "#38ef7d",
        },
      ],
    },
  };

  const currentMonth = new Date().getMonth(); // 0 = Jan, 8 = Sep
  const currentSeasonEstimate = (currentMonth >= 5 && currentMonth <= 9) ? "Kharif" : (currentMonth >= 9 || currentMonth <= 2) ? "Rabi" : "Zaid";

  const selectedData = calendarData[activeSeason];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>📅 Agricultural Seasonal Calendar</h1>
        <p>Strategic month-by-month cultivation schedules for Kharif, Rabi, and Zaid agricultural cycles.</p>
      </div>

      <div className="calendar-season-tabs">
        {Object.keys(calendarData).map((season) => (
          <button
            key={season}
            onClick={() => setActiveSeason(season)}
            className={`season-tab-btn ${activeSeason === season ? "active" : ""}`}
          >
            {season} Season
            {season === currentSeasonEstimate && <span className="current-badge">Active</span>}
          </button>
        ))}
      </div>

      <div className="season-info-card stat-card">
        <div className="season-meta">
          <h2>🌾 {activeSeason} Cultivation Window</h2>
          <span className="timing-pill">{selectedData.timing}</span>
        </div>
        <p className="season-desc">{selectedData.description}</p>
      </div>

      <div className="crop-calendar-grid">
        {selectedData.crops.map((crop) => (
          <div key={crop.name} className="calendar-crop-card stat-card" style={{ borderTop: `4px solid ${crop.color}` }}>
            <h3 style={{ color: crop.color }}>{crop.name}</h3>

            <div className="calendar-milestones">
              <div className="milestone-row">
                <span className="milestone-label">🌱 Sowing Window:</span>
                <span className="milestone-value">{crop.sowing}</span>
              </div>

              <div className="milestone-row">
                <span className="milestone-label">🚜 Method:</span>
                <span className="milestone-value">{crop.transplanting}</span>
              </div>

              <div className="milestone-row">
                <span className="milestone-label">💧 Critical Irrigation:</span>
                <span className="milestone-value">{crop.irrigationCritical}</span>
              </div>

              <div className="milestone-row">
                <span className="milestone-label">🌾 Harvest Window:</span>
                <span className="milestone-value">{crop.harvesting}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
