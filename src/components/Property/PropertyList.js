import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/properties')
      .then((response) => {
        setProperties(response.data.data.items || []);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách bất động sản!', error);
      });
  }, []);

  const navigateToDetail = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Khám phá những địa điểm nghỉ dưỡng</h2>
      <div className="row g-4">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div className="col-12 col-md-6 col-lg-4" key={property.id}>
              <div 
                className="card border-0 h-100 rounded-3 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigateToDetail(property.id)}
                style={{ backgroundColor: '#fff' }}
              >
                <div className="position-relative overflow-hidden">
                  <img
                    src={property.image || 'https://placehold.co/600x400/f5f5f5/dedede'}
                    className="card-img-top rounded-3 rounded-bottom-0 object-cover"
                    alt={property.name}
                    style={{ height: '240px' }}
                  />
                  <div 
                    className="position-absolute top-0 end-0 m-3"
                  >
                    <span className={`d-inline-block px-3 py-2 rounded-pill text-white text-sm ${
                      property.isActive ? 'bg-success' : 'bg-secondary'
                    }`}
                    style={{
                      backgroundColor: property.isActive ? 'rgba(25, 135, 84, 0.85)' : 'rgba(108, 117, 125, 0.85)',
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)',
                      fontSize: '0.875rem',
                      lineHeight: '1.25rem'
                    }}>
                      {property.isActive ? 'Đang cho thuê' : 'Ngừng cho thuê'}
                    </span>
                  </div>
                </div>
                <div className="card-body p-4">
                    <h3 className="card-title text-sm font-semibold mb-2 text-gray-800 line-clamp-1 text-center">
                      {property.name} 
                    </h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                      <i className="bi bi-geo-alt me-1"></i>
                      {property.address || 'Đang cập nhật địa chỉ'}
                    </p>
                    <p className="font-semibold text-lg mb-3 text-gray-800">
                      {property.price.toLocaleString()} VND
                      <span className="text-gray-500 text-sm"> / đêm</span>
                    </p>
                  <div className="border-top border-gray-100 pt-3 mt-2">
                    <div className="d-flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="d-flex align-items-center">
                        <i className="bi bi-person-fill me-2 text-gray-500"></i>
                        {property.maxGuests} khách
                      </span>
                      <span className="d-flex align-items-center">
                        <i className="bi bi-door-closed-fill me-2 text-gray-500"></i>
                        {property.numBedrooms} phòng ngủ
                      </span>
                      <span className="d-flex align-items-center">
                        <i className="bi bi-hospital-fill me-2 text-gray-500"></i>
                        {property.numBeds} giường
                      </span>
                      <span className="d-flex align-items-center">
                        <i className="bi bi-water me-2 text-gray-500"></i>
                        {property.numBathrooms} phòng tắm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info bg-light border-0 rounded-3 shadow-sm">
              <i className="bi bi-info-circle me-2"></i>
              Chưa có bất động sản nào được đăng tải.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;