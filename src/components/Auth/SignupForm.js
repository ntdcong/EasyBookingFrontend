import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import Snowfall from 'react-snowfall';

const SignupForm = ({ initialData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: initialData?.email || '',
    phoneNumber: initialData?.phoneNumber || '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0[0-9]{9}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'Vui lòng nhập tên';
    if (!formData.lastName.trim()) newErrors.lastName = 'Vui lòng nhập họ';
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
    }
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự, chứa chữ hoa, chữ thường, số và ký tự đặc biệt';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/signup', formData);

      localStorage.setItem('access_token', response.data.data.access_token);
      localStorage.setItem('refresh_token', response.data.data.refresh_token);
      localStorage.setItem('user_id', response.data.data.id);

      setSubmitSuccess(true);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
      });

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Đăng ký thất bại';
      setSubmitError(errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="signup-wrapper">
      <Snowfall />
      <Container className="py-5">
        <Row className="justify-content-center align-items-center vh-100">
          <Col md={6}>
            <div className="signup-box shadow-lg rounded-4 p-4 bg-white">
              <h2 className="text-center mb-4 text-primary">Đăng Ký Tài Khoản</h2>

              {submitSuccess && (
                <Alert variant="success" className="text-center">
                  Đăng ký tài khoản thành công!
                </Alert>
              )}

              {submitError && (
                <Alert variant="danger" className="text-center">
                  {submitError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Tên</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                        placeholder="Nhập tên"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Họ</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                        placeholder="Nhập họ"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Nhập email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Số Điện Thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.phoneNumber}
                    placeholder="Nhập số điện thoại"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mật Khẩu</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      placeholder="Nhập mật khẩu"
                    />
                    <Button 
                      variant="outline-secondary" 
                      onClick={togglePasswordVisibility}
                      className="password-toggle"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Xác Nhận Mật Khẩu</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                      placeholder="Nhập lại mật khẩu"
                    />
                    <Button 
                      variant="outline-secondary" 
                      onClick={togglePasswordVisibility}
                      className="password-toggle"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                >
                  Đăng Ký
                </Button>

                <div className="text-center">
                  Đã có tài khoản?{" "}
                  <a href="/login" className="text-primary text-decoration-none">
                    Đăng nhập ngay
                  </a>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupForm;