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
      alert("Account verified");
      navigate("/");
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify OTP</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button type="submit">Verify</button>
      </form>
    </div>
  );
}
