import React from 'react';

const PropertyCard = ({ property, onClick }) => {
  // Lấy ảnh đầu tiên hoặc sử dụng placeholder
  const imageUrl = property.images && property.images.length > 0 
    ? property.images[0].url 
    : 'https://placehold.co/600x400/f5f5f5/dedede';

console.log('Image URL:', imageUrl); // Thêm dòng này để kiểm tra URL của ảnh

  return (
    <div
      className="card border-0 h-100 rounded-3 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={onClick}
      style={{ backgroundColor: '#fff' }}
    >
      <div className="position-relative overflow-hidden">
        <img
          src={imageUrl}
          className="card-img-top rounded-3 rounded-bottom-0 object-cover"
          alt={property.name}
          style={{ height: '240px' }}
        />
        <div className="position-absolute top-0 end-0 m-3">
          <span
            className={`d-inline-block px-3 py-2 rounded-pill text-white text-sm ${
              property.isActive ? 'bg-success' : 'bg-secondary'
            }`}
            style={{
              backgroundColor: property.isActive
                ? 'rgba(25, 135, 84, 0.85)'
                : 'rgba(108, 117, 125, 0.85)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
            }}
          >
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
  );
};

export default PropertyCard;