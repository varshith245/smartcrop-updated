import React, { useState, useEffect } from "react";
import { calculateWaterBudget } from "../../api/water.api";
import { getMyFarms } from "../../api/farm.api";

export default function WaterBudget() {
  const [farms, setFarms] = useState([]);
  const [form, setForm] = useState({
    cropName: "Cotton",
    landAreaAcres: 2.0,
    soilType: "Clay Loam",
    irrigationMethod: "Drip",
    pumpHp: 5.0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFarms();
    runCalculation(form);
  }, []);

  const loadFarms = async () => {
    try {
      const res = await getMyFarms();
      setFarms(res.data || []);
    } catch (err) {
      console.error("Farms load error:", err);
    }
  };

  const runCalculation = async (data = form) => {
    try {
      setLoading(true);
      const res = await calculateWaterBudget({
        cropName: data.cropName,
        landAreaAcres: Number(data.landAreaAcres),
        soilType: data.soilType,
        irrigationMethod: data.irrigationMethod,
        pumpHp: Number(data.pumpHp),
      });
      setResult(res.data);
    } catch (err) {
      console.error("Water calculation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFarmSelect = (farmId) => {
    const selected = farms.find((f) => f.id === Number(farmId));
    if (selected) {
      const updated = {
        ...form,
        landAreaAcres: selected.area || form.landAreaAcres,
        soilType: selected.soilType || form.soilType,
      };
      setForm(updated);
      runCalculation(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runCalculation(form);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>💧 Smart Water Budget & Pump Runtime Scheduler</h1>
        <p>Eliminate over-irrigation, save electric power, and optimize crop evapotranspiration water demands.</p>
      </div>

      <div className="water-budget-layout">
        {/* INPUT PANEL */}
        <div className="stat-card">
          <h3>⚙️ Farm & Irrigation Setup</h3>

          {farms.length > 0 && (
            <div className="input-group">
              <label className="input-label">Auto-Fill from Registered Farm</label>
              <select
                onChange={(e) => handleFarmSelect(e.target.value)}
                className="styled-select"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a farm to auto-fill
                </option>
                {farms.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.area} Acres - {f.soilType})
                  </option>
                ))}
              </select>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Crop Name</label>
              <select
                value={form.cropName}
                onChange={(e) => setForm({ ...form, cropName: e.target.value })}
                className="styled-select"
              >
                <option value="Cotton">Cotton</option>
                <option value="Paddy (Rice)">Paddy (Rice)</option>
                <option value="Wheat">Wheat</option>
                <option value="Tomato">Tomato / Vegetables</option>
                <option value="Maize">Maize (Corn)</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Cultivated Land Area (Acres)</label>
              <input
                type="number"
                step="0.5"
                min="0.2"
                value={form.landAreaAcres}
                onChange={(e) => setForm({ ...form, landAreaAcres: e.target.value })}
                className="styled-input"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Soil Texture</label>
              <select
                value={form.soilType}
                onChange={(e) => setForm({ ...form, soilType: e.target.value })}
                className="styled-select"
              >
                <option value="Clay Loam">Clay Loam (High Retention)</option>
                <option value="Sandy Loam">Sandy Loam (Low Retention)</option>
                <option value="Alluvial / Silt">Alluvial / Silt (Moderate)</option>
                <option value="Black Cotton Soil">Black Cotton Soil (Heavy Clay)</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Irrigation Delivery System</label>
              <select
                value={form.irrigationMethod}
                onChange={(e) => setForm({ ...form, irrigationMethod: e.target.value })}
                className="styled-select"
              >
                <option value="Drip">Drip Irrigation (90% Efficiency)</option>
                <option value="Sprinkler">Sprinkler System (75% Efficiency)</option>
                <option value="Flood">Surface Flood (45% Efficiency)</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Electric Pump Power Rating (HP)</label>
              <select
                value={form.pumpHp}
                onChange={(e) => setForm({ ...form, pumpHp: e.target.value })}
                className="styled-select"
              >
                <option value="3.0">3.0 HP Submersible (18,000 L/hr)</option>
                <option value="5.0">5.0 HP Submersible (30,000 L/hr)</option>
                <option value="7.5">7.5 HP Submersible (45,000 L/hr)</option>
                <option value="10.0">10.0 HP Submersible (60,000 L/hr)</option>
              </select>
            </div>

            <button type="submit" className="btn-enable" disabled={loading}>
              {loading ? "💧 Calculating Physics..." : "⚡ Recalculate Water Budget"}
            </button>
          </form>
        </div>

        {/* RESULTS PANEL */}
        {result && (
          <div className="stat-card water-result-card">
            <div className="water-header">
              <div>
                <span className="timing-pill">Daily Budget Allocation</span>
                <h2 className="water-metric-title">
                  {Math.round(result.dailyWaterLiters).toLocaleString("en-IN")} Liters/day
                </h2>
                <p className="water-sub">Volume: <strong>{result.dailyWaterCubicMeters} m³ (cubic meters)</strong></p>
              </div>

              <div className="pump-runtime-badge">
                <span className="pump-badge-sub">Recommended Run</span>
                <span className="pump-hours">{result.recommendedPumpHours} hrs</span>
              </div>
            </div>

            <div className="conservation-banner">
              <div className="conserve-meter">
                <div className="conserve-info">
                  <span>Water Conservation Rate</span>
                  <strong>{result.conservationPercent}% Saved vs Flood</strong>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${result.conservationPercent}%`,
                      background: "linear-gradient(90deg, #00c6ff, #38ef7d)",
                    }}
                  />
                </div>
              </div>

              <div className="saved-liters-row">
                <span>💧 Water Conserved Daily:</span>
                <strong>{Math.round(result.waterSavedLiters).toLocaleString("en-IN")} Liters</strong>
              </div>
            </div>

            <div className="water-metrics-subgrid">
              <div className="water-metric-box">
                <span className="w-label">Electric Consumption</span>
                <strong>~{result.estimatedElectricityKwh} kWh / day</strong>
              </div>

              <div className="water-metric-box">
                <span className="w-label">Flood Comparison</span>
                <strong>{Math.round(result.floodEquivalentLiters).toLocaleString("en-IN")} L</strong>
              </div>
            </div>

            <div className="rec-tips-box" style={{ marginTop: "16px" }}>
              <h4>💧 Irrigation Scheduling Protocol:</h4>
              <p>{result.schedulingAdvice}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
