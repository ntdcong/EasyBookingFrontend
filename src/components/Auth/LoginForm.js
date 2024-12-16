import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { 
  FaTree, 
  FaRegSnowflake, 
  FaGift, 
  FaSnowman, 
  FaHollyBerry, 
  FaSnowflake as FaSnowflakeFilled,  // Thêm icon bông tuyết đầy
  FaIceCream  // Thêm icon kem lạnh
} from "react-icons/fa";

const SnowEffect = () => {
  return (
    <div className="snowflakes" aria-hidden="true">
      {[...Array(70)].map((_, index) => (
        <div 
          key={index} 
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${10 + Math.random() * 2}s`,
            opacity: Math.random(),
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
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/signin", {
        email,
        password,
      });
      const { id, access_token, refresh_token, role } = response.data;
      
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("userId", id);
      localStorage.setItem("role", role);
      
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div 
      className="position-relative d-flex justify-content-center align-items-center" 
      style={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)",
        overflow: "hidden"
      }}
    >
      {/* Hiệu ứng tuyết rơi */}
      <SnowEffect />

      {/* Trang trí Giáng Sinh */}
      <div className="position-absolute top-0 start-0 p-4">
        <FaTree className="text-success" style={{ fontSize: "3rem", opacity: 0.6 }} />
      </div>
      <div className="position-absolute bottom-0 end-0 p-4">
        <FaSnowman className="text-primary" style={{ fontSize: "3rem", opacity: 0.6 }} />
      </div>

      <style jsx>{`
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
          font-size: 1rem;
          animation: fall linear infinite;
        }
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>

      <div 
        className="card shadow-lg rounded-4 p-5 position-relative" 
        style={{ 
          maxWidth: "500px", 
          width: "100%", 
          background: "rgba(255, 255, 255, 0.7)", // Độ mờ cho nền card
          backdropFilter: "blur(10px)", // Hiệu ứng mờ phía sau card
          border: "2px solid #2196f3",
          zIndex: 10
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary mb-3">
            <FaGift className="me-2" /> Đăng Nhập 
            <FaHollyBerry className="ms-2 text-danger" />
          </h2>
          <p className="text-muted mb-4">
            Chào mừng đến với EasyBooing !
          </p>
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
              style={{ 
                borderColor: "#2196f3",
                boxShadow: "0 0 10px rgba(33, 150, 243, 0.2)"
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control-lg rounded-pill shadow-sm"
              style={{ 
                borderColor: "#2196f3",
                boxShadow: "0 0 10px rgba(33, 150, 243, 0.2)"
              }}
            />
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
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.backgroundColor = "#1976d2";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.backgroundColor = "#2196f3";
            }}
          >
            Đăng Nhập <FaSnowflakeFilled className="ms-2" />
          </Button>
        </Form>

        <div className="mt-4 text-center">
          <p 
            className="text-muted" 
            style={{ 
              fontSize: "0.9rem", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center" 
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
