    import React, { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import PropertyCard from './PropertyCard';

    const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get('http://localhost:8080/api/v1/properties')
        .then((response) => {
            // Chuyển object thành mảng, loại bỏ các key không phải property
            const propertiesArray = Object.values(response.data.data)
            .filter(item => item.id && typeof item.id === 'string');
            setProperties(propertiesArray);
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
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Khám phá những địa điểm nghỉ dưỡng
        </h2>
        <div className="horizontal-scroll-container d-flex overflow-auto">
            {properties.length > 0 ? (
            properties.map((property) => (
                <div className="me-5" key={property.id} style={{ minWidth: '350px' }}>
                <PropertyCard
                    property={property}
                    onClick={() => navigateToDetail(property.id)}
                />
                </div>
            ))
            ) : (
            <div className="alert alert-info bg-light border-0 rounded-3 shadow-sm">
                <i className="bi bi-info-circle me-2"></i>
                Chưa có bất động sản nào được đăng tải.
            </div>
            )}
        </div>
        </div>
    );
    };

    export default PropertyList;
