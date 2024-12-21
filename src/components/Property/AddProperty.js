import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    wardId: '',
    placeTypeId: '',
    propertyTypeId: '',
    maxGuests: 1,
    numBeds: 1,
    numBedrooms: 1,
    numBathrooms: 1,
    price: 0
  });

  const [placeTypes, setPlaceTypes] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch và xử lý riêng từng API để xử lý lỗi tốt hơn
        try {
          const placeTypesRes = await axios.get('http://localhost:8080/api/v1/place-type');
          // Dữ liệu trả về có dạng object với key 'placeTypes'
          setPlaceTypes(placeTypesRes.data.placeTypes || []);
        } catch (error) {
          console.error('Error fetching place types:', error.response?.data || error.message);
          setPlaceTypes([]);
        }
  
        try {
          const propertyTypesRes = await axios.get('http://localhost:8080/api/v1/property-types');
          setPropertyTypes(Array.isArray(propertyTypesRes.data) ? propertyTypesRes.data : []);
        } catch (error) {
          console.error('Error fetching property types:', error.response?.data || error.message);
          setPropertyTypes([]);
        }
  
        try {
          const wardsRes = await axios.get('http://localhost:8080/api/v1/wards');
          setWards(Array.isArray(wardsRes.data) ? wardsRes.data : []);
        } catch (error) {
          console.error('Error fetching wards:', error.response?.data || error.message);
          setWards([]);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
        toast.error('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau!');
      }
    };
  
    fetchData();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const hostId = localStorage.getItem('userId');
      const payload = {
        ...formData,
        hostId,
        maxGuests: parseInt(formData.maxGuests),
        numBeds: parseInt(formData.numBeds),
        numBedrooms: parseInt(formData.numBedrooms),
        numBathrooms: parseInt(formData.numBathrooms),
        price: parseInt(formData.price)
      };

      await axios.post('http://localhost:8080/api/v1/properties', payload);
      toast.success('Thêm địa điểm thành công!');
      // Reset form
      setFormData({
        name: '',
        address: '',
        wardId: '',
        placeTypeId: '',
        propertyTypeId: '',
        maxGuests: 1,
        numBeds: 1,
        numBedrooms: 1,
        numBathrooms: 1,
        price: 0
      });
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-4">Thêm Địa Điểm Mới</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên địa điểm</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Nhập tên địa điểm"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="Nhập địa chỉ"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phường/Xã</Form.Label>
              <Form.Select
                name="wardId"
                value={formData.wardId}
                onChange={handleInputChange}
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

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Loại địa điểm</Form.Label>
                  <Form.Select
                    name="placeTypeId"
                    value={formData.placeTypeId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn loại địa điểm</option>
                    {placeTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Loại bất động sản</Form.Label>
                  <Form.Select
                    name="propertyTypeId"
                    value={formData.propertyTypeId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn loại bất động sản</option>
                    {propertyTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Số khách tối đa</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxGuests"
                    value={formData.maxGuests}
                    onChange={handleInputChange}
                    required
                    min="1"
                  />
                </Form.Group>
              </div>
              
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Số giường</Form.Label>
                  <Form.Control
                    type="number"
                    name="numBeds"
                    value={formData.numBeds}
                    onChange={handleInputChange}
                    required
                    min="1"
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Số phòng ngủ</Form.Label>
                  <Form.Control
                    type="number"
                    name="numBedrooms"
                    value={formData.numBedrooms}
                    onChange={handleInputChange}
                    required
                    min="1"
                  />
                </Form.Group>
              </div>
              
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Số phòng tắm</Form.Label>
                  <Form.Control
                    type="number"
                    name="numBathrooms"
                    value={formData.numBathrooms}
                    onChange={handleInputChange}
                    required
                    min="1"
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label>Giá/đêm (VNĐ)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="1000"
              />
            </Form.Group>

            <div className="text-center">
              <Button 
                variant="primary" 
                type="submit" 
                size="lg"
                disabled={loading}
                className="px-5"
              >
                {loading ? 'Đang xử lý...' : 'Thêm địa điểm'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProperty;