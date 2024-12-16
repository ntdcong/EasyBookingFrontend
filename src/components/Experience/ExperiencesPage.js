import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Heart, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Utility function to format date
const formatDate = (dateString) => {
  if (!dateString || dateString.startsWith('1970-01-01')) return 'Chưa xác định';
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Experience Card Component
const ExperienceCard = ({ experience }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const location = `${experience.ward.name}, ${experience.ward.district.name}, ${experience.ward.district.province.name}`;
  const placeholderImage = "https://via.placeholder.com/400x300?text=Tr%E1%BA%A3i+nghi%E1%BB%87m";
  
  const handleClick = () => {
    navigate(`/experience/${experience.id}`);
  };

  return (
    <div 
      className="card border-0 mb-4 shadow-sm" 
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      <div className="position-relative">
        <img 
          src={experience.image && experience.image[0]?.url || placeholderImage} 
          alt={experience.name} 
          className="card-img-top" 
          style={{
            height: '250px', 
            objectFit: 'cover'
          }}
          onError={(e) => e.target.src = placeholderImage}
        />
        <button
          className="btn btn-light btn-sm position-absolute top-0 end-0 me-2 rounded-circle"
          onClick={(e) => { 
            e.stopPropagation(); 
            setIsLiked(!isLiked); 
          }}
        >
          <Heart
            fill={isLiked ? '#ff385c' : 'white'}
            color={isLiked ? '#ff385c' : 'black'}
            size={20}
          />
        </button>
      </div>
      <div className="card-body px-3 pt-3 pb-2">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0 fw-bold">{experience.name}</h5>
          <div className="d-flex align-items-center text-warning">
            <Star size={16} fill="currentColor" className="me-1" />
            <span className="small fw-bold">4.8</span>
          </div>
        </div>
        <p className="text-muted small mb-2">
          {experience.description || 'Trải nghiệm thú vị đang chờ bạn!'}
        </p>
        <div className="d-flex align-items-center text-muted small mb-3">
          <MapPin size={16} className="me-2 text-secondary" />
          <span>{location}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-dark">
            <span className="fw-bold text-primary">Từ 800.000đ</span>/người
          </div>
          <button className="btn btn-outline-primary btn-sm rounded-pill px-3">
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Experiences Page Component
const ExperiencesPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    province: '',
    maxGuests: '',
    dateRange: '',
  });

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/experiences');
        setExperiences(response.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải trải nghiệm. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // Filter experiences based on selected filters
  const filteredExperiences = experiences.filter((experience) => {
    const matchProvince =
      !filters.province ||
      experience.ward.district.province.name.toLowerCase().includes(filters.province.toLowerCase());

    const matchGuests =
      !filters.maxGuests || experience.maxGuests >= parseInt(filters.maxGuests);

    const matchDate = 
      !filters.dateRange || new Date(experience.startDate) >= new Date(filters.dateRange);

    return matchProvince && matchGuests && matchDate;
  });

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4 bg-light">
      <div className="row mb-4 align-items-center">
        <div className="col">
          <h1 className="display-6 fw-bold mb-0">Trải nghiệm mới nhất</h1>
          <p className="text-muted small">Khám phá những trải nghiệm độc đáo</p>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap gap-3">
            <select
              className="form-select form-select-sm flex-grow-1"
              value={filters.province}
              onChange={(e) => setFilters({ ...filters, province: e.target.value })}
              style={{ maxWidth: '200px' }}
            >
              <option value="">Tất cả tỉnh thành</option>
              {Array.from(new Set(experiences.map((exp) => exp.ward.district.province.name)))
                .map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            <select
              className="form-select form-select-sm flex-grow-1"
              value={filters.maxGuests}
              onChange={(e) => setFilters({ ...filters, maxGuests: e.target.value })}
              style={{ maxWidth: '200px' }}
            >
              <option value="">Số lượng người</option>
              {[5, 10, 15, 20].map((guests) => (
                <option key={guests} value={guests}>
                  Tối đa {guests} người
                </option>
              ))}
            </select>
            <input
              type="date"
              className="form-control form-control-sm flex-grow-1"
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              style={{ maxWidth: '200px' }}
            />
          </div>
        </div>
      </div>

      {/* Experience Cards */}
      {filteredExperiences.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Không tìm thấy trải nghiệm phù hợp. Hãy thử điều chỉnh bộ lọc của bạn.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {filteredExperiences.map((experience) => (
            <div key={experience.id} className="col">
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination or Load More */}
      {filteredExperiences.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-outline-primary rounded-pill px-4">
            Xem thêm trải nghiệm
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperiencesPage;