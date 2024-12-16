import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProvinceList = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/province`)
      .then((response) => {
        setProvinces(response.data.provinces);
        setLoading(false);
      })
      .catch(() => {
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
    <div className="container my-4">
      <h2 className="text-center mb-4">Danh sách Tỉnh/Thành phố</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Tên</th>
              <th>Slug</th>
              <th>Ngày Tạo</th>
            </tr>
          </thead>
          <tbody>
            {provinces.map((province, index) => (
              <React.Fragment key={province.id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{province.name}</td>
                  <td>{province.slug}</td>
                  <td>{new Date(province.createdAt).toLocaleDateString()}</td>
                </tr>

                {districts[province.id] && (
                  <tr>
                    <td colSpan="4">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead className="table-secondary">
                            <tr>
                              <th>#</th>
                              <th>Tên</th>
                              <th>Slug</th>
                              <th>Ngày Tạo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {districts[province.id].map((district, index) => (
                              <tr key={district.id}>
                                <td>{index + 1}</td>
                                <td>{district.name}</td>
                                <td>{district.slug}</td>
                                <td>{new Date(district.createdAt).toLocaleDateString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProvinceList;
