// src/components/CategoryForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]); // State để lưu danh sách danh mục
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

        // Chuyển hướng về danh sách danh mục sau 2 giây
        setTimeout(() => {
          navigate('/categories');
        }, 2000);
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra khi tạo danh mục!', error);
        setError('Lỗi khi thêm danh mục. Vui lòng thử lại.');
        setMessage('');
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Danh Sách Danh Mục</h2>
      {/* Hiển thị danh sách danh mục dưới dạng bảng */}
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Tên Danh Mục</th>
            <th>Mô Tả</th>
            <th>Slug</th>
            <th>Biểu Tượng</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.category_name}</td>
              <td>{category.description}</td>
              <td>{category.slug}</td>
              <td>{category.icon}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-center mt-4">Thêm Danh Mục Mới</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label>Tên Danh Mục:</label>
          <input
            type="text"
            className="form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mô Tả:</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Slug:</label>
          <input
            type="text"
            className="form-control"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Biểu Tượng:</label>
          <input
            type="text"
            className="form-control"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Thêm Danh Mục</button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default CategoryForm;
