import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API_BASE } from "../../api/axios";

export default function AdminUsers() {

  // ================= API BASE =================
  const API = `${API_BASE}/admin`;

  // ================= STATE =================
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // ================= LOAD USERS =================
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get(`${API}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUsers(res.data);
  };

  // ================= ACTIONS =================

  // CHANGE ROLE
const changeRole = async (id, newRole) => {
  if (!window.confirm(`Change role to ${newRole}?`)) return;

  await axios.put(
    `${API}/users/${id}/role?role=${newRole}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  loadUsers();
};

  // DELETE USER
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await axios.delete(`${API}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    loadUsers();
  };

  // DEACTIVATE
  const deactivateUser = async (id) => {
    await axios.put(
      `${API}/users/${id}/deactivate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    loadUsers();
  };

  // ACTIVATE
  const activateUser = async (id) => {
    await axios.put(
      `${API}/users/${id}/activate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    loadUsers();
  };

  // ================= SEARCH + FILTER =================
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const s = search.toLowerCase();

      return (
        (u.name.toLowerCase().includes(s) ||
          u.email.toLowerCase().includes(s)) &&
        (roleFilter === "" || u.role === roleFilter)
      );
    });
  }, [users, search, roleFilter]);

  // ================= STATS =================
  const admins = users.filter((u) => u.role === "ADMIN").length;
  const farmers = users.filter((u) => u.role === "FARMER").length;

  // ================= UI =================
  return (
    <div className="admin-users-wrapper">

      <h1 className="admin-title">👥 User Management</h1>

      {/* ===== STATS ===== */}
      <div className="stats-container">

        <div className="stat-card">
          <div className="stat-title">Total Users</div>
          <div className="stat-value">{users.length}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Admins</div>
          <div className="stat-value">{admins}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Farmers</div>
          <div className="stat-value">{farmers}</div>
        </div>

      </div>

      {/* ===== FILTER ===== */}
      <div className="filter-container">

        <input
          type="text"
          placeholder="Search name or email..."
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="role-select"
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="FARMER">Farmer</option>
        </select>

      </div>

      {/* ===== TABLE ===== */}
      <table className="users-table">

        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th> {/* ✅ Added */}
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>

              {/* USER */}
              <td>
                <div className="user-cell">
                  <div className="avatar">
                    {u.name.charAt(0)}
                  </div>
                  {u.name}
                </div>
              </td>

              {/* EMAIL */}
              <td>{u.email}</td>

              {/* ROLE */}
              <td>

  {/* ROLE BADGE */}
  <span
    className={`role-badge ${
      u.role === "ADMIN"
        ? "role-admin"
        : "role-farmer"
    }`}
  >
    {u.role}
  </span>

  {/* ROLE DROPDOWN */}
  {u.role !== "ADMIN" && (   // prevent changing system admin if needed
    <select
      className="role-dropdown"
      onChange={(e) =>
        changeRole(u.id, e.target.value)
      }
      defaultValue=""
    >
      <option value="" disabled>
        Change
      </option>

      <option value="FARMER">
        Farmer
      </option>

      <option value="ADMIN">
        Admin
      </option>

    </select>
  )}

</td>

              {/* STATUS */}
              <td
                className={
                  u.status === "ACTIVE"
                    ? "status-active"
                    : "status-disabled"
                }
              >
                {u.status}
              </td>
              

              {/* ACTIONS */}
              <td>

                {/* PROTECT ADMIN DELETE */}
                {u.role !== "ADMIN" && (
                  <button
                    className="btn-delete"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                )}

                {/* ENABLE / DISABLE */}
                {u.status === "ACTIVE" ? (
                  <button
                    className="btn-disable"
                    onClick={() => deactivateUser(u.id)}
                  >
                    Disable
                  </button>
                ) : (
                  <button
                    className="btn-enable"
                    onClick={() => activateUser(u.id)}
                  >
                    Enable
                  </button>
                )}

              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}