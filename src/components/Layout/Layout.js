import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Layout.css';
import './Navbar.css';
import './Footer.css';
import SearchBar from './SearchBar';
import LoginModal from '../Modal/LoginModal';

const Layout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State để mở/đóng Modal
  const [categories, setCategories] = useState([]); // State chứa danh mục
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };
  // Mở modal
  const openModal = () => setIsModalOpen(true);
  // Đóng modal
  const closeModal = () => setIsModalOpen(false);

  // Lấy dữ liệu danh mục từ API khi component mount
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
      {/* Header và Navbar */}
      <header className="custom-header text-white p-1">
        <nav className="navbar navbar-expand-lg navbar-custom">
          <div className="container">
            <Link className="navbar-brand" to="/">Quản Lý Phòng</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/add-categories">Thêm Danh Mục</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">Danh Sách Danh Mục</Link>
                </li>
                <li className="nav-item dropdown hover-dropdown">
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
                <li className="nav-item">
                  <Link className="nav-link" to="/properties">Danh Sách Địa Điểm</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/book-room">Đặt Phòng</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={openModal}>User</button>  {/* User button */}
                </li>
              </ul>
            </div>
          </div>
          <button
            onClick={logout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Đăng xuất
          </button>
        </nav>

      </header>

      {/* Add SearchBar here */}
      <SearchBar />
      {/* Thanh lọc danh mục */}
      <div className="category-filter-container">
        <div className="category-filter">
          {categories.map((category) => (
            <div key={category.slug} className="category-item">
              <i className={`category-icon`}>{category.icon}</i> {/* Hiển thị icon */}
              <span className="category-name">{category.category_name}</span> {/* Hiển thị tên danh mục */}
            </div>
          ))}
        </div>
      </div>

      <main className="container flex-grow-1 mt-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          {/* Hỗ trợ Section */}
          <div className="footer-nav">
            <div className="footer-section">
              <h3>Hỗ trợ</h3>
              <ul>
                <li><a href="#">Trung tâm trợ giúp</a></li>
                <li><a href="#">Chống phân biệt đối xử</a></li>
                <li><a href="#">Hỗ trợ người khuyết tật</a></li>
                <li><a href="#">Các tùy chọn hủy</a></li>
                <li><a href="#">Báo cáo lo ngại của bạn</a></li>
              </ul>
            </div>
            {/* Đón tiếp khách Section */}
            <div className="footer-section">
              <h3>Đón tiếp khách</h3>
              <ul>
                <li><a href="#">Cho thuê nhà trên EasyBooking</a></li>
                <li><a href="#">EasyCover cho Chủ nhà</a></li>
                <li><a href="#">Tài nguyên về đón tiếp khách</a></li>
                <li><a href="#">Diễn đàn cộng đồng</a></li>
                <li><a href="#">Đón tiếp khách có trách nhiệm</a></li>
                <li><a href="#">Tham gia khóa học miễn phí về công việc Đón tiếp khách</a></li>
                <li><a href="#">Tìm đồng chủ nhà</a></li>
              </ul>
            </div>
            {/* Airbnb Section */}
            <div className="footer-section">
              <h3>EasyBooking</h3>
              <ul>
                <li><a href="#">Trang tin tức</a></li>
                <li><a href="#">Tính năng mới</a></li>
                <li><a href="#">Cơ hội nghề nghiệp</a></li>
                <li><a href="#">Nhà đầu tư</a></li>
                <li><a href="#">Chỗ ở khẩn cấp</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <div className="footer-legal">
              <span>&copy; 2024 EasyBooking, Inc.</span>
              <span className="dot">·</span>
              <a href="#">Quyền riêng tư</a>
              <span className="dot">·</span>
              <a href="#">Điều khoản</a>
              <span className="dot">·</span>
              <a href="#">Sơ đồ trang web</a>
            </div>

            <div className="footer-settings">
              <div className="language-currency">
                <button className="btn-setting">
                  <span>🌐</span>
                  <span>Tiếng Việt (VN)</span>
                </button>
                <button className="btn-setting">
                  <span>💵</span>
                  <span>VND</span>
                </button>
              </div>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Add modal at the end of layout */}
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Layout;
