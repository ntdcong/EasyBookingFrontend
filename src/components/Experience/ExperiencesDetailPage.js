import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ExpBookingModal from './ExpBookingModal'; // Import component modal
import { 
  Heart, 
  Share2, 
  Star, 
  Clock, 
  MapPin, 
  Users, 
  User, 
  ChevronLeft,
  ShieldCheck,
  Award
} from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString || dateString.startsWith('2024-01-01')) return 'Không xác định';
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

const ExperienceDetailPage = () => {
  const [experience, setExperience] = useState(null);
  const [experienceImages, setExperienceImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookingClick = () => {
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
  };

  useEffect(() => {
    const fetchExperienceDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/experiences/${id}`);
        const data = response.data;
        setExperience(data);
        const images = data.image.map(img => img.url);
        setExperienceImages(images);
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
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error || 'Không tìm thấy trải nghiệm'}</div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-lg-5 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 px-3">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-light rounded-circle p-2 shadow-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="d-flex">
          <button 
            className="btn btn-light rounded-circle p-2 me-2 shadow-sm"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart 
              size={24} 
              fill={isLiked ? 'red' : 'none'} 
              stroke={isLiked ? 'red' : 'currentColor'}
            />
          </button>
          <button className="btn btn-light rounded-circle p-2 shadow-sm">
            <Share2 size={24} />
          </button>
        </div>
      </div>

      <div className="px-3 mb-4">
        <div className="row g-3">
          <div className="col-md-8">
            <img 
              src={experienceImages[activeImageIndex]} 
              alt="Ảnh trải nghiệm chính" 
              className="img-fluid rounded-4 w-100" 
              style={{ height: '500px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-4">
            <div className="row g-3">
              {experienceImages.map((img, index) => (
                <div key={index} className="col-6 col-md-12">
                  <img 
                    src={img} 
                    alt={`Hình ảnh ${index + 1}`}
                    className={`img-fluid rounded-3 w-100 ${activeImageIndex === index ? 'border border-dark' : ''}`}
                    style={{ height: '240px', objectFit: 'cover', cursor: 'pointer', opacity: activeImageIndex === index ? 1 : 0.6 }}
                    onClick={() => setActiveImageIndex(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row px-3">
        <div className="col-md-8 pe-md-5">
          <div className="mb-4">
            <h2 className="fw-bold mb-2">{experience.name}</h2>
            <div className="d-flex align-items-center text-muted mb-3">
              <MapPin size={18} className="me-2" />
              <span>{`${experience.ward.name}, ${experience.ward.district.name}, ${experience.ward.district.province.name}`}</span>
            </div>
            <div className="row mb-4">
              <div className="col-md-4 mb-2">
                <Clock size={24} className="me-3 text-primary" />
                <div>
                  <small className="text-muted d-block">Thời gian</small>
                  <span>{formatDate(experience.startTime)} - {formatDate(experience.endTime)}</span>
                </div>
              </div>
              <div className="col-md-4 mb-2">
                <Users size={24} className="me-3 text-primary" />
                <div>
                  <small className="text-muted d-block">Thành viên</small>
                  <span>Tối đa {experience.maxGuests} người</span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h5 className="fw-bold mb-3">Mô tả</h5>
              <p>{experience.description || 'Chưa có thông tin'}</p>
            </div>
            <div className="card border-0 mb-4 bg-light">
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <img 
                    src={experience.host.avatar || 'https://via.placeholder.com/100'} 
                    alt={`${experience.host.firstName} ${experience.host.lastName}`} 
                    className="rounded-circle me-4" 
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 className="mb-1 fw-bold">
                      Người tổ chức: {`${experience.host.firstName} ${experience.host.lastName}`}
                    </h5>
                    <div className="d-flex align-items-center mt-2">
                      <ShieldCheck size={20} className="me-2 text-success" />
                      <small>Đã xác minh danh tính</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
        <div className="card shadow-lg border-0 rounded-4 sticky-top" style={{ top: '20px' }}>
          <div className="card-body p-4">
            <h4 className="mb-3">
              <strong>{experience.price?.toLocaleString('vi-VN')}₫</strong>
              <small className="text-muted ms-2">/ người</small>
            </h4>
            <div className="d-grid gap-2 mb-3">
              <button
                className="btn btn-primary btn-lg rounded-3"
                onClick={handleBookingClick}
              >
                Đặt Ngay
              </button>
              <button className="btn btn-outline-secondary rounded-3">Liên hệ</button>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <ExpBookingModal
        show={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        experienceId={experience?.id} // Đảm bảo id này là UUID hợp lệ
        experiencePrice={experience?.price}
      />
      )}
      </div>
    </div>
  );
};

export default ExperienceDetailPage;
