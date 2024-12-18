import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Table, 
  Spinner, 
  Modal, 
  Alert 
} from 'react-bootstrap';

const PropertyManagement = () => {
  // State quản lý dữ liệu
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Trạng thái bộ lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priceRangeFilter, setPriceRangeFilter] = useState({ min: '', max: '' });

  // Trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 10;

  // Trạng thái Modal
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Trạng thái xác nhận xoá

  // Hàm lấy giá trị của địa điểm
  const getPropertyValue = (property, key, defaultValue = 'N/A') => {
    return property && property[key] !== undefined ? property[key] : defaultValue;
  };

  // Lấy dữ liệu địa điểm
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/properties');
        
        // Kiểm tra định dạng phản hồi
        if (response.data && response.data.statusCode === 200 && response.data.data) {
          const propertiesData = Object.values(response.data.data)
            .filter(property => property && typeof property === 'object')
            .map(property => ({
              id: getPropertyValue(property, 'id'),
              name: getPropertyValue(property, 'name'),
              address: getPropertyValue(property, 'address'),
              price: getPropertyValue(property, 'price', 0),
              isActive: getPropertyValue(property, 'isActive', false)
            }));
          
          setProperties(propertiesData);
          setFilteredProperties(propertiesData);
        } else {
          throw new Error('Định dạng phản hồi không hợp lệ');
        }
      } catch (err) {
        console.error('Lỗi lấy dữ liệu:', err);
        setError('Không thể lấy danh sách địa điểm: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Logic lọc và tìm kiếm
  useEffect(() => {
    let result = properties;

    // Lọc theo tìm kiếm
    if (searchTerm) {
      result = result.filter(property => 
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo trạng thái
    if (statusFilter !== 'all') {
      result = result.filter(property => 
        statusFilter === 'active' ? property.isActive : !property.isActive
      );
    }

    // Lọc theo khoảng giá
    if (priceRangeFilter.min) {
      result = result.filter(property => 
        property.price >= parseFloat(priceRangeFilter.min)
      );
    }
    if (priceRangeFilter.max) {
      result = result.filter(property => 
        property.price <= parseFloat(priceRangeFilter.max)
      );
    }

    setFilteredProperties(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, priceRangeFilter, properties]);

  // Logic phân trang
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty, 
    indexOfLastProperty
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProperties.length / propertiesPerPage); i++) {
    pageNumbers.push(i);
  }

  // Mở Modal chi tiết địa điểm
  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  // Mở Modal xác nhận xoá
  const handleDelete = (property) => {
    setSelectedProperty(property);
    setShowDeleteConfirm(true);
  };

  // Xoá địa điểm
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/properties/${selectedProperty.id}`);
      setProperties(properties.filter(p => p.id !== selectedProperty.id));
      setShowDeleteConfirm(false);
      setSelectedProperty(null);
    } catch (err) {
      setError('Không thể xoá bất động sản');
    }
  };

  // Reset các bộ lọc về trạng thái mặc định
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPriceRangeFilter({ min: '', max: '' });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="alert alert-danger mt-3">
        {error}
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <Card className="shadow-lg border-0">
        <Card.Header as="h3" className="bg-primary text-white text-center py-3">
          Bảng Quản Lý Địa Điểm
        </Card.Header>
        <Card.Body>
          {/* Bộ lọc */}
          <Row className="mb-4">
            <Col md={3}>
              <Form.Control 
                type="text" 
                placeholder="Tìm kiếm bất động sản..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="shadow-sm"
              />
            </Col>
            <Col md={2}>
              <Form.Select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="shadow-sm"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Ngừng hoạt động</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Control 
                type="number" 
                placeholder="Giá tối thiểu" 
                value={priceRangeFilter.min}
                onChange={(e) => setPriceRangeFilter({
                  ...priceRangeFilter, 
                  min: e.target.value
                })}
                className="shadow-sm"
              />
            </Col>
            <Col md={2}>
              <Form.Control 
                type="number" 
                placeholder="Giá tối đa" 
                value={priceRangeFilter.max}
                onChange={(e) => setPriceRangeFilter({
                  ...priceRangeFilter, 
                  max: e.target.value
                })}
                className="shadow-sm"
              />
            </Col>
            <Col md={3} className="d-flex justify-content-end">
              <Button variant="success" className="shadow-sm">Thêm Mới Địa Điểm</Button>
            </Col>
          </Row>

          {/* Nút làm mới bộ lọc */}
          <Button 
            variant="secondary" 
            className="mb-4"
            onClick={resetFilters}
          >
            Làm mới bộ lọc
          </Button>

          {/* Bảng danh sách địa điểm */}
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Địa chỉ</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentProperties.map((property) => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>{property.name}</td>
                  <td>{property.address}</td>
                  <td>{property.price ? property.price.toLocaleString() : 'N/A'}</td>
                  <td>
                    <span 
                      className={`badge ${property.isActive ? 'bg-success' : 'bg-danger'}`}
                    >
                      {property.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                    </span>
                  </td>
                  <td>
                    <Button 
                      variant="info" 
                      onClick={() => handleViewDetails(property)}
                      className="me-2"
                    >
                      Xem chi tiết
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => handleDelete(property)}
                    >
                      Xoá
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Phân trang */}
          <nav>
            <ul className="pagination justify-content-center">
              {pageNumbers.map(number => (
                <li 
                  key={number} 
                  className={`page-item ${number === currentPage ? 'active' : ''}`}
                >
                  <a 
                    href="#!"
                    onClick={() => setCurrentPage(number)}
                    className="page-link"
                  >
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Card.Body>
      </Card>

      {/* Modal chi tiết */}
      {selectedProperty && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Chi tiết địa điểm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Tên:</strong> {getPropertyValue(selectedProperty, 'name')}</p>
            <p><strong>Địa chỉ:</strong> {getPropertyValue(selectedProperty, 'address')}</p>
            <p><strong>Giá:</strong> {getPropertyValue(selectedProperty, 'price').toLocaleString()}</p>
            <p><strong>Trạng thái:</strong> 
              <span className={selectedProperty.isActive ? 'text-success' : 'text-danger'}>
                {selectedProperty.isActive ? ' Đang hoạt động' : ' Ngừng hoạt động'}
              </span>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="danger" 
              onClick={() => handleDelete(selectedProperty)}
            >
              Xoá
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setShowModal(false)}
            >
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal xác nhận xoá */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xoá địa điểm này không?
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="danger" 
            onClick={confirmDelete}
          >
            Xoá
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => setShowDeleteConfirm(false)}
          >
            Huỷ
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PropertyManagement;
