import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Interactive Tabs State
  const [activeTab, setActiveTab] = useState("overview");

  // Accordion FAQ State
  const [openFaq, setOpenFaq] = useState(0);

  const tabContents = {
    overview: {
      title: "Comprehensive Farm Lifecycle Management",
      subtitle: "Unify telemetry, soil health, weather forecasts, and market intelligence into one synchronized control center.",
      steps: [
        { num: "01", title: "Map & Configure Farms", desc: "Define farm boundaries, soil texture, water sources, and active crops." },
        { num: "02", title: "Live Environmental Tracking", desc: "Continuous satellite weather telemetry and automated spraying safety alerts." },
        { num: "03", title: "Data-Driven Harvesting", desc: "Predict output tonnage and compare Mandi market prices for peak profit." }
      ],
      metric: "34% Average Yield Uplift",
      img: "/assets/hero_banner.jpg"
    },
    planning: {
      title: "AI-Powered Seasonal Crop & Sowing Optimization",
      subtitle: "Evaluate soil chemical balance (pH, N-P-K) against historical meteorological patterns to pick high-ROI crops.",
      steps: [
        { num: "01", title: "Soil NPK Profiling", desc: "Log laboratory test results and receive instant soil health ratings." },
        { num: "02", title: "Crop Matching Engine", desc: "Algorithm analyzes regional rain, temperature, and market demand." },
        { num: "03", title: "Seasonal Sowing Timelines", desc: "Interactive milestone calendar for Kharif, Rabi, and Zaid cultivation." }
      ],
      metric: "96% Soil Chemistry Match",
      img: "/assets/farmer_tablet.jpg"
    },
    control: {
      title: "Precision Water & Evapotranspiration Budgeting",
      subtitle: "Calculate crop-specific water requirements to schedule exact electric pump runtimes, preventing groundwater waste.",
      steps: [
        { num: "01", title: "Evapotranspiration Index", desc: "Calculates daily cubic meters based on crop coefficient (Kc) and soil type." },
        { num: "02", title: "Pump Schedule Automation", desc: "Exact runtime calculations for 3 HP, 5 HP, and 7.5 HP motors." },
        { num: "03", title: "Conservation Verification", desc: "Save up to 45% water and 30% electricity compared to flood watering." }
      ],
      metric: "Up to 55% Water Conserved",
      img: "/assets/precision_irrigation.jpg"
    },
    monitor: {
      title: "Field Pathology & Instant Disease Diagnostics",
      subtitle: "Early detection of fungal, bacterial, and pest infestations with curative chemical and organic treatment protocols.",
      steps: [
        { num: "01", title: "Symptom Pattern Analysis", desc: "Select observed leaf discoloration, wilting, or concentric spots." },
        { num: "02", title: "Pathology Verification", desc: "Instant severity classification (High, Medium, Low) and diagnosis." },
        { num: "03", title: "Treatment & Dosage", desc: "Exact chemical dilution ratios and eco-friendly organic alternatives." }
      ],
      metric: "Instant Curative Advisory",
      img: "/assets/farmer_tablet.jpg"
    }
  };

  const faqs = [
    {
      q: "How does SmartCrop AI predict seasonal crop yield?",
      a: "SmartCrop AI analyzes historical yield data, current land acreage, applied nitrogen-phosphorus-potassium (NPK) ratios, and irrigation volume through machine learning models to deliver projected yield in tons and estimated market return."
    },
    {
      q: "Can I use SmartCrop AI for any type of crop and soil?",
      a: "Yes! The platform supports cereals (Rice, Wheat, Maize), commercial fibers (Cotton, Sugarcane), oilseeds (Soybean, Mustard), and horticultural crops (Tomato, Potato, Onion) across clay, loam, sandy, and black cotton soil profiles."
    },
    {
      q: "How are the live Mandi commodity prices calculated?",
      a: "Our market intelligence service monitors regional APMC market arrivals and official Minimum Support Price (MSP) benchmarks, calculating day-over-day price trends and optimal selling liquidation windows."
    },
    {
      q: "How does the Water Budget calculator save electric power?",
      a: "By computing exact crop evapotranspiration needs rather than guessing irrigation times, the scheduler calculates the minimum pump runtime (hours/minutes) needed, preventing over-irrigation and cutting power bills."
    }
  ];

  const currentTab = tabContents[activeTab];

  return (
    <div className="agrovia-page-wrapper">
      {/* ========================================================= */}
      {/* ====================== HERO SECTION ===================== */}
      {/* ========================================================= */}
      <section className="agrovia-hero-section">
        <div className="hero-eyebrow-pill">
          <span className="eyebrow-dot">●</span>
          <span>Cultivate the Future</span>
        </div>

        <h1 className="agrovia-hero-title">
          Smart Farming for <br />
          <span className="serif-italic">Future Generations</span>
        </h1>

        <p className="agrovia-hero-subtitle">
          Empowering growers with predictive artificial intelligence, satellite agro-meteorology,
          and precision soil analytics to build a resilient, high-yield agricultural legacy.
        </p>

        <div className="hero-cta-group">
          {token ? (
            <button
              onClick={() => navigate(role === "ADMIN" ? "/admin" : "/farmer")}
              className="agrovia-btn-primary"
            >
              Open Farmer Portal →
            </button>
          ) : (
            <Link to="/register" className="agrovia-btn-primary">
              Get Started Free →
            </Link>
          )}

          <a href="#how-it-works" className="agrovia-btn-secondary">
            Explore How It Works
          </a>
        </div>

        {/* HERO PANORAMIC IMAGE CANVAS */}
        <div className="hero-canvas-container">
          <img
            src="/assets/hero_banner.jpg"
            alt="Lush agricultural golden fields under sunlight"
            className="hero-canvas-image"
          />

          {/* FLOATING TELEMETRY BADGES */}
          <div className="canvas-badge telemetry-badge">
            <span className="badge-pulse">●</span>
            <div>
              <strong>98.4% Prediction Accuracy</strong>
              <p>Real-Time Agro-Inference</p>
            </div>
          </div>

          <div className="canvas-badge yield-badge">
            <span className="badge-icon">🌾</span>
            <div>
              <strong>+34% Yield Uplift</strong>
              <p>Precision Soil & Nitrogen Dosing</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ==================== SOLUTIONS SECTION ================== */}
      {/* ========================================================= */}
      <section id="solutions" className="agrovia-section">
        <div className="section-head-center">
          <div className="section-pill-tag">
            <span>•</span> Smart Solutions
          </div>
          <h2 className="section-title">
            Precision Agriculture Built for <br />
            <span className="serif-italic">Modern Farming</span>
          </h2>
          <p className="section-subtitle">
            Harness intelligent modules tailored to the everyday realities of modern cultivation.
          </p>
        </div>

        <div className="solutions-grid-three">
          {/* CARD 1: DISEASE */}
          <div className="solution-card">
            <div className="solution-img-wrap">
              <img
                src="/assets/farmer_tablet.jpg"
                alt="Farmer inspecting crop pathology"
                className="solution-card-img"
              />
              <span className="card-floating-tag">AI Diagnostics</span>
            </div>
            <div className="solution-content">
              <h3>Crop Pathology & Disease Diagnosis</h3>
              <p>
                Identify fungal, bacterial, and pest infestations within seconds. Receive tailored
                chemical and organic treatment protocols with exact spray dosages.
              </p>
              <Link to={token ? "/farmer/disease" : "/login"} className="card-action-link">
                Launch Diagnostic Tool <span>→</span>
              </Link>
            </div>
          </div>

          {/* CARD 2: WATER BUDGET */}
          <div className="solution-card">
            <div className="solution-img-wrap">
              <img
                src="/assets/precision_irrigation.jpg"
                alt="Precision drip irrigation field"
                className="solution-card-img"
              />
              <span className="card-floating-tag">Water Budgeting</span>
            </div>
            <div className="solution-content">
              <h3>Smart Water & Pump Runtime Scheduler</h3>
              <p>
                Eliminate over-irrigation using crop evapotranspiration formulas. Calculate daily liters
                and precise electric pump runtimes for 3 HP, 5 HP, and 7.5 HP motors.
              </p>
              <Link to={token ? "/farmer/water-calculator" : "/login"} className="card-action-link">
                Calculate Water Budget <span>→</span>
              </Link>
            </div>
          </div>

          {/* CARD 3: MANDI RATES */}
          <div className="solution-card">
            <div className="solution-img-wrap">
              <img
                src="/assets/hero_banner.jpg"
                alt="Golden harvest commodities"
                className="solution-card-img"
              />
              <span className="card-floating-tag">Mandi Intelligence</span>
            </div>
            <div className="solution-content">
              <h3>Live Mandi Prices & Profit Maximizer</h3>
              <p>
                Track live commodity prices (₹/quintal) and Minimum Support Prices (MSP). Compute projected
                harvest revenue and optimal market liquidation timing.
              </p>
              <Link to={token ? "/farmer/market" : "/login"} className="card-action-link">
                Explore Market Tickers <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* =================== HOW IT WORKS TABS =================== */}
      {/* ========================================================= */}
      <section id="how-it-works" className="agrovia-section bg-card-surface">
        <div className="section-head-center">
          <div className="section-pill-tag">
            <span>•</span> How It Works
          </div>
          <h2 className="section-title">
            Smart Farming Made <br />
            <span className="serif-italic">Simple and Efficient</span>
          </h2>
          <p className="section-subtitle">
            An intuitive end-to-end workflow designed for rapid adoption by growers and agronomists.
          </p>
        </div>

        {/* HORIZONTAL PILL TABS */}
        <div className="workflow-tabs-pills">
          {[
            { id: "overview", label: "Overview" },
            { id: "planning", label: "Smart Planning" },
            { id: "control", label: "Farm Control" },
            { id: "monitor", label: "Field Monitor" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`workflow-tab-btn ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* DYNAMIC TAB SHOWCASE */}
        <div className="workflow-showcase-box">
          <div className="showcase-info-col">
            <h3 className="showcase-title">{currentTab.title}</h3>
            <p className="showcase-desc">{currentTab.subtitle}</p>

            <div className="showcase-steps-list">
              {currentTab.steps.map((step) => (
                <div key={step.num} className="step-item">
                  <span className="step-num">{step.num}</span>
                  <div>
                    <h4 className="step-heading">{step.title}</h4>
                    <p className="step-detail">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="showcase-metric-pill">
              <span className="metric-pill-dot">●</span>
              <strong>{currentTab.metric}</strong>
            </div>
          </div>

          <div className="showcase-visual-col">
            <img
              src={currentTab.img}
              alt="Workflow preview"
              className="showcase-display-img"
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* =================== PLATFORM LEGACY ===================== */}
      {/* ========================================================= */}
      <section id="legacy" className="agrovia-section">
        <div className="legacy-statement-card">
          <div className="section-pill-tag">
            <span>•</span> Cultiva Legacy
          </div>

          <h2 className="legacy-editorial-text">
            We combine advanced agricultural meteorology and AI with{" "}
            <span className="serif-italic">time-tested farming wisdom</span>{" "}
            <span className="inline-img-capsule">
              <img src="/assets/farmer_tablet.jpg" alt="Farmer in field" />
            </span>{" "}
            to elevate crop yield across every acre.
          </h2>

          <div className="legacy-metrics-row">
            <div className="legacy-metric-item">
              <h3>10,000+</h3>
              <p>Acres Optimized</p>
            </div>
            <div className="legacy-metric-item">
              <h3>98.4%</h3>
              <p>Diagnostic Accuracy</p>
            </div>
            <div className="legacy-metric-item">
              <h3>₹42 Lakhs+</h3>
              <p>Additional Profit Generated</p>
            </div>
            <div className="legacy-metric-item">
              <h3>24/7</h3>
              <p>AI Agronomist Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ===================== FAQ ACCORDION ===================== */}
      {/* ========================================================= */}
      <section id="faq" className="agrovia-section">
        <div className="section-head-center">
          <div className="section-pill-tag">
            <span>•</span> Frequently Asked Questions
          </div>
          <h2 className="section-title">
            Answers for <span className="serif-italic">Every Farmer</span>
          </h2>
        </div>

        <div className="faq-accordion-wrap">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`faq-accordion-card ${isOpen ? "open" : ""}`}
                onClick={() => setOpenFaq(isOpen ? -1 : idx)}
              >
                <div className="faq-question-row">
                  <h4>{faq.q}</h4>
                  <span className="faq-toggle-icon">{isOpen ? "−" : "+"}</span>
                </div>
                {isOpen && <p className="faq-answer-text">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* =================== BOTTOM CTA BANNER =================== */}
      {/* ========================================================= */}
      <section className="agrovia-section">
        <div className="agrovia-cta-banner">
          <div className="cta-banner-content">
            <div className="hero-eyebrow-pill on-dark">
              <span>●</span> Start Sustainable Agriculture Today
            </div>
            <h2 className="cta-banner-title">
              Make farming smarter, <br />
              <span className="serif-italic">stronger, and simpler.</span>
            </h2>
            <p className="cta-banner-sub">
              Join progressive farmers leveraging artificial intelligence, satellite weather advisories,
              and live Mandi benchmarks to cultivate higher yields and protect soil fertility.
            </p>

            <div className="hero-cta-group">
              <Link to="/register" className="agrovia-btn-primary light">
                Get Started Free →
              </Link>
              <Link to="/login" className="agrovia-btn-secondary light">
                Login to Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ======================== FOOTER ========================= */}
      {/* ========================================================= */}
      <footer className="agrovia-footer">
        <div className="footer-content-wrap">
          <div className="footer-brand-col">
            <div className="nav-brand">
              <span className="brand-sprout-icon">🌱</span>
              <span className="brand-name">SmartCrop <span className="brand-accent">AI</span></span>
            </div>
            <p className="footer-tagline">
              Modern precision agriculture intelligence designed for future generations.
            </p>
          </div>

          <div className="footer-links-col">
            <h5>Farmer Modules</h5>
            <Link to="/farmer/disease">AI Disease Diagnostics</Link>
            <Link to="/farmer/market">Mandi Market Prices</Link>
            <Link to="/farmer/water-calculator">Water Budgeting</Link>
            <Link to="/farmer/recommend">AI Crop Advice</Link>
          </div>

          <div className="footer-links-col">
            <h5>Government & Community</h5>
            <Link to="/farmer/schemes">Welfare Schemes & Subsidies</Link>
            <Link to="/farmer/calendar">Seasonal Agri Calendar</Link>
            <Link to="/farmer/farms">Farm Geo-Mapping</Link>
          </div>

          <div className="footer-links-col">
            <h5>Platform</h5>
            <Link to="/login">Farmer Portal</Link>
            <Link to="/admin">Administrator Gateway</Link>
            <a href="#faq">FAQ & Support</a>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} SmartCrop AI. All rights reserved. Precision Agriculture for Sustainable Growth.</p>
        </div>
      </footer>
    </div>
  );
}
