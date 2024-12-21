import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HostPropertyManagement = () => {
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showBookingsModal, setShowBookingsModal] = useState(false);
    const [showBookingDetailModal, setShowBookingDetailModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:8080/api/v1/properties/owner/${userId}`)
                .then(response => {
                    setProperties(response.data.data.items);
                })
                .catch(error => console.error("Error fetching properties:", error));
        }
    }, []);

    const handleViewBookings = (propertyId) => {
        setSelectedProperty(propertyId);
        axios.get(`http://localhost:8080/api/v1/properties/${propertyId}/bookings`)
            .then(response => {
                setBookings(response.data.data);
                setShowBookingsModal(true);
            })
            .catch(error => console.error("Error fetching bookings:", error));
    };

    const handleViewBookingDetail = (bookingId) => {
        axios.get(`http://localhost:8080/api/v1/bookings/${bookingId}`)
            .then(response => {
                setSelectedBooking(response.data);
                setShowBookingDetailModal(true);
            })
            .catch(error => console.error("Error fetching booking details:", error));
    };

    const handleCloseBookingsModal = () => {
        setShowBookingsModal(false);
        setBookings([]);
    };

    const handleCloseBookingDetailModal = () => {
        setShowBookingDetailModal(false);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            weekday: 'long',
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

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-primary">Quản lý Property</h2>
            <div className="row">
                {properties.map(property => (
                    <div key={property.id} className="col-md-6 col-lg-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            {property.image && (
                                <img src={property.image} className="card-img-top" alt={property.name} style={{ height: '200px', objectFit: 'cover' }} />
                            )}
                            <div className="card-body">
                                <h5 className="card-title text-primary">{property.name}</h5>
                                <p className="card-text">
                                    <i className="bi bi-geo-alt-fill me-2"></i>
                                    {property.address}
                                </p>
                                <p className="card-text">
                                    <strong>Giá: </strong>
                                    <span className="text-success">{formatCurrency(property.price)}</span>
                                </p>
                                <button
                                    className="btn btn-outline-primary w-100"
                                    onClick={() => handleViewBookings(property.id)}
                                >
                                    <i className="bi bi-calendar-check me-2"></i>
                                    Xem booking
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Danh sách Booking */}
            {showBookingsModal && (
                <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            {/* Header */}
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <i className="bi bi-calendar3 me-2"></i>
                                    Danh sách Booking
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={handleCloseBookingsModal}
                                ></button>
                            </div>
                            {/* Body */}
                            <div className="modal-body">
                                {bookings.length > 0 ? (
                                    <div className="row row-cols-1 row-cols-md-2 g-3">
                                        {bookings.map((booking) => (
                                            <div className="col" key={booking.id}>
                                                <div className="card border-0 shadow-sm">
                                                    <div className="card-body">
                                                        {/* Header thông tin booking */}
                                                        <h6 className="card-title text-primary">
                                                            <i className="bi bi-card-heading me-2"></i>
                                                            Booking #{booking.id}
                                                        </h6>
                                                        <hr />
                                                        {/* Nội dung thông tin */}
                                                        <div className="mb-2">
                                                            <strong>Ngày nhận:</strong> {formatDate(booking.checkin)}
                                                        </div>
                                                        <div className="mb-2">
                                                            <strong>Ngày trả:</strong> {formatDate(booking.checkout)}
                                                        </div>
                                                        <div className="mb-3">
                                                            <strong>Trạng thái:</strong>{" "}
                                                            <span
                                                                className={`badge bg-${booking.status === "CONFIRMED"
                                                                        ? "success"
                                                                        : "warning"
                                                                    }`}
                                                            >
                                                                {booking.status}
                                                            </span>
                                                        </div>
                                                        {/* Nút Thao tác */}
                                                        <button
                                                            className="btn btn-sm btn-outline-primary w-100"
                                                            onClick={() => handleViewBookingDetail(booking.id)}
                                                        >
                                                            <i className="bi bi-info-circle me-1"></i>
                                                            Xem chi tiết
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-5">
                                        <i className="bi bi-calendar-x text-muted" style={{ fontSize: "3rem" }}></i>
                                        <p className="mt-3">Chưa có booking nào.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Modal Chi tiết Booking */}
            {showBookingDetailModal && selectedBooking && (
                <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            {/* Header */}
                            <div className="modal-header bg-info text-white">
                                <h5 className="modal-title">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Chi tiết Booking #{selectedBooking.id}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={handleCloseBookingDetailModal}
                                ></button>
                            </div>
                            {/* Body */}
                            <div className="modal-body">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <div className="row">
                                            {/* Cột trái: Thông tin khách hàng */}
                                            <div className="col-md-6">
                                                <h6 className="text-muted mb-3">
                                                    <i className="bi bi-person me-2"></i>Thông tin khách hàng
                                                </h6>
                                                <p><strong>Tên:</strong> {selectedBooking.user.firstName} {selectedBooking.user.lastName}</p>
                                                <p><strong>SĐT:</strong> {selectedBooking.user.phoneNumber}</p>
                                                <p><strong>Email:</strong> {selectedBooking.user.email}</p>
                                                <p><strong>Địa chỉ:</strong> {selectedBooking.user.address}</p>
                                                <p><strong>Giới tính:</strong> {selectedBooking.user.gender}</p>
                                            </div>
                                            {/* Cột phải: Thông tin Property */}
                                            <div className="col-md-6">
                                                <h6 className="text-muted mb-3">
                                                    <i className="bi bi-building me-2"></i>Thông tin Property
                                                </h6>
                                                <p><strong>Tên:</strong> {selectedBooking.property.name}</p>
                                                <p><strong>Địa chỉ:</strong> {selectedBooking.property.address}</p>
                                                <p><strong>Khách tối đa:</strong> {selectedBooking.property.maxGuests}</p>
                                                <p><strong>Số giường:</strong> {selectedBooking.property.numBeds}</p>
                                                <p><strong>Phòng ngủ:</strong> {selectedBooking.property.numBedrooms}</p>
                                                <p><strong>Phòng tắm:</strong> {selectedBooking.property.numBathrooms}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        {/* Hàng: Thời gian và Chi phí */}
                                        <div className="row">
                                            {/* Thời gian lưu trú */}
                                            <div className="col-md-6">
                                                <h6 className="text-muted mb-3">
                                                    <i className="bi bi-calendar-check me-2"></i>Thời gian lưu trú
                                                </h6>
                                                <p><strong>Nhận phòng:</strong> {formatDate(selectedBooking.checkin)}</p>
                                                <p><strong>Trả phòng:</strong> {formatDate(selectedBooking.checkout)}</p>
                                            </div>
                                            {/* Chi phí */}
                                            <div className="col-md-6">
                                                <h6 className="text-muted mb-3">
                                                    <i className="bi bi-cash me-2"></i>Chi phí
                                                </h6>
                                                <p><strong>Giá thuê:</strong> {formatCurrency(selectedBooking.price)}</p>
                                                <p><strong>Phí dọn vệ sinh:</strong> {formatCurrency(selectedBooking.cleaningFee)}</p>
                                                <p><strong>Phí dịch vụ:</strong> {formatCurrency(selectedBooking.serviceFee)}</p>
                                                <p><strong>Tổng cộng:</strong> {formatCurrency(selectedBooking.totalPrice)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default HostPropertyManagement;
