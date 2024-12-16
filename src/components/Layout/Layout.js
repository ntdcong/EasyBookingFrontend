import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Layout.css';
import './Navbar.css';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SearchBar from './SearchBar';
import LoginModal from '../Modal/LoginModal';
import ProfilePage from '../Auth/ProfilePage';

const Layout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Fetch categories
  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
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

          {/* Center Search Bar - Only on larger screens */}
          <div className="d-none d-md-block flex-grow-1 mx-4">
            <div className="input-group rounded-pill shadow-sm">
              <input
                type="text"
                className="form-control rounded-start-pill border-0 ps-4"
                placeholder="Start your search"
              />
              <button
                className="btn btn-danger rounded-end-pill px-3"
                type="button"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          {/* Right Side Navigation */}
          <div className="d-flex align-items-center">
            {/* Original Navbar Links */}
            <div className="d-none d-md-block me-3">
              <ul className="navbar-nav flex-row">
                <li className="nav-item dropdown hover-dropdown me-2">
                  <Link className="nav-link" to="#" id="addressDropdown" role="button" aria-expanded="false">Địa Chỉ</Link>
                  <ul className="dropdown-menu" aria-labelledby="addressDropdown">
                    <li>
                      <Link className="dropdown-item" to="/provinces">Danh Sách Tỉnh</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/districts">Danh Sách Huyện</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/wards">Danh Sách Đường</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item me-2">
                  <Link className="nav-link" to="/properties">Danh Sách Địa Điểm</Link>
                </li>
                <li className="nav-item me-2">
                  <Link className="nav-link" to="/experience">Trải Nghiệm</Link>
                </li>
                <li className="nav-item me-2">
                  <Link className="nav-link" to="/add-categories">Thêm Danh Mục</Link>
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
            <div className="dropdown">
              <button
                className="btn btn-light rounded-pill px-2 py-1 d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-bars me-2"></i>
                <div
                  className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                  style={{ width: '30px', height: '30px' }}
                >
                  <i className="fas fa-user"></i>
                </div>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow">
                {!isAuthenticated && (
                  <li>
                    <button className="dropdown-item" onClick={openModal}>Tài Khoản</button>
                  </li>
                )}
                {isAuthenticated && (
                  <>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => window.location.href = "/my-profile"}
                      >
                        Cá Nhân
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>Đăng xuất</button>
                    </li>
                    <li><Link to="/booking-history" className="dropdown-item">Chuyến đi của bạn</Link></li>
                  </>
                )}
                <li><hr className="dropdown-divider" /></li>
                <li><Link to="/help" className="dropdown-item">Trợ giúp</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="category-filter-container">
        <div className="container-fluid px-4">
          <div className="category-filter d-flex overflow-auto pb-2">
            {categories.map((category) => (
              <div key={category.slug} className="category-item me-3 text-center">
                <div className="d-flex flex-column align-items-center">
                  <i className={`category-icon mb-1`}>{category.icon}</i>
                  <span className="category-name small">{category.category_name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Add top padding to prevent content being hidden behind fixed navbar */}
      <main className="flex-grow-1" style={{ paddingTop: '20px' }}>
        {children}
      </main>

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