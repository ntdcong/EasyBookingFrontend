import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import {
  FaTree,
  FaRegSnowflake,
  FaGift,
  FaSnowman,
  FaHollyBerry,
  FaSnowflake as FaSnowflakeFilled,
  FaIceCream,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const SnowEffect = () => {
  return (
    <div className="snowflakes" aria-hidden="true">
      {[...Array(100)].map((_, index) => (
        <div
          key={index}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 10}s`,
            opacity: Math.random() * 0.5 + 0.3,
            fontSize: `${Math.random() * 20 + 10}px`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/signin", {
        email,
        password,
      });

      const { id, access_token, refresh_token, role } = response.data;

      // Lưu thông tin vào localStorage
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("userId", id);
      localStorage.setItem("role", role);

      // Điều hướng dựa trên vai trò
      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "Host") {
        navigate("/add-property");
      } else if (onLoginSuccess) {
        onLoginSuccess(); // Gọi callback nếu có
      } else {
        navigate("/");
      }
    } catch (error) {
      // Xử lý lỗi khi đăng nhập thất bại
      setErrorMessage("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="position-relative d-flex justify-content-center align-items-center" style={{ paddingTop: '120px' }}>
      {/* Hiệu ứng tuyết rơi */}
      <SnowEffect />

      <style jsx>{`
      body {
        background-image: url('/christmas.png'); /* Sửa lại đường dẫn */
        background-size: cover;  
        background-position: center center; 
        background-attachment: fixed; 
        min-height: 100vh; 
      }
      .snowflakes {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 1;
      }
      .snowflake {
        position: absolute;
        top: -20px;
        animation: fall linear infinite;
      }
      
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(360deg);
        }
      }
      
      .card {
        max-width: 500px;
        width: 100%;
        background: rgba(255, 255, 255, 0.7); /* Độ mờ cho nền card */
        backdrop-filter: blur(10px); /* Hiệu ứng mờ phía sau card */
        border: 2px solid #2196f3;
        z-index: 10;
      }
      
      .card .text-center {
        margin-bottom: 1.5rem;
      }
      
      .card h2 {
        font-weight: bold;
        color: #2196f3;
      }
      
      .card p {
        color: #777;
      }
      
      .form-control-lg {
        border-radius: 50px;
        padding: 0.75rem 1rem;
        font-size: 1.1rem;
        box-shadow: 0 0 10px rgba(33, 150, 243, 0.2);
        border-color: #2196f3;
      }
      
      .form-control-lg:focus {
        box-shadow: 0 0 15px rgba(33, 150, 243, 0.4);
        border-color: #1976d2;
      }
      
      button {
        background-color: #2196f3;
        border-color: #1976d2;
        font-size: 1.1rem;
        transition: all 0.3s ease;
      }
      
      button:hover {
        transform: scale(1.05);
        background-color: #1976d2;
      }
      
      button:focus {
        outline: none;
        box-shadow: 0 0 10px rgba(33, 150, 243, 0.6);
      }
      
      .alert {
        border-radius: 50px;
        background-color: #f44336;
        color: white;
        text-align: center;
        font-weight: 500;
        padding: 0.75rem;
      }
      
      .alert-danger {
        background-color: #f44336;
      }
      
      .position-absolute {
        opacity: 0.6;
      }
      
      .text-muted {
        color: #777;
      }
      
      .text-muted a {
        color: #2196f3;
      }
      
      .text-muted a:hover {
        text-decoration: underline;
      }
      
      .snowflake {
        font-size: 18px;
        opacity: 0.7;
      }
      
      .snowflake:nth-child(odd) {
        animation-duration: 8s;
      }
      
      .snowflake:nth-child(even) {
        animation-duration: 10s;
      }
      
      .text-success {
        color: #4caf50;
      }
      
      .text-primary {
        color: #2196f3;
      }
      
      .text-danger {
        color: #f44336;
      }
      
      .text-info {
        color: #00bcd4;
      }
      `}</style>

      <div
        className="card shadow-lg rounded-4 p-5 position-relative"
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          border: "2px solid #2196f3",
          zIndex: 10,        
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary mb-3">
            <FaGift className="me-2" /> Đăng Nhập
            <FaHollyBerry className="ms-2 text-danger" />
          </h2>
          <p className="text-muted mb-4">Chào mừng đến với EasyBooing !</p>
        </div>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Địa chỉ Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control-lg rounded-pill shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-3 position-relative">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control-lg rounded-pill shadow-sm"
            />
            <div
              className="position-absolute top-50 end-0 translate-middle-y pe-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} color="#2196f3" /> : <FaEye size={20} color="#2196f3" />}
            </div>
          </Form.Group>

          {errorMessage && (
            <Alert variant="danger" className="mb-3 rounded-pill text-center">
              {errorMessage}
            </Alert>
          )}

          <Button
            type="submit"
            className="w-100 btn-lg rounded-pill shadow-lg text-white"
            style={{
              backgroundColor: "#2196f3",
              borderColor: "#1976d2",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
            }}
          >
            Đăng Nhập <FaSnowflakeFilled className="ms-2" />
          </Button>
        </Form>

        <div className="mt-4 text-center">
          <p>
            Chưa có tài khoản ?{" "}
            <a href="/sign-up" className="text-decoration-none" style={{ color: "#2196f3" }}>
              Đăng ký ngay
            </a>
          </p>
          <p
            className="text-muted"
            style={{
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaTree className="me-2 text-success" />
            Mùa Đông Ấm Áp - Giáng Sinh An Lành
            <FaIceCream className="ms-2 text-info" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
