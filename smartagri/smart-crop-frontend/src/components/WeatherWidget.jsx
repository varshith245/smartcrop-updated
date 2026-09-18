import React, { useEffect, useState } from "react";
import { getLiveWeather } from "../api/weather.api";

export default function WeatherWidget({ initialLocation = "Regional Farm" }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeather = async (loc = initialLocation) => {
    try {
      setLoading(true);
      setError(false);
      const res = await getLiveWeather(null, null, loc);
      setWeather(res.data);
    } catch (err) {
      console.error("Failed to load weather widget data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(initialLocation);
  }, [initialLocation]);

  if (loading && !weather) {
    return (
      <div className="weather-widget-card loading">
        <p>📡 Fetching real-time agro-meteorological data...</p>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="weather-widget-card error">
        <p>⚠️ Weather station unreachable. Click below to retry.</p>
        <button onClick={() => fetchWeather(initialLocation)} className="btn-enable">
          🔄 Retry Connection
        </button>
      </div>
    );
  }

  const isSpraySafe = !weather?.sprayAdvisory?.toLowerCase().includes("avoid") &&
                      !weather?.sprayAdvisory?.toLowerCase().includes("suspend");

  return (
    <div className="weather-widget-card">
      <div className="weather-widget-header">
        <div>
          <span className="weather-badge">Live Satellite Telemetry</span>
          <h3 className="weather-location">📍 {weather?.location || "Regional Farm"}</h3>
          <p className="weather-condition">{weather?.condition || "Partly Cloudy"}</p>
        </div>
        <div className="weather-main-temp">
          <span className="temp-value">{Math.round(weather?.temperature || 28)}°C</span>
        </div>
      </div>

      <div className="weather-metrics-grid">
        <div className="weather-metric-item">
          <span className="metric-icon">💧</span>
          <div>
            <div className="metric-label">Humidity</div>
            <div className="metric-val">{weather?.humidity || 65}%</div>
          </div>
        </div>

        <div className="weather-metric-item">
          <span className="metric-icon">💨</span>
          <div>
            <div className="metric-label">Wind Velocity</div>
            <div className="metric-val">{weather?.windSpeed || 8.5} km/h</div>
          </div>
        </div>

        <div className="weather-metric-item">
          <span className="metric-icon">🌧️</span>
          <div>
            <div className="metric-label">Precipitation</div>
            <div className="metric-val">{weather?.precipitation || 0.0} mm</div>
          </div>
        </div>

        <div className="weather-metric-item">
          <span className="metric-icon">☀️</span>
          <div>
            <div className="metric-label">UV Index</div>
            <div className="metric-val">{weather?.uvIndex || "Moderate"}</div>
          </div>
        </div>
      </div>

      <div className="weather-advisories">
        <div className={`advisory-pill ${isSpraySafe ? "safe" : "warning"}`}>
          <span className="advisory-icon">{isSpraySafe ? "✅" : "⚠️"}</span>
          <div>
            <strong>Spraying Advisory:</strong> {weather?.sprayAdvisory}
          </div>
        </div>

        <div className="advisory-pill info">
          <span className="advisory-icon">💧</span>
          <div>
            <strong>Irrigation Advisory:</strong> {weather?.irrigationAdvisory}
          </div>
        </div>
      </div>
    </div>
  );
}
