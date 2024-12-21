import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, isSameDay, eachDayOfInterval } from 'date-fns';

const BookingModal = ({ propertyId, price, onClose }) => {
    const [checkin, setCheckin] = useState(null);
    const [checkout, setCheckout] = useState(null);
    const [guests, setGuests] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const [existingBookings, setExistingBookings] = useState([]);  // Dòng thêm vào
    const { id } = useParams(); // Danh sách các booking đã có
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

        // Lấy danh sách booking của bất động sản
        axios
            .get(`http://localhost:8080/api/v1/bookings/property/${id}`)
            .then((response) => {
                setExistingBookings(response.data);
                const dates = getBookedDatesFromBookings(response.data);
                setBookedDates(dates);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách booking!', error);
                setError('Could not load booked dates');
            });

        // Thiết lập ngày nhận phòng là ngày mai
        const today = new Date();
        const tomorrow = addDays(today, 1);
        setCheckin(tomorrow);

        // Thiết lập ngày trả phòng là cuối tháng này
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Ngày cuối cùng của tháng
        setCheckout(lastDayOfMonth);
    }, [id]);

    // Helper function to get all booked dates from bookings
    const getBookedDatesFromBookings = (bookings) => {
        let dates = [];
        bookings.forEach(booking => {
            const start = new Date(booking.checkin);
            const end = new Date(booking.checkout);
            const daysInterval = eachDayOfInterval({ start, end });
            dates = [...dates, ...daysInterval];
        });
        return dates;
    };

    // Check if date is booked
    const isDateBooked = (date) => {
        return bookedDates.some(bookedDate => 
            isSameDay(new Date(bookedDate), date)
        );
    };

    // Check if the selected date range is available
    const isDateAvailable = (checkinDate, checkoutDate) => {
        return !bookedDates.some(bookedDate => {
            return (checkinDate <= bookedDate && bookedDate <= checkoutDate);
        });
    };

    // Custom date filtering
    const filterDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Disable past dates and booked dates
        return date >= today && !isDateBooked(date);
    };

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

        const userId = localStorage.getItem('userId') || '98142f0b-0c77-47de-a980-7b58f08abc80';

        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);

        if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
            setError('Ngày check-in hoặc check-out không hợp lệ.');
            setIsLoading(false);
            return;
        }

        // Kiểm tra tính khả dụng của ngày
        if (!isDateAvailable(checkinDate, checkoutDate)) {
            setError('Ngày này đã được đặt. Vui lòng chọn ngày khác.');
            setIsLoading(false);
            return;
        }

        const bookingData = {
            propertyId: propertyId,
            statusId: 'e9cde046-6793-41c8-afeb-55b782f21f3b',
            userId: userId,
            checkin: checkinDate.toISOString(),
            checkout: checkoutDate.toISOString(),
            price: calculateTotalPrice().subtotal,
            serviceFee: 50000,
            cleaningFee: 80000,
            totalPrice: calculateTotalPrice().total,
            discountId: null,
            cancellationPolicyId: '59d94465-3c29-486a-b445-bedc9f1be1cc'
        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/bookings', bookingData);
            alert('Đặt phòng thành công!');
            onClose();
        } catch (err) {
            const errorData = err.response?.data;

            if (errorData?.statusCode === 422 && errorData?.message === 'Property is not available for the selected dates') {
                setError('Ngày này đã được đặt. Vui lòng chọn ngày khác.');
            } else {
                setError('Đã có lỗi xảy ra khi đặt phòng. Vui lòng thử lại.');
            }

            console.error('Booking error:', errorData || err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const priceCalculation = calculateTotalPrice();

    if (!property) {
        return (
            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Xác nhận đặt phòng</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
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
<div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050 }}>
    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '550px', margin: '1.75rem auto' }}>
        <div className="modal-content" style={{ border: 'none', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div className="modal-header" style={{ padding: '24px', borderBottom: '1px solid #eee' }}>
                <h5 className="modal-title" style={{ fontSize: '22px', fontWeight: '600', color: '#222', margin: 0 }}>Xác nhận đặt phòng</h5>
                <button type="button" className="btn-close" onClick={onClose} style={{ background: 'none', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}></button>
            </div>
            <div className="modal-body" style={{ padding: '24px' }}>
                <form onSubmit={handleBooking}>
                    <div className="mb-3" style={{ marginBottom: '20px' }}>
                        <label className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#222', marginBottom: '8px' }}>Ngày nhận phòng</label>
                        <DatePicker
                            selected={checkin}
                            onChange={date => setCheckin(date)}
                            minDate={new Date()}
                            filterDate={filterDate}
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                            style={{ width: '100%', padding: '12px', border: '1px solid #dadada', borderRadius: '8px', fontSize: '15px' }}
                        />
                    </div>
                    <div className="mb-3" style={{ marginBottom: '20px' }}>
                        <label className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#222', marginBottom: '8px' }}>Ngày trả phòng</label>
                        <DatePicker
                            selected={checkout}
                            onChange={date => setCheckout(date)}
                            minDate={checkin ? addDays(checkin, 1) : new Date()}
                            filterDate={filterDate}
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                            style={{ width: '100%', padding: '12px', border: '1px solid #dadada', borderRadius: '8px', fontSize: '15px' }}
                        />
                    </div>
                    <div className="mb-3" style={{ marginBottom: '20px' }}>
                        <label className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#222', marginBottom: '8px' }}>Số lượng khách</label>
                        <select
                            className="form-select"
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            required
                            style={{ width: '100%', padding: '12px', border: '1px solid #dadada', borderRadius: '8px', fontSize: '15px' }}
                        >
                            {[...Array(property.maxGuests)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1} khách</option>
                            ))}
                        </select>
                    </div>

                    <div className="border-top pt-3 mb-3" style={{ borderTop: '1px solid #eee', paddingTop: '16px', marginBottom: '20px' }}>
                        <div className="d-flex justify-content-between mb-2" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#666', fontSize: '15px' }}>
                            <span>Giá thuê ({checkin && checkout ? `${Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24))} đêm` : ''})</span>
                            <span>{priceCalculation.subtotal.toLocaleString()} VND</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#666', fontSize: '15px' }}>
                            <span>Phí dọn dẹp</span>
                            <span>{priceCalculation.cleaningFee.toLocaleString()} VND</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#666', fontSize: '15px' }}>
                            <span>Phí dịch vụ</span>
                            <span>{priceCalculation.serviceFee.toLocaleString()} VND</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold border-top pt-2" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '16px', fontWeight: '600', fontSize: '17px' }}>
                            <span>Tổng cộng</span>
                            <span>{priceCalculation.total.toLocaleString()} VND</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center" style={{ display: 'flex', justifyContent: 'center' }}>
                        <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ width: '100%', padding: '14px 24px', border: 'none', borderRadius: '8px', background: 'linear-gradient(to right, #E61E4D, #E31C5F)', color: 'white', fontWeight: '500', fontSize: '16px', cursor: 'pointer' }}>
                            {isLoading ? 'Đang xử lý...' : 'Đặt phòng'}
                        </button>
                    </div>
                    {error && <div className="text-danger mt-3" style={{ marginTop: '16px', padding: '12px', backgroundColor: '#fff8f8', border: '1px solid #fee2e2', borderRadius: '8px', color: '#dc3545', fontSize: '14px' }}>{error}</div>}
                </form>
            </div>
        </div>
    </div>
</div>

    );
};

export default BookingModal;
