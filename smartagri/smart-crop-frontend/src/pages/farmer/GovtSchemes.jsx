import React, { useState } from "react";

export default function GovtSchemes() {
  const [category, setCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const schemes = [
    {
      id: "pm-ksy",
      name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
      category: "IRRIGATION",
      subsidy: "55% – 70% Subsidy",
      target: "Micro-Irrigation (Drip & Sprinkler Systems)",
      description: "Provides major financial subsidies to install precision drip and sprinkler irrigation units, reducing water waste and maximizing water-use efficiency.",
      benefits: "Up to 55% subsidy for small/marginal farmers (up to 70% in selected dryland districts).",
      documents: ["Land 7/12 / RoR document", "Aadhaar Card", "Bank Passbook", "Quotation from authorized irrigation vendor"],
      status: "Active / Open for Applications",
    },
    {
      id: "pm-kisan",
      name: "PM-KISAN Samman Nidhi",
      category: "FINANCIAL",
      subsidy: "₹6,000 / year Direct Transfer",
      target: "All Landholding Farmer Families",
      description: "Direct income support transfer of ₹6,000 per year in three equal installments of ₹2,000 directly into the bank accounts of agricultural landholders.",
      benefits: "Guaranteed cash liquidity for agricultural inputs (seeds, fertilizer, labor).",
      documents: ["Aadhaar Card", "Land ownership proof", "Aadhaar-linked Active Bank Account"],
      status: "Ongoing Recurring Transfer",
    },
    {
      id: "pm-kusum",
      name: "PM-KUSUM (Solar Agricultural Pumps)",
      category: "SOLAR_MACHINERY",
      subsidy: "Up to 60% Solar Pump Subsidy",
      target: "Solar Powered Irrigation Setup",
      description: "Subsidizes standalone solar-powered agriculture pumps (3 HP to 10 HP) and grid-connected solarization of tubewells, eliminating diesel generator costs.",
      benefits: "Central Govt 30% + State Govt 30% subsidy. Farmer pays only 10% to 40% of capital cost.",
      documents: ["Land Record Document", "Aadhaar", "Bank Account Details", "Electricity connection status or NOC"],
      status: "Active / State Portal Applications",
    },
    {
      id: "pmfby",
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      category: "INSURANCE",
      subsidy: "Low Premium (1.5% – 2.0%)",
      target: "Comprehensive Crop Insurance",
      description: "Shields farmers against crop yield loss caused by non-preventable natural risks (drought, flood, pests, unseasonal hail storms).",
      benefits: "Farmers pay just 2% premium for Kharif, 1.5% for Rabi, and 5% for commercial/horticultural crops; balance is subsidized by Government.",
      documents: ["Sowing Certificate", "Land RoR / Tenancy agreement", "Aadhaar Card", "Bank Passbook"],
      status: "Seasonal Registration Open",
    },
    {
      id: "kcc",
      name: "Kisan Credit Card (KCC) Scheme",
      category: "FINANCIAL",
      subsidy: "Concessional 4% Interest Rate",
      target: "Short-Term Working Capital",
      description: "Institutional credit facility offering timely loans up to ₹3 Lakhs at a deeply subsidized interest rate of 4% per annum (with prompt repayment incentive).",
      benefits: "Eliminates reliance on high-interest informal moneylenders for seasonal seeds and sprays.",
      documents: ["Land records", "Identity proof (Aadhaar/Voter ID)", "Passport photo", "No-dues certificate from nearby bank branches"],
      status: "Available at All Nationalized Banks",
    },
    {
      id: "smam",
      name: "Sub-Mission on Agricultural Mechanization (SMAM)",
      category: "SOLAR_MACHINERY",
      subsidy: "40% – 50% Machinery Subsidy",
      target: "Tractors, Drone Sprayers, Harvesters",
      description: "Promotes farm mechanization among smallholder farmers by subsidizing modern agricultural equipment, laser land levelers, and agriculture spray drones.",
      benefits: "Direct bank subsidy on approved tractor implements, rotavators, and certified agri-drones.",
      documents: ["Aadhaar", "Land revenue records", "Caste Certificate (if applicable for enhanced subsidy)", "Driving license / training certificate for drones"],
      status: "State DBT Portal Open",
    },
  ];

  const filteredSchemes = schemes.filter((s) => {
    const matchesCat = category === "ALL" || s.category === category;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.target.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>🏛️ Government Agricultural Welfare & Subsidy Portal</h1>
        <p>Explore central & state agricultural aid, micro-irrigation subsidies, solar pump grants, and crop insurance programs.</p>
      </div>

      {/* TOOLBAR */}
      <div className="mandi-toolbar">
        <div className="filter-chips">
          {[
            { id: "ALL", label: "All Schemes" },
            { id: "IRRIGATION", label: "💧 Irrigation Subsidy" },
            { id: "FINANCIAL", label: "💵 Direct Income & Credit" },
            { id: "SOLAR_MACHINERY", label: "☀️ Solar & Machinery" },
            { id: "INSURANCE", label: "🛡️ Crop Insurance" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`chip-btn ${category === cat.id ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search schemes, solar pumps, insurance..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="styled-input search-box"
        />
      </div>

      {/* SCHEMES LIST */}
      <div className="schemes-grid">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="stat-card scheme-card">
            <div className="scheme-header-row">
              <div>
                <span className="timing-pill">{scheme.target}</span>
                <h3 className="scheme-title">{scheme.name}</h3>
              </div>
              <span className="subsidy-badge">{scheme.subsidy}</span>
            </div>

            <p className="scheme-desc">{scheme.description}</p>

            <div className="scheme-benefit-box">
              <strong>🎁 Key Benefit:</strong> {scheme.benefits}
            </div>

            <div className="scheme-docs-box">
              <strong>📑 Required Documents:</strong>
              <ul>
                {scheme.documents.map((doc, idx) => (
                  <li key={idx}>✓ {doc}</li>
                ))}
              </ul>
            </div>

            <div className="scheme-footer-row">
              <span className="scheme-status">● {scheme.status}</span>
              <button
                onClick={() =>
                  alert(`To apply for ${scheme.name}, visit your local Krishi Vigyan Kendra (KVK) or official state portal (DBT Agriculture).`)
                }
                className="btn-enable small"
              >
                Apply Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
