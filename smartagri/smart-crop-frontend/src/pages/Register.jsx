import React, { useState } from "react";
import { registerUser } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "FARMER"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);
      alert("OTP sent to your email 📩");
      navigate("/verify", { state: { email: form.email } });
    } catch (err) {
      alert(err?.response?.data?.message || err?.response?.data || "Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-container large-auth">

        <h2>Join Smart Agriculture 🚜</h2>
        <p className="auth-subtitle">
          Create your SmartCrop account and start AI crop predictions
        </p>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="email" placeholder="Email Address" onChange={handleChange} />
          <input name="password" type="password" placeholder="Create Password" onChange={handleChange} />

          <button type="submit">Register</button>
        </form>

        <p className="auth-msg">
          Already registered?
          <Link to="/login"> Login Here 🔐</Link>
        </p>

      </div>

    </div>
  );
}
