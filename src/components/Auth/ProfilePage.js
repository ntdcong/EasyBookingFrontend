import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Modal, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './ProfilePage.css';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [updatedProfile, setUpdatedProfile] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        address: '',
        gender: '',
        avatar: '',
        bio: '',
    });

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
                console.error('Error fetching profile:', error);
                toast.error('Failed to load profile');
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatarFile(file);
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            toast.error('Please login again');
            return;
        }

        try {
            const profileData = {
                ...updatedProfile,
                avatar: updatedProfile.avatar || "",
                bio: updatedProfile.bio || "",
                thumbnail: updatedProfile.thumbnail || "",
            };

            await axios.put('http://localhost:8080/api/v1/users/@me/profile', profileData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (avatarFile) {
                const formData = new FormData();
                formData.append('image', avatarFile);
                await axios.post('http://localhost:8080/api/v1/users/@me/avatar', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            toast.success('Profile updated successfully');
            setShowModal(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }
    };

    if (!profile) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // Format DD/MM/YYYY
    };

    return (
        <Container className="py-5">
            <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                    <Row>
                        <Col md={4} className="text-center">
                            <div className="avatar-container mb-4">
                                <Image
                                    src={profile.avatar || '/default-avatar.jpg'}
                                    alt="Profile"
                                    roundedCircle
                                    className="profile-avatar mb-3"
                                />
                                <div className="mt-3">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => document.getElementById('avatarInput').click()}
                                        className="btn-upload"
                                    >
                                        Change Photo
                                    </Button>
                                    <input
                                        id="avatarInput"
                                        type="file"
                                        hidden
                                        onChange={handleAvatarChange}
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                        </Col>

                        <Col md={8}>
                            <h2 className="mb-4">{profile.firstName} {profile.lastName}</h2>
                            <Row className="mb-4">
                                <Col sm={6}>
                                    <div className="info-item">
                                        <div className="text-muted small">Email</div>
                                        <div className="info-value">{profile.email}</div>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="info-item">
                                        <div className="text-muted small">Phone</div>
                                        <div className="info-value">{profile.phoneNumber}</div>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="info-item mt-3">
                                        <div className="text-muted small">Gender</div>
                                        <div className="info-value">{profile.gender}</div>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="info-item mt-3">
                                        <div className="text-muted small">Address</div>
                                        <div className="info-value">{profile.address}</div>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="info-item mt-3">
                                        <div className="text-muted small">Date of Birth</div>
                                        <div className="info-value">{formatDate(profile.dateOfBirth)}</div>
                                    </div>
                                </Col>
                            </Row>
                            <Button
                                variant="primary"
                                onClick={() => setShowModal(true)}
                                className="btn-edit"
                            >
                                Edit Profile
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={updatedProfile.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter first name"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={updatedProfile.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter last name"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={updatedProfile.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Enter phone number"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateOfBirth"
                                value={updatedProfile.dateOfBirth || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={updatedProfile.address || ''}
                                onChange={handleInputChange}
                                placeholder="Enter address"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                name="gender"
                                value={updatedProfile.gender}
                                onChange={handleInputChange}
                            >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProfilePage;