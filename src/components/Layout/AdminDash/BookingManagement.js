import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    userId: '',
    statusId: '',
    checkin: '',
    checkout: ''
  });

  // Mapping status IDs to readable labels
  const statusLabels = {
    '1': 'Đã Đặt',
    '2': 'Đang Chờ',
    '3': 'Đã Hủy'
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get('http://localhost:8080/api/v1/bookings')
      .then(response => {
        const bookingsData = response.data.items;
        setBookings(bookingsData);
        setFilteredBookings(bookingsData);
        setLoading(false);
      })
      .catch(error => {
        setError('Không thể tải dữ liệu đặt phòng');
        setLoading(false);
      });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const applyFilters = () => {
    let result = [...bookings];

    // Filter by User ID
    if (filters.userId) {
      result = result.filter(booking => 
        booking.userId.toString().includes(filters.userId)
      );
    }

    // Filter by Status
    if (filters.statusId) {
      result = result.filter(booking => 
        booking.statusId.toString() === filters.statusId
      );
    }

    // Filter by Check-in Date
    if (filters.checkin) {
      result = result.filter(booking => 
        new Date(booking.checkin) >= new Date(filters.checkin)
      );
    }

    // Filter by Check-out Date
    if (filters.checkout) {
      result = result.filter(booking => 
        new Date(booking.checkout) <= new Date(filters.checkout)
      );
    }

    setFilteredBookings(result);
  };

  const resetFilters = () => {
    setFilters({
      userId: '',
      statusId: '',
      checkin: '',
      checkout: ''
    });
    setFilteredBookings(bookings);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Quản Lý Đặt Phòng</h2>
        </div>
        <div className="card-body">
          {/* Filtering Section */}
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <label htmlFor="userId" className="form-label">ID Người Dùng</label>
              <input 
                type="text" 
                className="form-control" 
                id="userId"
                placeholder="Nhập ID" 
                name="userId" 
                value={filters.userId} 
                onChange={handleFilterChange} 
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="statusId" className="form-label">Trạng Thái</label>
              <select 
                className="form-select" 
                id="statusId"
                name="statusId" 
                value={filters.statusId} 
                onChange={handleFilterChange}
              >
                <option value="">Tất Cả Trạng Thái</option>
                <option value="1">Đã Đặt</option>
                <option value="2">Đang Chờ</option>
                <option value="3">Đã Hủy</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="checkin" className="form-label">Từ Ngày</label>
              <input 
                type="date" 
                className="form-control" 
                id="checkin"
                name="checkin" 
                value={filters.checkin} 
                onChange={handleFilterChange} 
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="checkout" className="form-label">Đến Ngày</label>
              <input 
                type="date" 
                className="form-control" 
                id="checkout"
                name="checkout" 
                value={filters.checkout} 
                onChange={handleFilterChange} 
              />
            </div>
            <div className="col-12 d-flex gap-2">
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={applyFilters}
              >
                <i className="bi bi-filter me-1"></i>Áp Dụng Lọc
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={resetFilters}
              >
                <i className="bi bi-arrow-clockwise me-1"></i>Đặt Lại
              </button>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Giá Tổng</th>
                  <th scope="col">ID Người Dùng</th>
                  <th scope="col">Ngày Check-in</th>
                  <th scope="col">Ngày Check-out</th>
                  <th scope="col">Phí Dọn Phòng</th>
                  <th scope="col">Trạng Thái</th>
                  <th scope="col">Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking, index) => (
                    <tr key={booking.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{booking.totalPrice.toLocaleString()} VND</td>
                      <td>{booking.userId}</td>
                      <td>{new Date(booking.checkin).toLocaleDateString()}</td>
                      <td>{new Date(booking.checkout).toLocaleDateString()}</td>
                      <td>{booking.cleaningFee.toLocaleString()} VND</td>
                      <td>
                        <span className={`badge ${
                          booking.statusId === '1' ? 'bg-success' : 
                          booking.statusId === '2' ? 'bg-warning' : 
                          'bg-danger'
                        }`}>
                          {statusLabels[booking.statusId]}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button className="btn btn-info">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-warning">
                            <i className="bi bi-pencil"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-muted">
                      Không có đơn đặt phòng nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;