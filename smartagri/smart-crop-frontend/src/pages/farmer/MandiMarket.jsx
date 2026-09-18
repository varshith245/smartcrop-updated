import React, { useEffect, useState } from "react";
import { getMandiPrices, estimateHarvestRevenue } from "../../api/market.api";

export default function MandiMarket() {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Calculator State
  const [calcForm, setCalcForm] = useState({
    crop: "Paddy (Basmati)",
    yieldTons: 5.0,
  });
  const [revenueEstimate, setRevenueEstimate] = useState(null);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    loadPrices();
  }, []);

  const loadPrices = async () => {
    try {
      setLoading(true);
      const res = await getMandiPrices();
      setPrices(res.data || []);
      setFilteredPrices(res.data || []);
      if (res.data && res.data.length > 0) {
        handleEstimate(res.data[0].crop, 5.0);
      }
    } catch (err) {
      console.error("Failed to load market prices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = prices;
    if (selectedCategory !== "ALL") {
      result = result.filter(
        (p) => p.category?.toUpperCase() === selectedCategory
      );
    }
    if (search.trim()) {
      result = result.filter((p) =>
        p.crop.toLowerCase().includes(search.toLowerCase()) ||
        p.primaryMarket?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredPrices(result);
  }, [selectedCategory, search, prices]);

  const handleEstimate = async (crop = calcForm.crop, tons = calcForm.yieldTons) => {
    try {
      setCalculating(true);
      const res = await estimateHarvestRevenue(crop, tons);
      setRevenueEstimate(res.data);
    } catch (err) {
      console.error("Estimation failed:", err);
    } finally {
      setCalculating(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>📈 Live Agricultural Mandi & Commodity Prices</h1>
        <p>Monitor real-time market arrivals, Minimum Support Prices (MSP), and optimize harvest liquidation timing.</p>
      </div>

      {/* HARVEST REVENUE CALCULATOR */}
      <div className="stat-card mandi-calc-card">
        <div className="calc-header">
          <h3>💰 Harvest Revenue & Liquidation Calculator</h3>
          <span className="timing-pill">Market Realization Engine</span>
        </div>

        <div className="calc-inputs-row">
          <div className="calc-input-group">
            <label className="input-label">Target Crop</label>
            <select
              value={calcForm.crop}
              onChange={(e) => {
                setCalcForm({ ...calcForm, crop: e.target.value });
                handleEstimate(e.target.value, calcForm.yieldTons);
              }}
              className="styled-select"
            >
              {prices.map((p) => (
                <option key={p.crop} value={p.crop}>
                  {p.crop} (₹{p.currentPrice}/qtl)
                </option>
              ))}
            </select>
          </div>

          <div className="calc-input-group">
            <label className="input-label">Expected Harvest Output (Tons)</label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={calcForm.yieldTons}
              onChange={(e) => {
                const val = parseFloat(e.target.value) || 1;
                setCalcForm({ ...calcForm, yieldTons: val });
                handleEstimate(calcForm.crop, val);
              }}
              className="styled-input"
            />
          </div>
        </div>

        {revenueEstimate && (
          <div className="revenue-summary-banner">
            <div className="rev-stat-item">
              <span className="rev-label">Total Volume</span>
              <strong className="rev-val">{revenueEstimate.quintals} Quintals</strong>
            </div>

            <div className="rev-stat-item">
              <span className="rev-label">Current Mandi Rate</span>
              <strong className="rev-val">₹{revenueEstimate.ratePerQuintal} / qtl</strong>
            </div>

            <div className="rev-stat-item highlight">
              <span className="rev-label">Projected Gross Revenue</span>
              <strong className="rev-val grand">₹{Math.round(revenueEstimate.grossRevenue).toLocaleString("en-IN")}</strong>
            </div>

            <div className="rev-stat-item">
              <span className="rev-label">MSP Assured Floor</span>
              <strong className="rev-val">₹{Math.round(revenueEstimate.mspRevenue).toLocaleString("en-IN")}</strong>
            </div>
          </div>
        )}

        {revenueEstimate?.advice && (
          <div className="advisory-pill safe" style={{ marginTop: "14px" }}>
            <span>📢</span>
            <div><strong>Selling Strategy:</strong> {revenueEstimate.advice}</div>
          </div>
        )}
      </div>

      {/* FILTER TABS & SEARCH */}
      <div className="mandi-toolbar">
        <div className="filter-chips">
          {["ALL", "CEREAL", "COMMERCIAL", "HORTICULTURE", "PULSES", "OILSEED"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`chip-btn ${selectedCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        <input
          type="text"
          placeholder="Search crop or APMC market..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="styled-input search-box"
        />
      </div>

      {/* COMMODITY CARDS GRID */}
      {loading ? (
        <p className="empty-msg">Fetching live Mandi tickers...</p>
      ) : (
        <div className="mandi-grid">
          {filteredPrices.map((item) => {
            const isUp = item.trend === "UP";
            const isDown = item.trend === "DOWN";

            return (
              <div key={item.crop} className="mandi-item-card stat-card">
                <div className="mandi-card-top">
                  <div>
                    <span className="crop-cat-tag">{item.category}</span>
                    <h3 className="mandi-crop-title">{item.crop}</h3>
                    <p className="market-name">📍 {item.primaryMarket}</p>
                  </div>

                  <div className="trend-badge-col">
                    <span
                      className={`trend-pill ${
                        isUp ? "trend-up" : isDown ? "trend-down" : "trend-stable"
                      }`}
                    >
                      {isUp ? "▲ +" : isDown ? "▼ " : "● "}
                      {Math.abs(item.changePercent)}%
                    </span>
                  </div>
                </div>

                <div className="mandi-price-row">
                  <div className="price-box">
                    <span className="price-sub">Market Mandi Rate</span>
                    <h2 className="current-rate">₹{item.currentPrice}</h2>
                    <span className="unit-label">per quintal (100 kg)</span>
                  </div>

                  {item.mspPrice > 0 && (
                    <div className="msp-box">
                      <span className="price-sub">Govt MSP</span>
                      <span className="msp-rate">₹{item.mspPrice}</span>
                      <span className="msp-diff">
                        {item.currentPrice >= item.mspPrice
                          ? `+₹${Math.round(item.currentPrice - item.mspPrice)} over MSP`
                          : "Below MSP"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="selling-advice-box">
                  <p>💡 {item.sellingAdvice}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
