// src/pages/admin/AdminAnalytics.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../api/axios";

export default function AdminAnalytics() {

  const [data, setData] = useState({});

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(
        `${API_BASE}/admin/yield/analytics`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setData(res.data);
    };
    load();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h2>Yield Analytics</h2>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{data.totalRecords || 0}</h2>
          <p>Total Records</p>
        </div>

        <div className="stat-card">
          <h2>{data.totalYield || 0}</h2>
          <p>Total Yield</p>
        </div>

        <div className="stat-card">
          <h2>{data.totalProfit || 0}</h2>
          <p>Total Profit</p>
        </div>

        <div className="stat-card">
          <h2>{data.avgYield || 0}</h2>
          <p>Average Yield</p>
        </div>

      </div>
    </div>
  );
}