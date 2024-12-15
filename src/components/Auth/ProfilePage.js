import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './ProfilePage.css';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get('http://localhost:8080/api/v1/users/@me/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data.data);
                setUpdatedProfile(response.data.data);
            } catch (error) {
                console.error('Lỗi khi tải thông tin hồ sơ:', error);
                toast.error('Không thể tải thông tin hồ sơ');
            }
        };

        fetchProfile();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN'); // Định dạng ngày theo Tiếng Việt
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.put('http://localhost:8080/api/v1/users/@me/profile', updatedProfile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            setProfile(response.data.data);
            setShowEditModal(false);
            toast.success('Cập nhật hồ sơ thành công');
        } catch (error) {
            console.error('Lỗi khi cập nhật hồ sơ:', error);
            toast.error('Không thể cập nhật hồ sơ');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!profile) {
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <div className="profile-page bg-light py-5">
            <Container>
                <Card className="profile-card shadow-lg border-0 rounded-4 overflow-hidden">
                    {/* Tiêu đề Hồ Sơ */}
                    <div
                        className="profile-header position-relative text-white p-6"
                        style={{
                            backgroundImage: `url(${profile.thumbnail || '/default-thumbnail.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <Row className="align-items-center">
                            <Col md={3} className="text-center mb-3 mb-md-0">
                                <div className="profile-avatar-container position-relative d-inline-block">
                                    <img
                                        src={profile.avatar || '/default-avatar.jpg'}
                                        alt="Ảnh đại diện"
                                        className="profile-avatar rounded-circle shadow-sm"
                                    />
                                    <span className="avatar-status position-absolute bottom-0 end-0 bg-success rounded-circle"></span>
                                </div>
                            </Col>
                            <Col md={9}>
                                <h1 className="profile-name display-6 mb-2 fw-bold">
                                    {profile.firstName} {profile.lastName}
                                </h1>
                                <p className="profile-email lead mb-0 text-white-75">{profile.email}</p>
                                {profile.bio && (
                                    <p className="profile-bio mt-2 text-white-50 fst-italic">
                                        "{profile.bio}"
                                    </p>
                                )}
                            </Col>
                        </Row>
                    </div>

                    {/* Nội dung Hồ Sơ */}
                    <Card.Body className="p-4">
                        <Row>
                            <Col md={6}>
                                <h5 className="section-title mb-4 text-primary">Thông Tin Cá Nhân</h5>
                                <div className="profile-detail-row mb-3 d-flex justify-content-between">
                                    <span className="text-muted">Họ Tên</span>
                                    <span className="fw-semibold">{profile.firstName} {profile.lastName}</span>
                                </div>
                                <div className="profile-detail-row mb-3 d-flex justify-content-between">
                                    <span className="text-muted">Email</span>
                                    <span className="fw-semibold">{profile.email}</span>
                                </div>
                                <div className="profile-detail-row mb-3 d-flex justify-content-between">
                                    <span className="text-muted">Số Điện Thoại</span>
                                    <span className="fw-semibold">{profile.phoneNumber || 'Chưa cung cấp'}</span>
                                </div>
                            </Col>
                            <Col md={6}>
                                <h5 className="section-title mb-4 text-primary">Thông Tin Thêm</h5>
                                <div className="profile-detail-row mb-3 d-flex justify-content-between">
                                    <span className="text-muted">Giới Tính</span>
                                    <span className="fw-semibold">{profile.gender === 'MALE' ? 'Nam' : 'Nữ'}</span>
                                </div>
                                <div className="profile-detail-row mb-3 d-flex justify-content-between">
                                    <span className="text-muted">Ngày Sinh</span>
                                    <span className="fw-semibold">{formatDate(profile.dateOfBirth)}</span>
                                </div>
                                <div className="profile-detail-row mb-3 d-flex justify-content-between">
                                    <span className="text-muted">Địa Chỉ</span>
                                    <span className="fw-semibold">{profile.address || 'Chưa cung cấp'}</span>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>

                    {/* Nút hành động */}
                    <Card.Footer className="bg-light p-4 d-flex justify-content-end">
                        <Button
                            variant="outline-primary"
                            className="px-4 rounded-pill"
                            onClick={() => setShowEditModal(true)}
                        >
                            Chỉnh Sửa Hồ Sơ
                        </Button>
                    </Card.Footer>

                    {/* Modal Chỉnh Sửa Hồ Sơ */}
                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg" centered>
                        <Modal.Header closeButton className="border-bottom-0 pb-0">
                            <Modal.Title className="w-100 text-center">Chỉnh Sửa Hồ Sơ</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={handleProfileUpdate}>
                            <Modal.Body className="p-4">
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Họ</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                value={updatedProfile.firstName || ''}
                                                onChange={handleInputChange}
                                                className="rounded-pill"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tên</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={updatedProfile.lastName || ''}
                                                onChange={handleInputChange}
                                                className="rounded-pill"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={updatedProfile.email || ''}
                                                onChange={handleInputChange}
                                                className="rounded-pill"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Số Điện Thoại</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phoneNumber"
                                                value={updatedProfile.phoneNumber || ''}
                                                onChange={handleInputChange}
                                                className="rounded-pill"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tiểu Sử</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="bio"
                                        value={updatedProfile.bio || ''}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="rounded-3"
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer className="border-top-0 pt-0 justify-content-center">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 rounded-pill me-2"
                                >
                                    Hủy
                                </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="px-4 rounded-pill"
                                >
                                    Lưu Thay Đổi
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </Card>
            </Container>
        </div>
    );
};

export default ProfilePage;
