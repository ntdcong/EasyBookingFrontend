// src/components/Auth/LoginForm.js
import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/signin", {
        email,
        password,
      });
      const { id, access_token, refresh_token } = response.data;
      // Lưu token và id vào localStorage
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("userId", id); // Lưu id người dùng
      // Điều hướng đến trang chính (Home)
      window.location.href = "/home";
    } catch (error) {
      setErrorMessage("Email hoặc mật khẩu không đúng!");
    }
  };
  

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007BFF", color: "#fff", border: "none" }}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
