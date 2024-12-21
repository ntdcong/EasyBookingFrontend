import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]); // State để lưu danh sách danh mục
  const [showModal, setShowModal] = useState(false); // State để hiển thị modal
  const [selectedCategory, setSelectedCategory] = useState(null); // State cho danh mục được chọn để cập nhật
  const [updatedCategoryName, setUpdatedCategoryName] = useState('');

  const navigate = useNavigate();

  // Hàm gọi API để lấy danh sách danh mục
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/categories');
      setCategories(response.data); // Giả sử API trả về một mảng danh mục
    } catch (err) {
      console.error('Có lỗi xảy ra khi lấy danh sách danh mục!', err);
      setError('Lỗi khi lấy danh sách danh mục.');
    }
  };

  useEffect(() => {
    fetchCategories(); // Gọi API khi component được mount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCategory = {
      category_name: categoryName,
      description: description,
      slug: slug,
      icon: icon,
    };

    // Gửi yêu cầu POST để tạo danh mục mới
    axios.post('http://localhost:8080/api/v1/categories', newCategory)
      .then((response) => {
        setMessage('Thêm danh mục thành công!');
        setError('');
        // Reset form after successful submission
        setCategoryName('');
        setDescription('');
        setSlug('');
        setIcon('');

        // Cập nhật danh sách danh mục
        fetchCategories(); // Gọi lại để lấy danh sách mới sau khi thêm thành công
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra khi tạo danh mục!', error);
        setError('Lỗi khi thêm danh mục. Vui lòng thử lại.');
        setMessage('');
      });
  };

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setUpdatedCategoryName(category.category_name);
    setShowModal(true);
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.patch(`http://localhost:8080/api/v1/categories/${selectedCategory.id}`, {
        categoryName: updatedCategoryName,
      });
      setMessage('Cập nhật danh mục thành công!');
      setError('');
      setShowModal(false);
      fetchCategories(); // Cập nhật danh sách danh mục sau khi cập nhật thành công
    } catch (err) {
      console.error('Có lỗi xảy ra khi cập nhật danh mục!', err);
      setError('Lỗi khi cập nhật danh mục.');
      setMessage('');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Danh Sách Danh Mục</h2>
      {/* Hiển thị danh sách danh mục dưới dạng bảng */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Tên Danh Mục</th>
              <th>Mô Tả</th>
              <th>Slug</th>
              <th>Biểu Tượng</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.category_name}</td>
                <td>{category.description}</td>
                <td>{category.slug}</td>
                <td>{category.icon}</td>
                <td>
                  <button 
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleOpenModal(category)}
                  >
                    Cập Nhật
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1 className="text-center mt-5 mb-4">Thêm Danh Mục Mới</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="categoryName">Tên Danh Mục:</label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Mô Tả:</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="slug">Slug:</label>
              <input
                type="text"
                className="form-control"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="icon">Biểu Tượng:</label>
              <input
                type="text"
                className="form-control"
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Thêm Danh Mục</button>
          </form>
        </div>
      </div>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Modal cập nhật danh mục */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cập Nhật Danh Mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="updatedCategoryName">Tên Danh Mục:</label>
            <input
              type="text"
              className="form-control"
              id="updatedCategoryName"
              value={updatedCategoryName}
              onChange={(e) => setUpdatedCategoryName(e.target.value)}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleUpdateCategory}>
            Lưu Thay Đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryForm;
