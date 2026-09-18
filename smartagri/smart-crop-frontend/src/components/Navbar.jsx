import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setMobileMenuOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const toggleAgriBot = () => {
    window.dispatchEvent(new CustomEvent("toggle-agribot"));
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/#" + id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* ========================================================= */}
      {/* ============ TOP FLOATING / MOBILE APP NAVBAR ============ */}
      {/* ========================================================= */}
      <header className="agrovia-nav-wrapper">
        <nav className="agrovia-nav-capsule">
          {/* ===== LOGO ===== */}
          <div className="nav-brand" onClick={() => navigate("/")}>
            <span className="brand-sprout-icon">🌱</span>
            <span className="brand-name">
              SmartCrop <span className="brand-accent">AI</span>
            </span>
          </div>

          {/* ===== DESKTOP NAV LINKS (HIDDEN ON MOBILE) ===== */}
          <div className="nav-links-pills desktop-only">
            <Link to="/" className={`nav-pill ${isActive("/") ? "active" : ""}`}>
              Home
            </Link>

            {/* ADMIN MENU */}
            {token && role === "ADMIN" && (
              <>
                <Link to="/admin" className={`nav-pill ${isActive("/admin") ? "active" : ""}`}>
                  Dashboard
                </Link>
                <Link to="/admin/users" className={`nav-pill ${isActive("/admin/users") ? "active" : ""}`}>
                  Users
                </Link>
                <Link to="/admin/farms" className={`nav-pill ${isActive("/admin/farms") ? "active" : ""}`}>
                  Farms
                </Link>
                <Link to="/admin/farms-map" className={`nav-pill ${isActive("/admin/farms-map") ? "active" : ""}`}>
                  🌍 Map
                </Link>
                <Link to="/admin/crops" className={`nav-pill ${isActive("/admin/crops") ? "active" : ""}`}>
                  Crops
                </Link>
                <Link to="/admin/diseases" className={`nav-pill ${isActive("/admin/diseases") ? "active" : ""}`}>
                  Diseases
                </Link>
              </>
            )}

            {/* FARMER MENU */}
            {token && role === "FARMER" && (
              <>
                <Link to="/farmer" className={`nav-pill ${isActive("/farmer") ? "active" : ""}`}>
                  Dashboard
                </Link>
                <Link to="/farmer/farms" className={`nav-pill ${isActive("/farmer/farms") ? "active" : ""}`}>
                  My Farms
                </Link>
                <Link to="/farmer/market" className={`nav-pill ${isActive("/farmer/market") ? "active" : ""}`}>
                  Mandi Rates
                </Link>
                <Link to="/farmer/disease" className={`nav-pill ${isActive("/farmer/disease") ? "active" : ""}`}>
                  Diagnostics
                </Link>
                <Link to="/farmer/water-calculator" className={`nav-pill ${isActive("/farmer/water-calculator") ? "active" : ""}`}>
                  Water Budget
                </Link>
                <Link to="/farmer/schemes" className={`nav-pill ${isActive("/farmer/schemes") ? "active" : ""}`}>
                  Schemes
                </Link>
                <Link to="/farmer/recommend" className={`nav-pill ${isActive("/farmer/recommend") ? "active" : ""}`}>
                  AI Advice
                </Link>
                <Link to="/farmer/calendar" className={`nav-pill ${isActive("/farmer/calendar") ? "active" : ""}`}>
                  Calendar
                </Link>
              </>
            )}

            {!token && (
              <>
                <a href="#solutions" className="nav-pill">Solutions</a>
                <a href="#how-it-works" className="nav-pill">How It Works</a>
                <a href="#legacy" className="nav-pill">Our Legacy</a>
                <a href="#faq" className="nav-pill">FAQ</a>
              </>
            )}
          </div>

          {/* ===== RIGHT ACTIONS ===== */}
          <div className="nav-actions">
            <div className="desktop-theme-wrap">
              <ThemeSwitcher />
            </div>

            {/* DESKTOP AUTH BUTTONS */}
            <div className="desktop-only">
              {!token ? (
                <div className="auth-pill-group">
                  <Link to="/login" className="nav-btn-ghost">
                    Login
                  </Link>
                  <Link to="/register" className="nav-btn-primary">
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="auth-pill-group">
                  <button
                    onClick={() => navigate(role === "ADMIN" ? "/admin" : "/farmer")}
                    className="nav-btn-outline"
                  >
                    Portal
                  </button>
                  <button onClick={handleLogout} className="nav-btn-ghost logout">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              className="mobile-hamburger-btn mobile-only"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </header>

      {/* ========================================================= */}
      {/* ============= MOBILE SLIDE-OUT APP DRAWER ================ */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <aside className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="nav-brand" onClick={() => { navigate("/"); setMobileMenuOpen(false); }}>
                <span className="brand-sprout-icon">🌱</span>
                <span className="brand-name">SmartCrop <span className="brand-accent">AI</span></span>
              </div>
              <button
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="drawer-user-card">
              <div className="user-card-avatar">
                {role === "ADMIN" ? "🛡️" : role === "FARMER" ? "👨‍🌾" : "🌱"}
              </div>
              <div className="user-card-meta">
                <strong>{role === "ADMIN" ? "Administrator" : role === "FARMER" ? "Verified Grower" : "SmartCrop Guest"}</strong>
                <span>{token ? "Connected to Portal" : "Join the Agricultural Revolution"}</span>
              </div>
            </div>

            <div className="drawer-nav-list">
              <span className="drawer-group-label">Quick Navigation</span>
              <button onClick={() => { navigate("/"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                <span>🏠</span> Home
              </button>
              <button onClick={() => scrollToSection("solutions")} className="drawer-link-btn">
                <span>🌾</span> Smart Solutions
              </button>
              <button onClick={() => scrollToSection("how-it-works")} className="drawer-link-btn">
                <span>⚡</span> How It Works
              </button>
              <button onClick={() => scrollToSection("legacy")} className="drawer-link-btn">
                <span>📜</span> Cultiva Legacy
              </button>
              <button onClick={() => scrollToSection("faq")} className="drawer-link-btn">
                <span>❓</span> FAQs & Guidance
              </button>

              {/* FARMER MODULES */}
              {token && role === "FARMER" && (
                <>
                  <span className="drawer-group-label">Farmer Operations</span>
                  <button onClick={() => { navigate("/farmer"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>📊</span> Farmer Dashboard
                  </button>
                  <button onClick={() => { navigate("/farmer/farms"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>🗺️</span> My Farms & Land
                  </button>
                  <button onClick={() => { navigate("/farmer/market"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>📈</span> Mandi Live Prices
                  </button>
                  <button onClick={() => { navigate("/farmer/disease"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>🔬</span> Crop Diagnostics
                  </button>
                  <button onClick={() => { navigate("/farmer/water-calculator"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>💧</span> Water Budget & Pump
                  </button>
                  <button onClick={() => { navigate("/farmer/schemes"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>🏛️</span> Welfare Schemes
                  </button>
                  <button onClick={() => { navigate("/farmer/recommend"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>🤖</span> AI Crop Advisory
                  </button>
                  <button onClick={() => { navigate("/farmer/calendar"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>📅</span> Seasonal Calendar
                  </button>
                </>
              )}

              {/* ADMIN MODULES */}
              {token && role === "ADMIN" && (
                <>
                  <span className="drawer-group-label">Admin Gateway</span>
                  <button onClick={() => { navigate("/admin"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>🛡️</span> Admin Dashboard
                  </button>
                  <button onClick={() => { navigate("/admin/users"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>👥</span> Manage Users
                  </button>
                  <button onClick={() => { navigate("/admin/farms"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>🚜</span> Farm Records
                  </button>
                  <button onClick={() => { navigate("/admin/farms-map"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>🌍</span> GIS Satellite Map
                  </button>
                  <button onClick={() => { navigate("/admin/crops"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>🌱</span> Crops Registry
                  </button>
                  <button onClick={() => { navigate("/admin/diseases"); setMobileMenuOpen(false); }} className="drawer-link-btn">
                    <span>🦠</span> Disease Database
                  </button>
                </>
              )}
            </div>

            <div className="drawer-footer">
              <div className="drawer-theme-row">
                <span>Display Theme:</span>
                <ThemeSwitcher />
              </div>

              {!token ? (
                <div className="drawer-auth-btns">
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="drawer-btn-primary">
                    Get Started Free →
                  </Link>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="drawer-btn-secondary">
                    Login to Portal
                  </Link>
                </div>
              ) : (
                <div className="drawer-auth-btns">
                  <button
                    onClick={() => { navigate(role === "ADMIN" ? "/admin" : "/farmer"); setMobileMenuOpen(false); }}
                    className="drawer-btn-primary"
                  >
                    Open Portal →
                  </button>
                  <button onClick={handleLogout} className="drawer-btn-secondary logout">
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* ========================================================= */}
      {/* ============ NATIVE MOBILE BOTTOM APP NAV BAR ============ */}
      {/* ========================================================= */}
      <nav className="mobile-bottom-nav mobile-only">
        <button
          onClick={() => {
            if (location.pathname !== "/") navigate("/");
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`bottom-nav-item ${isActive("/") ? "active" : ""}`}
        >
          <span className="bottom-nav-icon">🏠</span>
          <span className="bottom-nav-label">Home</span>
        </button>

        <button
          onClick={() => scrollToSection("solutions")}
          className="bottom-nav-item"
        >
          <span className="bottom-nav-icon">🌾</span>
          <span className="bottom-nav-label">Solutions</span>
        </button>

        <button
          onClick={() => scrollToSection("how-it-works")}
          className="bottom-nav-item"
        >
          <span className="bottom-nav-icon">⚡</span>
          <span className="bottom-nav-label">Workflow</span>
        </button>

        <button
          onClick={() => {
            if (!token) navigate("/login");
            else navigate(role === "ADMIN" ? "/admin" : "/farmer");
          }}
          className={`bottom-nav-item ${location.pathname.startsWith("/farmer") || location.pathname.startsWith("/admin") ? "active" : ""}`}
        >
          <span className="bottom-nav-icon">🚜</span>
          <span className="bottom-nav-label">{token ? "Portal" : "Login"}</span>
        </button>

        <button
          onClick={toggleAgriBot}
          className="bottom-nav-item agribot-item"
        >
          <span className="bottom-nav-icon pulse-icon">🤖</span>
          <span className="bottom-nav-label">AgriBot</span>
        </button>
      </nav>
    </>
  );
}