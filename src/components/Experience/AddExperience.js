import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const AddExperience = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    maxGuests: 1,
    price: '',
    startTime: new Date(),
    endTime: new Date(),
    wardId: '',
  });

  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch wards data from API
    const fetchWards = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/wards');
        setWards(response.data);
      } catch (error) {
        toast.error('Không thể tải danh sách phường/xã');
      }
    };
    fetchWards();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const hostId = localStorage.getItem('userId');
      if (!hostId) {
        toast.error('Vui lòng đăng nhập để thực hiện chức năng này');
        return;
      }

      const formattedData = {
        ...formData,
        hostId,
        price: parseFloat(formData.price),
        maxGuests: parseInt(formData.maxGuests, 10),
        startTime: formData.startTime.toISOString(),
        endTime: formData.endTime.toISOString(),
      };

      await axios.post('http://localhost:8080/api/v1/experiences', formattedData);
      toast.success('Thêm trải nghiệm thành công!');
      // Reset form
      setFormData({
        name: '',
        description: '',
        address: '',
        maxGuests: 1,
        price: '',
        startTime: new Date(),
        endTime: new Date(),
        wardId: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi thêm trải nghiệm');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Thêm Trải Nghiệm Mới</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên trải nghiệm</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập tên trải nghiệm"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Mô tả chi tiết về trải nghiệm"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phường/Xã</Form.Label>
                  <Form.Select
                    name="wardId"
                    value={formData.wardId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn phường/xã</option>
                    {wards.map(ward => (
                      <option key={ward.id} value={ward.id}>
                        {ward.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Số khách tối đa</Form.Label>
                      <Form.Control
                        type="number"
                        name="maxGuests"
                        value={formData.maxGuests}
                        onChange={handleChange}
                        min="1"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Giá (VNĐ)</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Nhập giá"
                        min="0"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian bắt đầu</Form.Label>
                      <DatePicker
                        selected={formData.startTime}
                        onChange={date => setFormData(prev => ({ ...prev, startTime: date }))}
                        showTimeSelect
                        dateFormat="Pp"
                        className="form-control"
                        minDate={new Date()}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian kết thúc</Form.Label>
                      <DatePicker
                        selected={formData.endTime}
                        onChange={date => setFormData(prev => ({ ...prev, endTime: date }))}
                        showTimeSelect
                        dateFormat="Pp"
                        className="form-control"
                        minDate={formData.startTime}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="px-5"
                  >
                    {loading ? 'Đang xử lý...' : 'Thêm Trải Nghiệm'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddExperience;