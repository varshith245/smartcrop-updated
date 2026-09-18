// src/dashboard/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../api/user.api";
import { getAdminStats } from "../api/admin.api";
import { API_BASE } from "../api/axios";
import NotificationPanel from "../components/NotificationPanel";
import WeatherWidget from "../components/WeatherWidget";

export default function AdminDashboard() {
  const [user, setUser] = useState({});
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  useEffect(() => {
    const loadData = async () => {
      try {
        if (email) {
          const userRes = await getUserByEmail(email);
          setUser(userRes.data);
        }

        const statsRes = await getAdminStats();
        setStats(statsRes.data || {});
      } catch (err) {
        console.error("Admin dashboard error:", err);
      }
    };

    loadData();
  }, [email]);

  const downloadReport = (endpoint, filename) => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/admin/reports/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to download");
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((err) => {
        console.error("Download failed:", err);
        alert("Failed to download PDF report. Ensure backend server is running.");
      });
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>Welcome, {user.name || "Admin"} 👨‍💼</h1>
        <p>Centralized monitoring, platform governance, and macro-agricultural intelligence analytics.</p>
      </div>

      {/* PROFILE */}
      <div className="profile-card">
        <div className="profile-row">
          <div><strong>Name:</strong> {user.name || "System Admin"}</div>
          <div><strong>Email:</strong> {user.email || email}</div>
          <div><strong>Role:</strong> {user.role || "ADMIN"}</div>
        </div>
      </div>

      {/* TOP METRICS & WEATHER */}
      <div className="dashboard-top-grid">
        <WeatherWidget initialLocation="Central Agri Hub" />
        <NotificationPanel />
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h2>{stats.totalUsers || 0}</h2>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalFarms || 0}</h2>
          <p>Total Farms</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalCrops || 0}</h2>
          <p>Total Crops</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalYieldRecords || 0}</h2>
          <p>Yield Records</p>
        </div>
      </div>

      {/* ACTION CARDS */}
      <div className="card-grid">
        <div className="dashboard-card" onClick={() => navigate("/admin/users")}>
          👥 Manage Users
        </div>

        <div className="dashboard-card" onClick={() => navigate("/admin/farms")}>
          🌾 Manage Farms
        </div>

        <div className="dashboard-card" onClick={() => navigate("/admin/farms-map")}>
          🌍 Farms Geo-Map
        </div>

        <div className="dashboard-card" onClick={() => navigate("/admin/crops")}>
          🌱 Manage Crops
        </div>

        <div className="dashboard-card" onClick={() => navigate("/admin/diseases")}>
          🌿 Disease Alerts
        </div>

        <div className="dashboard-card" onClick={() => navigate("/admin/analytics")}>
          📊 Platform Analytics
        </div>

        <div className="dashboard-card" onClick={() => navigate("/admin/irrigation")}>
          💧 Manage Irrigation
        </div>

        <div className="dashboard-card" onClick={() => navigate("/admin/settings")}>
          ⚙️ Platform Settings
        </div>
      </div>

      {/* REPORT EXPORT HUB */}
      <div className="stat-card reports-hub-card">
        <h3>📄 System Intelligence PDF Reports (iText Engine)</h3>
        <p className="sub-text">Generate official compliance and audit reports generated on the Spring Boot backend.</p>

        <div className="reports-button-row">
          <button
            onClick={() => downloadReport("farms/pdf", "farm-summary-report.pdf")}
            className="btn-enable"
          >
            📑 Download Farm Audit PDF
          </button>

          <button
            onClick={() => downloadReport("yields/pdf", "yield-analytics-report.pdf")}
            className="btn-enable"
          >
            📈 Download Yield Analytics PDF
          </button>

          <button
            onClick={() => downloadReport("diseases/pdf", "disease-incidence-report.pdf")}
            className="btn-enable"
          >
            🌿 Download Disease Report PDF
          </button>
        </div>
      </div>
    </div>
  );
}