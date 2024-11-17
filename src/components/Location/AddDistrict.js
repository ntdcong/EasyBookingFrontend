import React, { useState } from 'react';
import axios from 'axios';

const AddDistrict = () => {
  const [newDistrict, setNewDistrict] = useState({ name: '', provinceId: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/v1/district', newDistrict)
      .then(() => {
        alert('Thêm huyện thành công');
        setNewDistrict({ name: '', provinceId: '' }); // Reset form
      })
      .catch(() => {
        setError('Không thể thêm huyện');
      });
  };

  return (
    <div>
      <h2>Thêm Huyện</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên Huyện"
          value={newDistrict.name}
          onChange={(e) => setNewDistrict({ ...newDistrict, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="ID Tỉnh"
          value={newDistrict.provinceId}
          onChange={(e) => setNewDistrict({ ...newDistrict, provinceId: e.target.value })}
          required
        />
        <button type="submit">Thêm Huyện</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default AddDistrict;
