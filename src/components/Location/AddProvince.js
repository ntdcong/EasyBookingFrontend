import React, { useState } from 'react';
import axios from 'axios';

const AddProvince = () => {
  const [newProvince, setNewProvince] = useState({ name: '', slug: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/v1/province', newProvince)
      .then(() => {
        alert('Thêm tỉnh thành công');
        setNewProvince({ name: '', slug: '' }); // Reset form
      })
      .catch(() => {
        setError('Không thể thêm tỉnh');
      });
  };

  return (
    <div>
      <h2>Thêm Tỉnh/Thành phố</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên Tỉnh"
          value={newProvince.name}
          onChange={(e) => setNewProvince({ ...newProvince, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={newProvince.slug}
          onChange={(e) => setNewProvince({ ...newProvince, slug: e.target.value })}
          required
        />
        <button type="submit">Thêm Tỉnh</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default AddProvince;
