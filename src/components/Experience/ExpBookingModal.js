import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Users, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import the required CSS

const ExpBookingModal = ({ show, onClose, experienceId, experiencePrice }) => {
  const [bookingData, setBookingData] = useState({
    bookingDate: new Date(),
    totalGuests: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setBookingData(prev => ({
      ...prev,
      bookingDate: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Vui lòng đăng nhập để đặt trải nghiệm");
      }

      const bookingPayload = {
        userId: userId,
        experienceId: experienceId,
        statusId: "e9cde046-6793-41c8-afeb-55b782f21f3b", // ID trạng thái mặc định
        bookingDate: new Date(bookingData.bookingDate).toISOString(),
        price: experiencePrice,
        totalPrice: experiencePrice * bookingData.totalGuests,
        totalGuests: parseInt(bookingData.totalGuests)
      };

      const response = await axios.post(
        `http://localhost:8080/api/v1/experiences/${experienceId}/bookings`,
        bookingPayload
      );

      if (response.status === 201 || response.status === 200) {
        onClose();
        alert('Đặt trải nghiệm thành công!');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Có lỗi xảy ra khi đặt trải nghiệm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">Đặt Trải Nghiệm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="d-flex align-items-center text-secondary">
              <Calendar className="me-2" size={22} />
              Ngày trải nghiệm
            </Form.Label>
            <DatePicker
              selected={bookingData.bookingDate}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="Pp"
              className="form-control form-control-lg"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="d-flex align-items-center text-secondary">
              <Users className="me-2" size={22} />
              Số lượng người tham gia
            </Form.Label>
            <Form.Control
              type="number"
              name="totalGuests"
              value={bookingData.totalGuests}
              onChange={handleInputChange}
              min="1"
              className="form-control-lg"
              required
            />
          </Form.Group>

          <div className="mb-4">
            <h5 className="text-dark">Chi tiết thanh toán:</h5>
            <div className="d-flex justify-content-between text-muted">
              <span>Giá mỗi người:</span>
              <span>{experiencePrice?.toLocaleString('vi-VN')}₫</span>
            </div>
            <div className="d-flex justify-content-between text-dark">
              <strong>Tổng tiền:</strong>
              <strong>{(experiencePrice * bookingData.totalGuests)?.toLocaleString('vi-VN')}₫</strong>
            </div>
          </div>

          <div className="d-grid gap-2">
            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading} 
              className="btn-lg"
            >
              {loading ? 'Đang xử lý...' : 'Xác nhận đặt trải nghiệm'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExpBookingModal;
