import React, { useEffect, useState } from "react";
import { predictDisease, getAllDiseases, deleteDisease } from "../../api/disease.api";

export default function FarmerDisease() {
  const [form, setForm] = useState({
    cropName: "Rice",
    symptoms: "",
  });
  const [selectedChips, setSelectedChips] = useState([]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(false);

  const commonCrops = [
    "Rice",
    "Wheat",
    "Tomato",
    "Cotton",
    "Maize",
    "Potato",
    "Sugarcane",
    "Soybean",
  ];

  const symptomOptions = [
    "Yellowing leaves",
    "Brown concentric spots",
    "Powdery white coating",
    "Stunted plant growth",
    "Wilting and drooping leaves",
    "Rust-colored lesions",
    "Water-soaked leaf lesions",
    "Leaf curling and mosaic patterns",
  ];

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setFetchingHistory(true);
      const res = await getAllDiseases();
      setHistory(res.data || []);
    } catch (err) {
      console.error("Failed to load disease records:", err);
    } finally {
      setFetchingHistory(false);
    }
  };

  const toggleChip = (chip) => {
    const updated = selectedChips.includes(chip)
      ? selectedChips.filter((c) => c !== chip)
      : [...selectedChips, chip];
    setSelectedChips(updated);

    const mergedSymptoms = updated.join(", ");
    setForm((prev) => ({ ...prev, symptoms: mergedSymptoms }));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!form.symptoms.trim()) {
      alert("Please describe or select crop symptoms.");
      return;
    }

    try {
      setLoading(true);
      const res = await predictDisease({
        cropName: form.cropName,
        symptoms: form.symptoms,
      });
      setResult(res.data);
      loadHistory();
    } catch (err) {
      console.error("Diagnosis error:", err);
      alert("Failed to diagnose disease. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this diagnostic record?")) return;
    try {
      await deleteDisease(id);
      loadHistory();
    } catch (err) {
      console.error("Delete disease error:", err);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>🌿 AI Crop Disease Diagnostics</h1>
        <p>Analyze crop symptoms instantly to identify pathology, severity, and optimal treatment protocols.</p>
      </div>

      <div className="disease-diagnostic-layout">
        {/* INPUT PANEL */}
        <div className="stat-card form-panel">
          <h3>🔍 Scan & Analyze Symptoms</h3>

          <form onSubmit={handlePredict}>
            <label className="input-label">Select Crop</label>
            <select
              value={form.cropName}
              onChange={(e) => setForm({ ...form, cropName: e.target.value })}
              className="styled-select"
            >
              {commonCrops.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="input-label">Quick-Select Observed Symptoms</label>
            <div className="symptom-chips">
              {symptomOptions.map((chip) => {
                const active = selectedChips.includes(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => toggleChip(chip)}
                    className={`chip-btn ${active ? "active" : ""}`}
                  >
                    {active ? "✓ " : "+ "}
                    {chip}
                  </button>
                );
              })}
            </div>

            <label className="input-label">Detailed Symptoms Description</label>
            <textarea
              placeholder="e.g., Yellowish leaf margins with small brown spots spreading towards the base..."
              rows={3}
              value={form.symptoms}
              onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
              className="styled-textarea"
              required
            />

            <button type="submit" className="btn-enable" disabled={loading}>
              {loading ? "🔬 Analyzing Pathology..." : "🚀 Run AI Diagnosis"}
            </button>
          </form>
        </div>

        {/* RESULTS PANEL */}
        {result && (
          <div className="stat-card diagnosis-result-card">
            <div className="result-header">
              <span className="result-tag">Diagnostic Result</span>
              <span
                className={`severity-badge ${
                  result.severity === "High"
                    ? "severity-high"
                    : result.severity === "Medium"
                    ? "severity-med"
                    : "severity-low"
                }`}
              >
                {result.severity || "Low"} Severity
              </span>
            </div>

            <h2 className="disease-name">
              {result.diseaseName || result.name || "Healthy Plant"}
            </h2>
            <p className="crop-sub">Target Crop: <strong>{result.cropName}</strong></p>

            <div className="treatment-section">
              <h4>🩺 Curative Treatment Protocol</h4>
              <p>{result.treatment || "No severe symptoms observed. Maintain standard field hygiene."}</p>
            </div>

            <div className="pesticide-section">
              <h4>🧪 Recommended Pesticide / Spray</h4>
              <p className="pesticide-box">{result.pesticide || "Chemical intervention not required."}</p>
            </div>
          </div>
        )}
      </div>

      {/* HISTORICAL RECORDS */}
      <div className="history-container">
        <h3>📋 Diagnostic Case History ({history.length})</h3>

        {fetchingHistory ? (
          <p>Loading history...</p>
        ) : history.length === 0 ? (
          <p className="empty-msg">No previous diagnoses logged yet.</p>
        ) : (
          <div className="disease-history-grid">
            {history.map((item) => (
              <div key={item.id} className="history-item-card">
                <div className="history-item-head">
                  <span className="history-crop">{item.cropName}</span>
                  <span
                    className={`severity-badge small ${
                      item.severity === "High"
                        ? "severity-high"
                        : item.severity === "Medium"
                        ? "severity-med"
                        : "severity-low"
                    }`}
                  >
                    {item.severity}
                  </span>
                </div>
                <h4 className="history-disease">{item.diseaseName || item.name || "Unknown"}</h4>
                <p className="history-symptoms">
                  <strong>Symptoms:</strong> {item.symptoms}
                </p>
                {item.pesticide && (
                  <p className="history-pesticide">
                    <strong>Pesticide:</strong> {item.pesticide}
                  </p>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn-delete small"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
