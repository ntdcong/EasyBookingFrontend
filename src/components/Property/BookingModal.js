import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookingModal = ({ propertyId, price, onClose }) => {
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [guests, setGuests] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        // Lấy thông tin bất động sản
        axios
            .get(`http://localhost:8080/api/v1/properties/${id}`)
            .then((response) => {
                setProperty(response.data.data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy thông tin chi tiết bất động sản!', error);
            });

        // Thiết lập ngày nhận phòng là ngày mai
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Ngày mai
        setCheckin(tomorrow.toISOString().split('T')[0]);

        // Thiết lập ngày trả phòng là cuối tháng này
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Ngày cuối cùng của tháng
        setCheckout(lastDayOfMonth.toISOString().split('T')[0]);
    }, [id]);

    // Tính toán các khoản phí
    const calculateTotalPrice = () => {
        const nights = checkin && checkout
            ? Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24))
            : 0;
        const subtotal = price * nights;
        const cleaningFee = 80000; // Phí dọn dẹp cố định
        const serviceFee = 50000; // Phí dịch vụ cố định
        return {
            subtotal,
            cleaningFee,
            serviceFee,
            total: subtotal + cleaningFee + serviceFee
        };
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
    
        // Lấy thông tin người dùng từ localStorage (giả sử đã đăng nhập)
        const userId = localStorage.getItem('userId') || '98142f0b-0c77-47de-a980-7b58f08abc80';
    
        // Kiểm tra các giá trị ngày tháng
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
    
        if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
            setError('Ngày check-in hoặc check-out không hợp lệ.');
            setIsLoading(false);
            return;
        }
    
        // Tạo dữ liệu đặt phòng
        const bookingData = {
            propertyId: propertyId,
            statusId: '355568ac-0ebb-4341-be01-b340fe9f3eb8', // Trạng thái đặt phòng mặc định
            userId: userId,
            checkin: checkinDate.toISOString(),
            checkout: checkoutDate.toISOString(),
            price: calculateTotalPrice().subtotal,
            serviceFee: 50000,
            cleaningFee: 80000,
            totalPrice: calculateTotalPrice().total,
            discountId: null, // Nếu không có discount, có thể bỏ field này
            cancellationPolicyId: '3d2a140a-a2c5-4bfe-b6b3-96abfefb5b70'
        };
    
        // Log dữ liệu đặt phòng để kiểm tra
        console.log('Booking data:', bookingData);
    
        try {
            const response = await axios.post('http://localhost:8080/api/v1/bookings', bookingData);
            alert('Đặt phòng thành công!');
            onClose();
        } catch (err) {
            // Hiển thị thông báo lỗi và log chi tiết lỗi
            setError('Đã có lỗi xảy ra khi đặt phòng. Vui lòng thử lại.');
            console.error('Booking error:', err.response?.data || err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const priceCalculation = calculateTotalPrice();

    // Handle the case where the property is still loading
    if (!property) {
        return (
            <div
                className="modal show d-block"
                tabIndex="-1"
                style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1050
                }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Xác nhận đặt phòng</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>Đang tải thông tin bất động sản...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1050
            }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Xác nhận đặt phòng</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleBooking}>
                            <div className="mb-3">
                                <label className="form-label">Ngày nhận phòng</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={checkin}
                                    onChange={(e) => setCheckin(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ngày trả phòng</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={checkout}
                                    onChange={(e) => setCheckout(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Số lượng khách</label>
                                <select
                                    className="form-select"
                                    value={guests}
                                    onChange={(e) => setGuests(Number(e.target.value))}
                                    required
                                >
                                    {[...Array(property.maxGuests)].map((_, i) => (
                                        <option key={i + 1}>{i + 1} khách</option>
                                    ))}
                                </select>
                            </div>

                            <div className="border-top pt-3 mb-3">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Giá thuê ({checkin && checkout ? `${Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24))} đêm` : ''})</span>
                                    <span>{priceCalculation.subtotal.toLocaleString()} VND</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Phí dọn dẹp</span>
                                    <span>{priceCalculation.cleaningFee.toLocaleString()} VND</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Phí dịch vụ</span>
                                    <span>{priceCalculation.serviceFee.toLocaleString()} VND</span>
                                </div>
                                <div className="d-flex justify-content-between fw-bold border-top pt-2">
                                    <span>Tổng cộng</span>
                                    <span>{priceCalculation.total.toLocaleString()} VND</span>
                                </div>
                            </div>

                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}
                            <div className="d-flex justify-content-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Đang đặt phòng...' : 'Đặt phòng'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
