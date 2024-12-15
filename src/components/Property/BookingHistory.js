import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          throw new Error('User ID not found in localStorage');
        }

        const response = await axios.get(`http://localhost:8080/api/v1/bookings/user/${userId}/user-history`);
        
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(amount);
  };

  const renderStatusBadge = (status) => {
    const badgeColors = {
      'PENDING': 'warning',
      'CONFIRMED': 'success',
      'CANCELLED': 'danger'
    };
    
    return (
      <span className={`badge bg-${badgeColors[status] || 'secondary'}`} style={{ fontWeight: '600' }}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Có lỗi xảy ra: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ fontSize: '2rem', fontWeight: '600', color: '#FF5A5F' }}>Lịch sử đặt phòng</h2>
      {bookings.length === 0 ? (
        <div className="alert alert-info">Bạn chưa có đặt phòng nào.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {bookings.map((booking, index) => (
            <div key={index} className="col">
              <div className="card h-100 shadow-lg border-0 rounded-4" style={{ transition: 'all 0.3s ease' }}>
                <div className="card-header d-flex justify-content-between align-items-center" style={{ backgroundColor: '#FF5A5F', borderBottom: '1px solid #ddd', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                  <h5 className="card-title mb-0" style={{ color: 'white' }}>{booking.property.name}</h5>
                  {renderStatusBadge(booking.status.name)}
                </div>
                <div className="card-body" style={{ backgroundColor: '#f9f9f9' }}>
                  <p className="card-text">
                    <strong>Địa chỉ:</strong> {booking.property.address}
                  </p>
                  <p className="card-text">
                    <strong>Thời gian:</strong> {formatDate(booking.checkin)} - {formatDate(booking.checkout)}
                  </p>
                  <p className="card-text">
                    <strong>Số khách:</strong> {booking.property.maxGuests} khách
                  </p>
                  <div className="card-text">
                    <strong>Chi tiết giá:</strong>
                    <ul className="list-unstyled">
                      <li>Giá phòng: {formatCurrency(booking.price)}</li>
                      <li>Phí dọn dẹp: {formatCurrency(booking.cleaningFee)}</li>
                      <li>Phí dịch vụ: {formatCurrency(booking.serviceFee)}</li>
                      <li className="fw-bold">Tổng cộng: {formatCurrency(booking.totalPrice)}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
