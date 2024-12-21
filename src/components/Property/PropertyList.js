import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropertyCard from './PropertyCard';
import CategoryFilter from '../Layout/CategoryFilter';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/properties')
      .then((response) => {
        const propertiesArray = Object.values(response.data.data)
          .filter(item => item.id && typeof item.id === 'string');
        setProperties(propertiesArray);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách bất động sản!', error);
      });
  }, []);

  // Filter properties based on the search term
  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateToDetail = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <div className="container py-5">
      <CategoryFilter/>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800" style={{ paddingTop: '20px' }}>
        Khám phá những địa điểm nghỉ dưỡng
      </h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm bất động sản..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row g-4">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div className="col-12 col-md-6 col-lg-4" key={property.id}>
              <PropertyCard
                property={property}
                onClick={() => navigateToDetail(property.id)}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info bg-light border-0 rounded-3 shadow-sm">
              <i className="bi bi-info-circle me-2"></i>
              Không tìm thấy bất động sản nào.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
