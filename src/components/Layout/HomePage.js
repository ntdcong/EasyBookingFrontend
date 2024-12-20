import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PropertySlide from '../Property/PropertySlide';
import CategoryFilter from './CategoryFilter';

const HomePage = () => {
    const [properties] = useState([
        {
            id: 1,
            name: 'Căn hộ cao cấp tại trung tâm',
            address: 'Quận 1, Hồ Chí Minh',
            image: 'https://via.placeholder.com/400x300?text=Apartment+1',
            price: 1200000,
            rating: 4.8,
            type: 'Toàn bộ căn hộ',
            hostName: 'Minh',
            amenities: ['Wifi', 'Bếp', 'Máy giặt', 'Điều hòa']
        },
        {
            id: 2,
            name: 'Biệt thự view biển',
            address: 'Vũng Tàu',
            image: 'https://via.placeholder.com/400x300?text=Beach+Villa',
            price: 2500000,
            rating: 4.9,
            type: 'Biệt thự',
            hostName: 'Linh',
            amenities: ['Hồ bơi', 'View biển', 'Chỗ đỗ xe', 'Sân vườn']
        },
        {
            id: 3,
            name: 'Nhà gỗ sinh thái',
            address: 'Đà Lạt',
            image: 'https://via.placeholder.com/400x300?text=Eco+Wooden+House',
            price: 800000,
            rating: 4.7,
            type: 'Nhà gỗ',
            hostName: 'Hương',
            amenities: ['View núi', 'Sân vườn', 'BBQ', 'Yên tĩnh']
        }
    ]);

    const featuredDestinations = [
        { name: 'Hà Nội', image: 'https://via.placeholder.com/300x200?text=Hanoi' },
        { name: 'Hồ Chí Minh', image: 'https://via.placeholder.com/300x200?text=HCM' },
        { name: 'Đà Nẵng', image: 'https://via.placeholder.com/300x200?text=Danang' },
        { name: 'Nha Trang', image: 'https://via.placeholder.com/300x200?text=NhaTrang' }
    ];

    const experiences = [
        { title: 'Trải nghiệm trực tuyến', description: 'Hoạt động độc đáo do người dẫn đầu thế giới kết nối trực tiếp', icon: 'laptop' },
        { title: 'Chỗ ở độc đáo', description: 'Không gian riêng biệt, từ lâu đài đến container', icon: 'house-heart' },
        { title: 'Khách sạn & Resort', description: 'Những địa điểm sang trọng để nghỉ dưỡng', icon: 'building' }
    ];

    const videoRef = React.useRef(null);

    const handleVideoClick = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if (videoRef.current.mozRequestFullScreen) { // Firefox
                videoRef.current.mozRequestFullScreen();
            } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
                videoRef.current.webkitRequestFullscreen();
            } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
                videoRef.current.msRequestFullscreen();
            }
        }
    };


    return (
        <div className="container-fluid px-0">

            {/* Video Intro */}
            <div className="position-relative overflow-hidden" style={{ height: '95vh', maxHeight: '900px' }}>
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        objectFit: 'cover',
                        zIndex: -1,
                        filter: 'brightness(0.6)',
                    }}
                >
                    <source src="/background.mp4" type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ video.
                </video>
                

                <div className="container h-100" style={{ cursor: 'pointer' }} onClick={handleVideoClick}>
                    <div className="row h-100 align-items-center justify-content-center">
                        <div className="col-12 text-center">
                        <h1
                                className="display-3 fw-bold mb-4"
                                style={{
                                    letterSpacing: '2px',
                                    fontFamily: '"Montserrat", sans-serif',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    fontSize: '8rem',
                                    color: 'transparent', // Làm chữ trong suốt
                                    WebkitTextStroke: '2px white', // Tạo viền trắng xung quanh chữ
                                    WebkitBackgroundClip: 'text', // Giúp hiển thị nền xuyên qua chữ
                                    backgroundClip: 'text',
                                }}
                            >
                                EASY<span style={{ color: '#FF385C', WebkitTextStroke: 'none' }}>BOOKING</span>
                            </h1>

                            <p
                                className="lead text-white mb-5"
                                style={{
                                    fontWeight: 300,
                                    letterSpacing: '1px',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                                }}
                            >
                                Trải nghiệm kỳ nghỉ hoàn hảo, dễ dàng và tiện lợi
                            </p>
                            <button
                                className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-lg"
                                style={{
                                    fontWeight: 600,
                                    letterSpacing: '1px'
                                }}
                            >
                                Khám Phá Ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <CategoryFilter/>                        

            <PropertySlide/>

            {/* Property Type Filters */}
            <div className="container px-4 py-5">
                <div className="row mb-5">
                    <div className="col-12">
                        <h2 className="h4 mb-4">Tìm kiếm theo loại chỗ ở</h2>
                        <div className="d-flex justify-content-between overflow-auto">
                            {[
                                { icon: 'house', label: 'Toàn bộ nhà' },
                                { icon: 'building', label: 'Chung cư' },
                                { icon: 'tree', label: 'Nhà ngoại ô' },
                                { icon: 'sunset', label: 'View biển' },
                                { icon: 'moon-stars', label: 'Nhà gỗ' },
                                { icon: 'tropical-storm', label: 'Nhà ven sông' }
                            ].map((type, index) => (
                                <div
                                    key={index}
                                    className="d-flex flex-column align-items-center mx-2 text-center"
                                    style={{ cursor: 'pointer', minWidth: '100px' }}
                                >
                                    <div className="rounded-circle bg-light p-3 mb-2">
                                        <i className={`bi bi-${type.icon} fs-3`}></i>
                                    </div>
                                    <small>{type.label}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Rest of the sections (Featured Destinations, Experiences, Properties, CTA) remain the same */}
                {/* Featured Destinations */}
                <div className="row mb-5">
                    <div className="col-12">
                        <h2 className="h4 mb-4">Điểm đến nổi bật</h2>
                        <div className="row g-4">
                            {featuredDestinations.map((dest, index) => (
                                <div key={index} className="col-6 col-md-3">
                                    <div className="card border-0 overflow-hidden">
                                        <img
                                            src={dest.image}
                                            className="card-img-top"
                                            alt={dest.name}
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                        <div className="card-img-overlay d-flex align-items-end p-0">
                                            <h5 className="card-title w-100 text-white text-center py-2"
                                                style={{ background: 'rgba(0,0,0,0.5)' }}>
                                                {dest.name}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Experiences */}
                <div className="row mb-5">
                    <div className="col-12">
                        <h2 className="h4 mb-4">Trải nghiệm mới</h2>
                        <div className="row g-4">
                            {experiences.map((exp, index) => (
                                <div key={index} className="col-md-4">
                                    <div className="card h-100 border-0 shadow-sm">
                                        <div className="card-body text-center">
                                            <div className="rounded-circle bg-light p-3 mb-3 d-inline-block">
                                                <i className={`bi bi-${exp.icon} fs-2 text-primary`}></i>
                                            </div>
                                            <h5 className="card-title">{exp.title}</h5>
                                            <p className="card-text text-muted">{exp.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Properties Grid */}
                <div className="row mb-5">
                    <div className="col-12">
                        <h2 className="h4 mb-4">Chỗ ở gần bạn</h2>
                        <div className="row g-4">
                            {properties.map((property) => (
                                <div key={property.id} className="col-md-4">
                                    <div className="card border-0 shadow-sm">
                                        <div className="position-relative">
                                            <img
                                                src={property.image}
                                                className="card-img-top"
                                                alt={property.name}
                                                style={{ height: '250px', objectFit: 'cover' }}
                                            />
                                            <div className="position-absolute top-0 end-0 p-2">
                                                <button className="btn btn-sm btn-light rounded-circle">
                                                    <i className="bi bi-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div>
                                                    <h5 className="card-title mb-1">{property.name}</h5>
                                                    <small className="text-muted">{property.type} · Chủ nhà {property.hostName}</small>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-star-fill text-warning me-1"></i>
                                                    <span>{property.rating}</span>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <strong>{property.price.toLocaleString()} VND</strong>
                                                    <small className="text-muted"> /đêm</small>
                                                </div>
                                                <div className="text-end">
                                                    <button className="btn btn-sm btn-outline-primary">Xem chi tiết</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="card bg-primary text-white text-center p-5">
                            <h2 className="mb-4">Trở thành chủ nhà trên Airbnb</h2>
                            <p className="mb-4">Kiếm thu nhập thêm và khai thác tiềm năng của không gian của bạn</p>
                            <button className="btn btn-light btn-lg mx-auto" style={{ maxWidth: '300px' }}>
                                Tìm hiểu thêm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;