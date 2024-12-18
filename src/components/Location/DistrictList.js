import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DistrictList = () => {
  const [newDistrict, setNewDistrict] = useState({ name: '', provinceId: '' });
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Gọi API để lấy danh sách huyện
  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/district')
      .then((response) => {
        setDistricts(response.data.districts);
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể lấy dữ liệu quận/huyện');
        setLoading(false);
      });
  }, []);

  // Xử lý thêm huyện
  const handleAddDistrict = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/v1/district', newDistrict)
      .then(() => {
        alert('Thêm huyện thành công!');
        setDistricts([...districts, { ...newDistrict, id: new Date().getTime() }]);
        setNewDistrict({ name: '', provinceId: '' });
      })
      .catch(() => {
        setError('Không thể thêm huyện');
      });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Quản Lý Huyện</h1>

      {/* Form Thêm Huyện */}
      <div className="card mb-4">
        <div className="card-header text-white bg-primary">
          <h3 className="card-title mb-0">Thêm Huyện</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddDistrict}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Tên Huyện</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Nhập tên huyện"
                value={newDistrict.name}
                onChange={(e) => setNewDistrict({ ...newDistrict, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="provinceId" className="form-label">ID Tỉnh</label>
              <input
                type="text"
                id="provinceId"
                className="form-control"
                placeholder="Nhập ID tỉnh"
                value={newDistrict.provinceId}
                onChange={(e) => setNewDistrict({ ...newDistrict, provinceId: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Thêm Huyện</button>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>

      {/* Danh Sách Huyện */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center" role="alert">{error}</div>
      ) : (
        <div className="card">
          <div className="card-header text-white bg-secondary">
            <h3 className="card-title mb-0">Danh Sách Quận/Huyện</h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Tên</th>
                    <th>ID Tỉnh</th>
                    <th>Slug</th>
                    <th>Ngày Tạo</th>
                  </tr>
                </thead>
                <tbody>
                  {districts.map((district, index) => (
                    <tr key={district.id}>
                      <td>{index + 1}</td>
                      <td>{district.name}</td>
                      <td>{district.provinceId}</td>
                      <td>{district.slug || 'N/A'}</td>
                      <td>{district.createdAt ? new Date(district.createdAt).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistrictList;
