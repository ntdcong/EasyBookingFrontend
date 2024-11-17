import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProvinceList = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Gọi API để lấy danh sách Province
    axios.get('http://localhost:8080/api/v1/province')
      .then((response) => {
        setProvinces(response.data.provinces);
        setLoading(false);
      })
      .catch((error) => {
        setError('Không thể lấy dữ liệu');
        setLoading(false);
      });
  }, []);

  // Xử lý khi người dùng nhấn nút Xem Quận/Huyện
  const handleShowDistricts = (provinceId) => {
    // Nếu quận/huyện đã được lấy rồi thì không gọi lại API
    if (!districts[provinceId]) {
      // Gọi API lấy danh sách quận (districts) theo provinceId
      axios.get(`http://localhost:8080/api/v1/province/${provinceId}/districts`)
        .then((response) => {
          setDistricts((prevDistricts) => ({
            ...prevDistricts,
            [provinceId]: response.data.districts
          }));
        })
        .catch((error) => {
          setError('Không thể lấy quận/huyện');
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Danh sách Tỉnh/Thành phố</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Slug</th>
            <th>Ngày Tạo</th>
            <th>Quận/Huyện</th>
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
                <td>
                  <button onClick={() => handleShowDistricts(province.id)}>
                    Xem Quận/Huyện
                  </button>
                </td>
              </tr>

              {/* Hiển thị bảng quận/huyện nếu có */}
              {districts[province.id] && (
                <tr>
                  <td colSpan="5">
                    <table className="table">
                      <thead>
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
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProvinceList;
