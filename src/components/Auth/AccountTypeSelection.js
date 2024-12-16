import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './AccountTypeSelection.css';

const AccountTypeSelection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const handleSelection = (accountType) => {
    if (accountType === "user") {
      navigate("/register/user");
    } else if (accountType === "host") {
      navigate("/register/host");
    }
  };

  return (
    <div className="account-type-container container-fluid d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-5 col-md-6 mb-4">
          <div 
            className={`card account-type-card ${hoveredCard === 'user' ? 'hovered' : ''} ${hoveredCard === 'host' ? 'scaled-down' : ''}`}
            onMouseEnter={() => setHoveredCard('user')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-body text-center">
              <div className="account-type-icon mb-3">
                <i className="fas fa-user"></i>
              </div>
              <h3 className="card-title">Người dùng</h3>
              <p className="card-text">
                Tham gia để khám phá những chỗ ở độc đáo trên khắp thế giới.
              </p>
              <button
                className="btn btn-primary w-100"
                onClick={() => handleSelection("user")}
              >
                Đăng ký Người dùng
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-6">
          <div 
            className={`card account-type-card ${hoveredCard === 'host' ? 'hovered' : ''} ${hoveredCard === 'user' ? 'scaled-down' : ''}`}
            onMouseEnter={() => setHoveredCard('host')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-body text-center">
              <div className="account-type-icon mb-3">
                <i className="fas fa-home"></i>
              </div>
              <h3 className="card-title">Chủ nhà</h3>
              <p className="card-text">
                Chia sẻ không gian sống và tạo thu nhập từ việc cho thuê.
              </p>
              <button
                className="btn btn-success w-100"
                onClick={() => handleSelection("host")}
              >
                Đăng ký Chủ nhà
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelection;
