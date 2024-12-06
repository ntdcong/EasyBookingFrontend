import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, Star, Clock, MapPin, Users, User } from 'lucide-react';

// Utility function to format date
const formatDate = (dateString) => {
  if (!dateString || dateString.startsWith('1970-01-01')) return 'Chưa xác định';
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Calculate duration
const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime || startTime.startsWith('1970-01-01')) return 'Chưa xác định';

  const start = new Date(startTime);
  const end = new Date(endTime);

  const durationMs = end - start;
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours} giờ ${minutes} phút`;
};

const ExperienceDetailPage = () => {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulate multiple images or use placeholders
  const experienceImages = [
    "https://via.placeholder.com/1200x800?text=Trải+Nghiệm+1",
    "https://via.placeholder.com/1200x800?text=Trải+Nghiệm+2",
    "https://via.placeholder.com/1200x800?text=Trải+Nghiệm+3",
  ];

  useEffect(() => {
    const fetchExperienceDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/experiences/${id}`);
        setExperience(response.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải chi tiết trải nghiệm. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchExperienceDetail();
  }, [id]);

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

  if (!experience) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">Không tìm thấy trải nghiệm.</div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-lg-5 py-4">
      <div className="row">
        <div className="col-12">
          {/* Header with Back Button and Actions */}
          <div className="d-flex justify-content-between align-items-center mb-3 px-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-link text-dark p-0"
            >
              <i className="bi bi-arrow-left me-2"></i>Quay lại
            </button>
            <div className="d-flex">
              <button 
                className="btn btn-link text-dark me-3"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart 
                  size={24} 
                  fill={isLiked ? 'red' : 'none'} 
                  stroke={isLiked ? 'red' : 'currentColor'}
                />
              </button>
              <button className="btn btn-link text-dark">
                <Share2 size={24} />
              </button>
            </div>
          </div>

          {/* Experience Image Gallery */}
          <div className="position-relative mb-4 px-3">
            <div className="row g-2">
              <div className="col-8">
                <img
                  src={experienceImages[activeImageIndex]}
                  alt={`Trải nghiệm ${activeImageIndex + 1}`}
                  className="img-fluid rounded-4 shadow-sm w-100"
                  style={{ 
                    height: '500px', 
                    objectFit: 'cover' 
                  }}
                />
                <div className="position-absolute top-0 end-0 p-3">
                  <span className="badge bg-white text-dark shadow-sm">
                    <Star size={16} fill="gold" stroke="none" className="me-1" />
                    {(Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="col-4 d-flex flex-column g-2">
                {experienceImages.slice(0,2).map((img, index) => (
                  <div 
                    key={index} 
                    className="flex-grow-1 mb-2 position-relative" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={img} 
                      alt={`Ảnh ${index + 1}`} 
                      className={`img-fluid rounded-3 w-100 h-100 ${activeImageIndex === index ? 'border border-primary' : ''}`}
                      style={{ 
                        objectFit: 'cover',
                        opacity: activeImageIndex === index ? 1 : 0.5
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Content */}
          <div className="row px-3">
            <div className="col-md-8">
              <h2 className="fw-bold mb-3">{experience.name}</h2>
              <div className="d-flex align-items-center text-muted mb-3">
                <MapPin size={18} className="me-2" />
                <span>{`${experience.ward.name}, ${experience.ward.district.name}, ${experience.ward.district.province.name}`}</span>
              </div>

              <div className="card border-0 mb-4">
                <div className="card-body px-0">
                  <h5 className="card-title fw-bold mb-3">Mô tả trải nghiệm</h5>
                  <p className="text-muted">
                    {experience.description || 'Không có mô tả chi tiết'}
                  </p>
                </div>
              </div>

              {/* Experience Details */}
              <div className="mb-4">
                <h5 className="fw-bold mb-3">Chi tiết trải nghiệm</h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <Clock size={20} className="me-3 text-muted" />
                      <div>
                        <small className="text-muted d-block">Thời gian</small>
                        <span>{formatDate(experience.startTime)} - {formatDate(experience.endTime)}</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <Users size={20} className="me-3 text-muted" />
                      <div>
                        <small className="text-muted d-block">Số lượng</small>
                        <span>Tối đa {experience.maxGuests} người</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Host Details */}
              <div className="card border-0 mb-4">
                <div className="card-body px-0">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <img 
                        src={experience.host.avatar || 'https://via.placeholder.com/75'} 
                        alt={`${experience.host.firstName} ${experience.host.lastName}`} 
                        className="rounded-circle" 
                        style={{ width: '75px', height: '75px', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold">
                        {`${experience.host.firstName} ${experience.host.lastName}`}
                      </h5>
                      <p className="text-muted mb-1">
                        <User size={16} className="me-2" />
                        Chủ trải nghiệm
                      </p>
                      <p className="text-muted mb-0">
                        <i className="bi bi-envelope me-2"></i>
                        {experience.host.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0 rounded-4 sticky-top" style={{ top: '20px' }}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <h4 className="mb-0 me-2">
                      <strong>{experience.price?.toLocaleString('vi-VN')}₫</strong>
                    </h4>
                    <small className="text-muted">/ người</small>
                  </div>
                  
                  <div className="d-grid">
                    <button className="btn btn-primary btn-lg rounded-3 mb-2">
                      Đặt trải nghiệm
                    </button>
                    <button className="btn btn-outline-secondary rounded-3">
                      Liên hệ
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <small className="text-muted">Bạn sẽ không bị trừ tiền ngay</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailPage;