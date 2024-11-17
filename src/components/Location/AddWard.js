import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddWard = () => {
  const [districts, setDistricts] = useState([]);
  const [name, setName] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State để lưu thông báo thành công

  // Fetch danh sách huyện
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/district'); // Đảm bảo endpoint đúng
        if (response.data && response.data.districts) {
          setDistricts(response.data.districts);
        } else {
          throw new Error('Dữ liệu không hợp lệ');
        }
      } catch (err) {
        console.error('Lỗi khi lấy danh sách huyện:', err);
        setError('Lỗi khi lấy danh sách huyện. Vui lòng thử lại sau.');
      }
    };

    fetchDistricts();
  }, []);

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(''); // Reset thông báo thành công trước khi gửi yêu cầu
    try {
      await axios.post('http://localhost:8080/api/v1/wards', {
        name,
        districtId,
      });
      setSuccess('Thêm đường thành công!'); // Cập nhật thông báo thành công
      setName(''); // Reset tên đường sau khi thêm
      setDistrictId(''); // Reset ID huyện sau khi thêm
    } catch (error) {
      if (error.response) {
        console.error('Lỗi khi thêm đường:', error.response.data);
        setError(`Lỗi khi thêm đường: ${error.response.data.message || error.message}`);
      } else {
        console.error('Lỗi khi thêm đường:', error);
        setError('Lỗi khi thêm đường');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tên đường:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Huyện:</label>
        <select onChange={(e) => setDistrictId(e.target.value)} required>
          <option value="">Chọn huyện</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Thêm đường</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}
      {success && <p style={{ color: 'green' }}>{success}</p>} {/* Hiển thị thông báo thành công */}
    </form>
  );
};

export default AddWard;
