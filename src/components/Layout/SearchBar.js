import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="search-container py-3">
      <div className="d-flex justify-content-center">
        <div className="search-box position-relative">
          {/* Main Search Bar */}
          <div className="d-flex align-items-center bg-white rounded-pill border shadow-sm" 
               style={{ padding: '8px 8px 8px 20px' }}>
            {/* Location */}
            <div className="search-item" onClick={() => setActiveTab('location')}>
              <div className="small fw-semibold">Địa điểm</div>
              <div className="text-muted small">Tìm kiếm điểm đến</div>
            </div>
            
            <div className="search-divider"></div>
            
            {/* Check In */}
            <div className="search-item" onClick={() => setActiveTab('checkin')}>
              <div className="small fw-semibold">Nhận phòng</div>
              <div className="text-muted small">Thêm ngày</div>
            </div>
            
            <div className="search-divider"></div>
            
            {/* Check Out */}
            <div className="search-item" onClick={() => setActiveTab('checkout')}>
              <div className="small fw-semibold">Trả phòng</div>
              <div className="text-muted small">Thêm ngày</div>
            </div>
            
            <div className="search-divider"></div>
            
            {/* Guests */}
            <div className="search-item d-flex align-items-center" onClick={() => setActiveTab('guests')}>
              <div className="me-3">
                <div className="small fw-semibold">Khách</div>
                <div className="text-muted small">Thêm khách</div>
              </div>
            </div>
            <button className="btn btn-danger rounded-circle p-2">
                <FaSearch size={20} />
            </button>
          </div>

          {/* Dropdown Content */}
          {activeTab && (
            <>
              <div className="position-absolute w-100 bg-white rounded-3 shadow-lg mt-2 p-4" 
                   style={{ zIndex: 1000 }}>
                {activeTab === 'location' && (
                  <div className="popular-locations">
                    <h6 className="mb-3">Địa điểm phổ biến</h6>
                    <div className="row g-3">
                      {['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Đà Lạt', 'Nha Trang', 'Phú Quốc'].map(city => (
                        <div className="col-4" key={city}>
                          <div className="d-flex align-items-center p-2 rounded hover-bg-light">
                            <div className="rounded-3 bg-light" style={{width: 48, height: 48}}></div>
                            <span className="ms-3 small">{city}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {(activeTab === 'checkin' || activeTab === 'checkout') && (
                  <div className="d-flex justify-content-center align-items-center" style={{height: 300}}>
                    <span className="text-muted">Calendar placeholder</span>
                  </div>
                )}
                
                {activeTab === 'guests' && (
                  <div className="guests-selector">
                    {[
                      { type: 'Người lớn', desc: 'Từ 13 tuổi trở lên' },
                      { type: 'Trẻ em', desc: 'Độ tuổi 2-12' },
                      { type: 'Em bé', desc: 'Dưới 2 tuổi' },
                      { type: 'Thú cưng', desc: 'Mang theo thú cưng?' }
                    ].map(guest => (
                      <div key={guest.type} className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                          <div className="small fw-semibold">{guest.type}</div>
                          <div className="small text-muted">{guest.desc}</div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                          <button className="btn btn-outline-secondary rounded-circle p-1" style={{width: 32, height: 32}}>-</button>
                          <span>0</span>
                          <button className="btn btn-outline-secondary rounded-circle p-1" style={{width: 32, height: 32}}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="overlay" onClick={() => setActiveTab(null)}></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;