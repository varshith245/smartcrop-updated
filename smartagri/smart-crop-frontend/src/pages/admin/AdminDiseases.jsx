import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AdminDiseases() {

  const [diseases, setDiseases] = useState([]);

  // ================= LOAD DATA =================
  useEffect(() => {
    loadDiseases();
  }, []);

  const loadDiseases = async () => {
    try {
      const res = await API.get("/disease/all");
      setDiseases(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-teal-900 p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          🌿 Disease Management
        </h1>
        <p className="text-gray-400">
          Total Diseases: {diseases.length}
        </p>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-6">

        {diseases.length === 0 ? (
          <p className="text-gray-400">No diseases found</p>
        ) : (
          diseases.map(d => (
            <div
              key={d.id}
              className="bg-white/10 backdrop-blur-lg border border-white/10
                         rounded-2xl p-6 shadow-xl hover:scale-[1.02]
                         transition duration-300"
            >
              <h2 className="text-xl font-bold text-green-400 mb-2">
                {d.cropName}
              </h2>

              <p className="text-gray-300">
                Disease: <span className="text-white font-semibold">{d.diseaseName || d.name || "Unknown"}</span>
              </p>

              <p className="text-gray-300 mt-1">
                Severity:
                <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  d.severity === "High" ? "bg-red-500/20 text-red-300 border border-red-500/30" :
                  d.severity === "Medium" ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30" :
                  "bg-green-500/20 text-green-300 border border-green-500/30"
                }`}>
                  {d.severity || "Low"}
                </span>
              </p>

              {d.treatment && (
                <p className="text-xs text-gray-300 mt-3 bg-black/20 p-2.5 rounded-lg">
                  <span className="text-emerald-300 font-medium">Treatment:</span> {d.treatment}
                </p>
              )}

              {d.pesticide && (
                <p className="text-xs text-gray-300 mt-2 bg-black/20 p-2.5 rounded-lg">
                  <span className="text-cyan-300 font-medium">Pesticide:</span> {d.pesticide}
                </p>
              )}
            </div>
          ))
        )}

      </div>
    </div>
  );
}