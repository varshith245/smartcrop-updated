// src/pages/admin/AdminFarms.jsx

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API_BASE } from "../../api/axios";

// 📊 Charts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminFarms() {

  const API = `${API_BASE}/admin/farms`;

  const [farms, setFarms] = useState([]);
  const [search, setSearch] = useState("");

  // ================= LOAD FARMS =================
  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    const res = await axios.get(API, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setFarms(res.data);
  };

  // ================= DELETE =================
  const deleteFarm = async (id) => {
    if (!window.confirm("Delete this farm?")) return;

    await axios.delete(`${API}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    loadFarms();
  };

  // ================= SEARCH =================
  const filteredFarms = useMemo(() => {
    return farms.filter((f) =>
      f.name?.toLowerCase().includes(search.toLowerCase()) ||
      f.location?.toLowerCase().includes(search.toLowerCase()) ||
      f.farmer?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [farms, search]);

  // ================= STATS =================
  const totalFarms = farms.length;

  const totalArea = farms.reduce(
    (sum, f) => sum + (f.area || 0),
    0
  );

  const avgArea =
    totalFarms > 0
      ? (totalArea / totalFarms).toFixed(2)
      : 0;

  // ================= CHART DATA =================

  // Farms by Location
  const locationData = Object.values(
    farms.reduce((acc, farm) => {

      if (!acc[farm.location]) {
        acc[farm.location] = {
          location: farm.location,
          farms: 0,
        };
      }

      acc[farm.location].farms += 1;
      return acc;

    }, {})
  );

  // Soil Distribution
  const soilData = Object.values(
    farms.reduce((acc, farm) => {

      if (!acc[farm.soilType]) {
        acc[farm.soilType] = {
          name: farm.soilType || "Unknown",
          value: 0,
        };
      }

      acc[farm.soilType].value += 1;
      return acc;

    }, {})
  );

  const COLORS = [
    "#00C49F",
    "#0088FE",
    "#FFBB28",
    "#FF8042",
  ];

  // ================= UI =================
  return (
    <div className="admin-wrapper">

      {/* ===== TITLE ===== */}
      <h1 className="admin-title">
        🌾 Admin Farm Monitoring
      </h1>

      {/* ===== STATS ===== */}
      <div className="stats-container">

        <div className="stat-card">
          <div>Total Farms</div>
          <h2>{totalFarms}</h2>
        </div>

        <div className="stat-card">
          <div>Total Area</div>
          <h2>{totalArea} Acres</h2>
        </div>

        <div className="stat-card">
          <div>Avg Farm Size</div>
          <h2>{avgArea} Acres</h2>
        </div>

      </div>

      {/* ===== CHARTS ROW ===== */}
      <div className="charts-grid">

        {/* Bar Chart */}
        <div className="chart-card">

          <h3>Farms by Location</h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={locationData}>
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="farms" />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Pie Chart */}
        <div className="chart-card">

          <h3>Soil Distribution</h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>

              <Pie
                data={soilData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {soilData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* ===== SEARCH ===== */}
      <input
        type="text"
        placeholder="Search farm, location, farmer..."
        className="search-bar"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* ===== TABLE ===== */}
      <table className="users-table">

        <thead>
          <tr>
            <th>Farm</th>
            <th>Location</th>
            <th>Soil</th>
            <th>Area</th>
            <th>Water</th>
            <th>Farmer</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredFarms.map((f) => (

            <tr key={f.id}>

              <td>{f.name}</td>
              <td>{f.location}</td>
              <td>{f.soilType}</td>
              <td>{f.area} Acres</td>
              <td>{f.waterSource}</td>

              <td>
                {f.farmer?.name || "N/A"}
              </td>

              <td>
                {f.farmer?.email || "N/A"}
              </td>

              <td>

                <button
                  className="btn-delete"
                  onClick={() =>
                    deleteFarm(f.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}