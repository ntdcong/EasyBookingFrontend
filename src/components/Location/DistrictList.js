// src/components/Location/DistrictList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DistrictList = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Gọi API để lấy danh sách District
    axios.get('http://localhost:8080/api/v1/district')
      .then((response) => {
        console.log(response.data); // Kiểm tra dữ liệu trả về
        setDistricts(response.data.districts);
        setLoading(false);
      })
      .catch((error) => {
        setError('Không thể lấy dữ liệu');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Danh sách Quận/Huyện</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Tên</th>
              <th>Province ID</th>
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
                <td>{district.slug}</td>
                <td>{new Date(district.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistrictList;