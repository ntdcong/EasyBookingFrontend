import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';
import './Navbar.css';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginModal from '../Modal/LoginModal';
import Dropdown from 'react-bootstrap/Dropdown';




const Layout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userRole = localStorage.getItem("role");
  const isHost = userRole === "Host";
  const isAuthenticated = localStorage.getItem("accessToken");

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userId"); // Nếu bạn có lưu thêm userId
    window.location.href = "/login";
  };

  // Modal control
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Airbnb-inspired Navbar */}
      <header className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container-fluid px-4 py-2">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="fw-bold text-danger">EasyBooking</span>
          </Link>

          {/* Right Side Navigation */}
          <div className="d-flex align-items-center">
            {/* Original Navbar Links */}
            <div className="d-none d-md-block me-3">
              <ul className="navbar-nav flex-row">
                <li className="nav-item me-2">
                  <Link className="nav-link" to="/properties">Danh Sách Địa Điểm</Link>
                </li>
                <li className="nav-item me-2">
                  <Link className="nav-link" to="/experience">Trải Nghiệm</Link>
                </li>
              </ul>
            </div>

            {/* Become a Host */}
            <Link
              to="/become-host"
              className="text-dark text-decoration-none me-3 fw-semibold d-none d-md-block"
            >
              Trở thành Host
            </Link>

            {/* Language & Global Icon */}
            <div className="me-3 d-none d-md-block">
              <button className="btn btn-light rounded-circle p-2">
                <i className="fas fa-globe"></i>
              </button>
            </div>

            {/* User Profile Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant="light" className="rounded-pill px-2 py-1 d-flex align-items-center">
                <i className="fas fa-bars me-2"></i>
                <div
                  className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                  style={{ width: '30px', height: '30px' }}
                >
                  <i className="fas fa-user"></i>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow dropdown-menu-end">
                {!isAuthenticated ? (
                  <Dropdown.Item onClick={openModal}>Tài Khoản</Dropdown.Item>
                ) : (
                  <>
                    <Dropdown.Item onClick={() => window.location.href = "/my-profile"}>Cá Nhân</Dropdown.Item>
                    <Dropdown.Item onClick={logout}>Đăng xuất</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/booking-history">Chuyến đi của bạn</Dropdown.Item>
                  </>
                )}
                {isHost && (
                  <>
                  <Dropdown.Item as={Link} to="/add-property">Thêm địa điểm</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/property-manager-host">Quản lý địa điểm</Dropdown.Item>
                  </>
                )}
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/help">Trợ giúp</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </header>

      {/* Main Content - Add top padding to prevent content being hidden behind fixed navbar */}
      <main className="flex-grow-1" style={{ paddingTop: '60px' }}>
        {children}
      </main>

      <Outlet />

      {/* Footer - Similar to previous implementation */}
      <footer className="footer bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Hỗ trợ</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-dark text-decoration-none">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="text-dark text-decoration-none">Chống phân biệt đối xử</a></li>
                <li><a href="#" className="text-dark text-decoration-none">Hỗ trợ người khuyết tật</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Đón tiếp khách</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-dark text-decoration-none">Cho thuê nhà trên EasyBooking</a></li>
                <li><a href="#" className="text-dark text-decoration-none">EasyCover cho Chủ nhà</a></li>
                <li><a href="#" className="text-dark text-decoration-none">Tài nguyên về đón tiếp khách</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>EasyBooking</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-dark text-decoration-none">Trang tin tức</a></li>
                <li><a href="#" className="text-dark text-decoration-none">Tính năng mới</a></li>
                <li><a href="#" className="text-dark text-decoration-none">Cơ hội nghề nghiệp</a></li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span>&copy; 2024 EasyBooking, Inc.</span>
              <span className="mx-2">·</span>
              <a href="#" className="text-dark text-decoration-none">Quyền riêng tư</a>
              <span className="mx-2">·</span>
              <a href="#" className="text-dark text-decoration-none">Điều khoản</a>
            </div>
            <div className="d-flex align-items-center">
              <button className="btn btn-light me-2">
                <i className="fas fa-globe me-2"></i>
                Tiếng Việt (VN)
              </button>
              <button className="btn btn-light">
                <i className="fas fa-dollar-sign me-2"></i>
                VND
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Layout;