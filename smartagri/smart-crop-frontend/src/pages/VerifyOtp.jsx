import React, { useState } from "react";
import { verifyOtp } from "../api/auth.api";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {

  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState("");
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await verifyOtp({ email, otp });
      alert("Account verified successfully! Please log in to continue.");
      navigate("/login");
    } catch (err) {
      alert("Invalid OTP or expired. Please check your email.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Verify OTP 📬</h2>
        {email && (
          <p className="auth-subtitle">
            Enter the 6-digit code sent to <strong>{email}</strong>
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button type="submit">Verify & Activate</button>
        </form>
      </div>
    </div>
  );
}
