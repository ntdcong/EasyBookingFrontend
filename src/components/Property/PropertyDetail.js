import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal } from 'bootstrap';

const PropertyDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/v1/properties/${id}`)
            .then((response) => {
                setProperty(response.data.data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy thông tin chi tiết bất động sản!', error);
            });
    }, [id]);

    const openPhotoModal = () => {
        setIsPhotoModalOpen(true);
    };

    const closePhotoModal = () => {
        setIsPhotoModalOpen(false);
    };

    const handleImageChange = (index) => {
        setActiveImage(index);
    };
    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    if (!property) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
            </div>
        );
    }

    const images = property.images && property.images.length > 0 
        ? property.images 
        : Array(5).fill({ url: "https://via.placeholder.com/400x300" });
    
    // Limit to 5 images
    const displayImages = images.slice(0, 5);

    return (
        <div className="container-fluid px-4 py-3" style={{ maxWidth: '1160px' }}>
            {/* Header */}
            <h1 className="h3 mb-3">{property.name}</h1>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                    <span className="d-flex align-items-center">
                        <i className="bi bi-star-fill text-dark me-1"></i>
                        <strong>4.95</strong>
                    </span>
                    <span>·</span>
                    <span className="text-decoration-underline">{property.reviews} đánh giá</span>
                    <span>·</span>
                    <span className="text-decoration-underline">{property.address}</span>
                </div>
                <div className="d-flex gap-3">
                    <button className="btn btn-link text-dark text-decoration-none">
                        <i className="bi bi-share me-2"></i>
                        Chia sẻ
                    </button>
                    <button
                        className="btn btn-link text-dark text-decoration-none"
                        onClick={handleLike}
                    >
                        <i className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'} me-2`}></i>
                        Lưu
                    </button>
                </div>
            </div>

            {/* Image Gallery */}
            {/* Image Gallery */}
            <div className="property-image-gallery position-relative mb-4" style={{ height: '500px' }}>
                    {/* Main Large Image */}
                    <div className="position-absolute top-0 start-0 w-50 h-100 pe-2 pb-2">
                        <img 
                            src={displayImages[0].url || "https://via.placeholder.com/800x600"} 
                            alt="Main property image" 
                            className="w-100 h-100 object-fit-cover rounded-3" 
                            onError={(e) => e.target.src = "https://via.placeholder.com/800x600"}
                        />
                    </div>

                    {/* Small Images Grid */}
                    <div className="position-absolute top-0 end-0 w-50 h-100 ps-2">
                        <div className="row g-2 h-100">
                            {displayImages.slice(1).map((image, index) => (
                                <div className="col-6" key={index}>
                                    <img 
                                        src={image.url || "https://via.placeholder.com/400x300"} 
                                        alt={`Property view ${index + 2}`} 
                                        className={`w-100 h-100 object-fit-cover rounded-3`}
                                        onError={(e) => e.target.src = "https://via.placeholder.com/400x300"}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* View Photos Button */}
                    <button 
                        className="btn btn-outline-light border position-absolute bottom-0 end-0 m-3"
                        style={{ zIndex: 10 }}
                        onClick={openPhotoModal}
                    >
                        <i className="bi bi-images me-2"></i>
                        Xem tất cả ảnh
                    </button>
                </div>

                {/* Photo Modal */}
                {isPhotoModalOpen && (
                <div 
                    className="modal show d-block" 
                    tabIndex="-1" 
                    style={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        position: 'fixed', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        zIndex: 1050 
                    }}
                >
                    <div className="modal-dialog modal-fullscreen">
                        <div className="modal-content bg-transparent">
                            <div className="modal-header border-0">
                                <button 
                                    type="button" 
                                    className="btn-close btn-close-white" 
                                    onClick={closePhotoModal}
                                ></button>
                            </div>
                            <div className="modal-body d-flex justify-content-center align-items-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 text-center mb-4">
                                            <img 
                                                src={images[activeImage].url || "https://via.placeholder.com/1200x800"} 
                                                alt={`Property image ${activeImage + 1}`}
                                                className="img-fluid max-vh-75"
                                                style={{ maxHeight: '70vh' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        {images.map((image, index) => (
                                            <div 
                                                key={index} 
                                                className="col-2 mb-3"
                                                onClick={() => handleImageChange(index)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img 
                                                    src={image.url || "https://via.placeholder.com/200x200"} 
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className={`img-thumbnail ${index === activeImage ? 'border-primary' : ''}`}
                                                    style={{ 
                                                        height: '100px', 
                                                        width: '100%', 
                                                        objectFit: 'cover' 
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row gx-5">
                {/* Main Content */}
                <div className="col-12 col-lg-8">
                    <div className="d-flex justify-content-between align-items-start pb-4 mb-4 border-bottom">
                        <div>
                            <h2 className="h4 mb-3">Toàn bộ căn hộ. Chủ nhà Peter</h2>
                            <div className="d-flex gap-2 text-secondary">
                                <span>{property.maxGuests} khách</span>
                                <span>·</span>
                                <span>{property.numBedrooms} phòng ngủ</span>
                                <span>·</span>
                                <span>{property.numBeds} giường</span>
                                <span>·</span>
                                <span>{property.numBathrooms} phòng tắm</span>
                            </div>
                        </div>
                        <img
                            src={property.hostImage || "https://via.placeholder.com/56x56?text=Host"}
                            className="rounded-circle"
                            alt="Host"
                            width="56"
                            height="56"
                            onError={(e) => (e.target.src = "https://via.placeholder.com/56x56?text=No+Host")}
                        />
                    </div>

                    {/* Features */}
                    <div className="mb-4 pb-4 border-bottom">
                        {[
                            {
                                icon: 'trophy',
                                title: 'Peter là Chủ nhà siêu cấp',
                                desc: 'Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao.'
                            },
                            {
                                icon: 'geo-alt',
                                title: 'Địa điểm tuyệt vời',
                                desc: '90% khách gần đây đã xếp hạng 5 sao cho vị trí này.'
                            },
                            {
                                icon: 'key',
                                title: 'Tự nhận phòng',
                                desc: 'Tự nhận phòng bằng hộp khóa an toàn.'
                            }
                        ].map((feature, index) => (
                            <div key={index} className="d-flex gap-3 mb-3">
                                <i className={`bi bi-${feature.icon} fs-4`}></i>
                                <div>
                                    <div className="fw-bold">{feature.title}</div>
                                    <div className="text-secondary">{feature.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="mb-4 pb-4 border-bottom">
                        <p>{property.description || 'Thông tin mô tả về căn hộ sẽ được hiển thị ở đây...'}</p>
                    </div>

                    {/* Amenities */}
                    <div className="mb-4 pb-4 border-bottom">
                        <h2 className="h4 mb-4">Tiện nghi</h2>
                        <div className="row g-4">
                            {[
                                { icon: 'wifi', name: 'Wifi' },
                                { icon: 'snow', name: 'Điều hòa' },
                                { icon: 'tv', name: 'TV' },
                                { icon: 'water', name: 'Hồ bơi' },
                                { icon: 'p-square', name: 'Bãi đỗ xe' },
                                { icon: 'fire', name: 'Bếp' }
                            ].map((amenity, index) => (
                                <div key={index} className="col-6">
                                    <div className="d-flex align-items-center gap-3">
                                        <i className={`bi bi-${amenity.icon} fs-4`}></i>
                                        <span>{amenity.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Booking Card */}
                <div className="col-12 col-lg-4">
                    <div className="card shadow-sm sticky-top" style={{ top: '24px' }}>
                        <div className="card-body">
                            <div className="d-flex align-items-end mb-3">
                                <h3 className="h4 mb-0">
                                    <span className="fw-bold">{property.price?.toLocaleString()} VND</span>
                                    <small className="text-secondary"> /đêm</small>
                                </h3>
                            </div>

                            <div className="border rounded-3 mb-3">
                                <div className="row g-0">
                                    <div className="col-6 p-2 border-end border-bottom">
                                        <small className="d-block fw-bold">NHẬN PHÒNG</small>
                                        <input type="date" className="border-0 p-0 w-100" />
                                    </div>
                                    <div className="col-6 p-2 border-bottom">
                                        <small className="d-block fw-bold">TRẢ PHÒNG</small>
                                        <input type="date" className="border-0 p-0 w-100" />
                                    </div>
                                    <div className="col-12 p-2">
                                        <small className="d-block fw-bold">KHÁCH</small>
                                        <select className="border-0 p-0 w-100">
                                            {[...Array(property.maxGuests)].map((_, i) => (
                                                <option key={i + 1}>{i + 1} khách</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-danger w-100 mb-3">
                                Đặt phòng
                            </button>

                            <p className="text-center mb-0 text-secondary small">
                                Bạn vẫn chưa bị trừ tiền
                            </p>

                            <hr />

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-decoration-underline">
                                    {property.price?.toLocaleString()} VND x 5 đêm:
                                </span>
                                <span>{(property.price * 5)?.toLocaleString()} VND</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-decoration-underline">Phí dọn dẹp:</span>
                                <span>80,000 VND</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-decoration-underline">Phí dịch vụ EasyBooing:</span>
                                <span>50,000 VND</span>
                            </div>

                            <div className="d-flex justify-content-between pt-3 border-top fw-bold">
                                <span>Tổng trước thuế</span>
                                <span>{(property.price * 5 + 130000)?.toLocaleString()} VND</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;