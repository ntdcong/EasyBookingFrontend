import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Heart, MapPin, Users, Calendar, Star } from 'lucide-react';
import './custom.css';
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported

// Utility function to format date
const formatDate = (dateString) => {
  if (!dateString || dateString.startsWith('1970-01-01')) return 'Chưa xác định';
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Placeholder for experience images
const placeholderImage = "https://via.placeholder.com/400x300?text=Trải+nghiệm";

// Experience Card Component
const ExperienceCard = ({ experience }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  
  const location = `${experience.ward.name}, ${experience.ward.district.name}, ${experience.ward.district.province.name}`;

  const handleClick = () => {
    navigate(`/experience/${experience.id}`); // Navigate to the detail page
  };

  return (
    <div className="card experience-card border-0 mb-4 position-relative" onClick={handleClick}>
      <div className="position-relative">
        <img 
          src={experience.image || placeholderImage} 
          alt={experience.name} 
          className="card-img-top rounded-3" 
          style={{height: '250px', objectFit: 'cover'}} 
          onError={(e) => e.target.src = placeholderImage} 
        />
        <button
          className="btn btn-link position-absolute top-0 end-0 p-2"
          onClick={(e) => {e.stopPropagation(); setIsLiked(!isLiked);}} // Prevent navigation when liking
        >
          <Heart
            fill={isLiked ? '#ff385c' : 'white'}
            color={isLiked ? '#ff385c' : 'black'}
            className="like-icon"
          />
        </button>
      </div>
      <div className="card-body px-3 pt-3 pb-2">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title mb-1 fw-bold">{experience.name}</h5>
          <div className="d-flex align-items-center">
            <Star size={16} fill="#ff385c" color="#ff385c" className="me-1" />
            <span className="small">4.8</span>
          </div>
        </div>
        <p className="text-muted small mb-2">
          {experience.description || 'Trải nghiệm thú vị đang chờ bạn!'}
        </p>
        <div className="d-flex align-items-center text-muted small mb-3">
          <MapPin size={16} className="me-2" />
          {location}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-dark fw-bold">
            Từ <span className="text-primary">800.000đ</span>/người
          </div>
          <button className="btn btn-outline-primary btn-sm rounded-pill">
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
      <div className="container text-center mt-5">
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
    <div className="container px-4 py-4">
      <h1 className="display-6 fw-bold mb-4">Trải nghiệm mới nhất</h1>

      {/* Filters */}
      <div className="d-flex gap-3 mb-4">
        <select
          className="form-select form-select-sm"
          value={filters.province}
          onChange={(e) => setFilters({ ...filters, province: e.target.value })}
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
          className="form-select form-select-sm"
          value={filters.maxGuests}
          onChange={(e) => setFilters({ ...filters, maxGuests: e.target.value })}
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
          className="form-control form-control-sm"
          value={filters.dateRange}
          onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
        />
      </div>

      {/* Experience Cards */}
      {filteredExperiences.length === 0 ? (
        <div className="alert alert-info text-center">
          Không tìm thấy trải nghiệm phù hợp.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredExperiences.map((experience, index) => (
            <div key={index} className="col">
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperiencesPage;
