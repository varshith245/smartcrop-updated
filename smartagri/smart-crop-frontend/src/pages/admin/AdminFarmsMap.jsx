// src/pages/admin/AdminFarmsMap.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function AdminFarmsMap() {
  const [farms, setFarms] = useState([]);
  const [locations, setLocations] = useState([]);

  // ================= LOAD FARMS =================
  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/admin/farms",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      }
    );

    setFarms(res.data);

    // Convert locations → coordinates
    geocodeLocations(res.data);
  };

  // ================= GEOCODING =================
  const geocodeLocations = async (farmsList) => {
    const geoData = [];

    for (let i = 0; i < farmsList.length; i++) {
      const farm = farmsList[i];

      // 1. Use stored coordinates if available
      if (farm.latitude && farm.longitude && farm.latitude !== 0 && farm.longitude !== 0) {
        geoData.push({
          ...farm,
          lat: Number(farm.latitude),
          lng: Number(farm.longitude),
        });
        continue;
      }

      // 2. Otherwise try geocoding
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(farm.location)}`
        );

        if (res.data && res.data.length > 0) {
          geoData.push({
            ...farm,
            lat: parseFloat(res.data[0].lat),
            lng: parseFloat(res.data[0].lon),
          });
          continue;
        }
      } catch (err) {
        console.warn("Geocode fallback triggered for:", farm.location);
      }

      // 3. Resilient fallback near India center with slight offset
      geoData.push({
        ...farm,
        lat: 20.5937 + ((i % 5) * 0.6 - 1.2),
        lng: 78.9629 + ((Math.floor(i / 5)) * 0.6 - 1.2),
      });
    }

    setLocations(geoData);
  };

  // ================= UI =================
  return (
    <div className="admin-wrapper">
      <h1 className="admin-title">
        🌍 Farms Map Monitoring
      </h1>

      <div className="map-card">
        <MapContainer
          center={[20.5937, 78.9629]} // India center
          zoom={5}
          style={{
            height: "600px",
            width: "100%",
            borderRadius: "16px",
          }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* ===== MARKERS ===== */}
          {locations.map((farm) => (
            <Marker
              key={farm.id}
              position={[farm.lat, farm.lng]}
            >
              <Popup>
                <b>{farm.name}</b>
                <br />
                📍 {farm.location}
                <br />
                🌱 {farm.soilType}
                <br />
                📏 {farm.area} Acres
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}