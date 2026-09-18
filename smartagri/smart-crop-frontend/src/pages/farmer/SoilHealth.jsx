import React, { useEffect, useState } from "react";
import { getMyFarms } from "../../api/farm.api";
import { saveSoilData, getSoilByFarm } from "../../api/soil.api";

export default function SoilHealth() {
  const [farms, setFarms] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const [form, setForm] = useState({
    ph: 6.8,
    nitrogen: 120,
    phosphorus: 35,
    potassium: 150,
  });
  const [soilReport, setSoilReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    try {
      const res = await getMyFarms();
      setFarms(res.data || []);
      if (res.data && res.data.length > 0) {
        const firstId = res.data[0].id;
        setSelectedFarmId(firstId);
        loadSoilForFarm(firstId);
      }
    } catch (err) {
      console.error("Failed to load farms:", err);
    }
  };

  const loadSoilForFarm = async (farmId) => {
    if (!farmId) return;
    setLoading(true);
    try {
      const res = await getSoilByFarm(farmId);
      if (res.data) {
        setForm({
          ph: res.data.ph || 6.8,
          nitrogen: res.data.nitrogen || 120,
          phosphorus: res.data.phosphorus || 35,
          potassium: res.data.potassium || 150,
        });
        evaluateSoil(res.data);
      }
    } catch {
      // If no soil record yet, use standard defaults
      evaluateSoil(form);
    } finally {
      setLoading(false);
    }
  };

  const handleFarmChange = (e) => {
    const id = e.target.value;
    setSelectedFarmId(id);
    loadSoilForFarm(id);
  };

  const evaluateSoil = (data) => {
    const ph = parseFloat(data.ph) || 7.0;
    const n = parseFloat(data.nitrogen) || 100;
    const p = parseFloat(data.phosphorus) || 30;
    const k = parseFloat(data.potassium) || 120;

    // Soil Health Score algorithm
    let score = 100;
    // pH penalty if outside 6.0 - 7.5
    if (ph < 6.0) score -= (6.0 - ph) * 20;
    else if (ph > 7.5) score -= (ph - 7.5) * 18;

    // N penalty (ideal 100 - 160 kg/ha)
    if (n < 80) score -= 15;
    if (p < 20) score -= 10;
    if (k < 100) score -= 10;

    score = Math.max(35, Math.min(100, Math.round(score)));

    let phStatus = "Optimal / Neutral";
    let phRec = "Soil reaction is balanced. Ideal for most field crops.";
    if (ph < 6.0) {
      phStatus = "Acidic Soil";
      phRec = "Apply Agricultural Lime (Calcium Carbonate) or Wood Ash to raise soil pH.";
    } else if (ph > 7.8) {
      phStatus = "Alkaline / Saline";
      phRec = "Apply Agricultural Gypsum (Calcium Sulfate) or organic compost to lower pH.";
    }

    const amendments = [];
    if (n < 90) amendments.push("Nitrogen deficiency detected: Incorporate leguminous green manure or neem-coated urea.");
    if (p < 25) amendments.push("Phosphorus low: Apply Single Super Phosphate (SSP) or rock phosphate at root zone.");
    if (k < 110) amendments.push("Potassium deficient: Top-dress with Muriate of Potash (MOP) to enhance drought tolerance.");
    if (amendments.length === 0) amendments.push("All macro-nutrients (N-P-K) are in the healthy optimal zone!");

    setSoilReport({
      score,
      phStatus,
      phRec,
      amendments,
      nStatus: n > 140 ? "High" : n > 80 ? "Optimal" : "Low",
      pStatus: p > 35 ? "High" : p > 20 ? "Optimal" : "Low",
      kStatus: k > 150 ? "High" : k > 100 ? "Optimal" : "Low",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedFarmId) {
      alert("Please select or add a farm first.");
      return;
    }

    setSaving(true);
    try {
      await saveSoilData({
        farmId: Number(selectedFarmId),
        ph: Number(form.ph),
        nitrogen: Number(form.nitrogen),
        phosphorus: Number(form.phosphorus),
        potassium: Number(form.potassium),
      });
      evaluateSoil(form);
      alert("Soil test report recorded successfully! ✅");
    } catch (err) {
      console.error("Save soil error:", err);
      alert("Failed to save soil test data.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>🧪 Soil Health & Nutrient Analysis</h1>
        <p>Log laboratory soil tests and receive customized soil amendment & organic fertility plans.</p>
      </div>

      <div className="soil-layout">
        {/* INPUT CARD */}
        <div className="stat-card">
          <h3>📝 Record Soil Lab Report</h3>

          {farms.length > 0 ? (
            <div className="input-group">
              <label className="input-label">Farm Location</label>
              <select
                value={selectedFarmId}
                onChange={handleFarmChange}
                className="styled-select"
              >
                {farms.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.location})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="empty-msg">No farms registered yet. Please add a farm first.</p>
          )}

          <form onSubmit={handleSave}>
            <div className="input-group">
              <label className="input-label">Soil pH (0 - 14)</label>
              <input
                type="number"
                step="0.1"
                min="3"
                max="11"
                value={form.ph}
                onChange={(e) => setForm({ ...form, ph: e.target.value })}
                className="styled-input"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Available Nitrogen (N) - kg/ha</label>
              <input
                type="number"
                value={form.nitrogen}
                onChange={(e) => setForm({ ...form, nitrogen: e.target.value })}
                className="styled-input"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Available Phosphorus (P) - kg/ha</label>
              <input
                type="number"
                value={form.phosphorus}
                onChange={(e) => setForm({ ...form, phosphorus: e.target.value })}
                className="styled-input"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Available Potassium (K) - kg/ha</label>
              <input
                type="number"
                value={form.potassium}
                onChange={(e) => setForm({ ...form, potassium: e.target.value })}
                className="styled-input"
                required
              />
            </div>

            <button type="submit" className="btn-enable" disabled={saving || !selectedFarmId}>
              {saving ? "Saving Report..." : "💾 Save & Analyze Soil Health"}
            </button>
          </form>
        </div>

        {/* ANALYSIS CARD */}
        {soilReport && (
          <div className="stat-card soil-health-card">
            <div className="soil-score-header">
              <div>
                <span className="rec-match-badge">Soil Health Index</span>
                <h2 className="soil-score-title">{soilReport.score}% Health Rating</h2>
                <p className="ph-status">Reaction: <strong>{soilReport.phStatus} (pH {form.ph})</strong></p>
              </div>
              <div className={`score-badge ${soilReport.score > 80 ? "score-high" : "score-med"}`}>
                {soilReport.score >= 80 ? "🌟 Healthy" : "⚠️ Needs Care"}
              </div>
            </div>

            <div className="npk-meters">
              <div className="npk-item">
                <div className="npk-title-row">
                  <span>Nitrogen (N)</span>
                  <span className={`nutrient-tag ${soilReport.nStatus.toLowerCase()}`}>{soilReport.nStatus}</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill n-fill" style={{ width: `${Math.min(100, (form.nitrogen / 160) * 100)}%` }} />
                </div>
              </div>

              <div className="npk-item">
                <div className="npk-title-row">
                  <span>Phosphorus (P)</span>
                  <span className={`nutrient-tag ${soilReport.pStatus.toLowerCase()}`}>{soilReport.pStatus}</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill p-fill" style={{ width: `${Math.min(100, (form.phosphorus / 50) * 100)}%` }} />
                </div>
              </div>

              <div className="npk-item">
                <div className="npk-title-row">
                  <span>Potassium (K)</span>
                  <span className={`nutrient-tag ${soilReport.kStatus.toLowerCase()}`}>{soilReport.kStatus}</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill k-fill" style={{ width: `${Math.min(100, (form.potassium / 200) * 100)}%` }} />
                </div>
              </div>
            </div>

            <div className="rec-tips-box">
              <h4>🌱 Recommended Soil Corrective Actions:</h4>
              <p className="soil-tip-intro"><strong>pH Management:</strong> {soilReport.phRec}</p>
              <ul className="amendments-list">
                {soilReport.amendments.map((amendment, idx) => (
                  <li key={idx}>🌿 {amendment}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
