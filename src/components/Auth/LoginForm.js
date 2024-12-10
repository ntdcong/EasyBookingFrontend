import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

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
      const { id, access_token, refresh_token } = response.data;
      
      // Lưu token và id vào localStorage
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("userId", id);
      
      // Gọi callback nếu được truyền (từ modal)
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        // Nếu không có callback (từ trang login riêng), điều hướng về trang chủ
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        
        {errorMessage && (
          <Alert variant="danger" className="mb-3">
            {errorMessage}
          </Alert>
        )}
        
        <Button 
          type="submit" 
          variant="primary" 
          className="w-100"
        >
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;