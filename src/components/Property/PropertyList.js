// src/components/Property/PropertyList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PropertyList.css'; // Import file CSS cho thẻ

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/properties')
      .then(response => {
        setProperties(response.data.data.items);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách bất động sản!', error);
      });
  }, []);

  return (
    <div className="property-list">
      <h2>Danh Sách Bất Động Sản</h2>
      <div className="cards-container">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div className="property-card" key={property.id}>
              <h3>{property.name}</h3>
              <p><strong>Địa chỉ:</strong> {property.address || 'N/A'}</p>
              <p><strong>Số khách tối đa:</strong> {property.maxGuests}</p>
              <p><strong>Số giường:</strong> {property.numBeds}</p>
              <p><strong>Số phòng ngủ:</strong> {property.numBedrooms}</p>
              <p><strong>Số phòng tắm:</strong> {property.numBathrooms}</p>
              <p><strong>Giá:</strong> {property.price} VND</p>
              <p><strong>Trạng thái:</strong> {property.isActive ? 'Hoạt động' : 'Không hoạt động'}</p>
            </div>
          ))
        ) : (
          <p>Không có bất động sản nào.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
