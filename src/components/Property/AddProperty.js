import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    wardId: '',
    placeTypeId: '',
    propertyTypeId: '',
    hostId: '',
    maxGuests: '',
    numBeds: '',
    numBedrooms: '',
    numBathrooms: '',
    price: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Lấy hostId từ localStorage (Kiểm tra có hostId hợp lệ)
    const hostId = localStorage.getItem("userId");
    if (!hostId) {
      alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      return;
    }
  
    // Chuyển đổi các giá trị số thành kiểu số (Int hoặc Float)
    const dataToSend = {
      ...formData,
      hostId,
      maxGuests: parseInt(formData.maxGuests, 10),
      numBeds: parseInt(formData.numBeds, 10),
      numBedrooms: parseInt(formData.numBedrooms, 10),
      numBathrooms: parseInt(formData.numBathrooms, 10),
      price: parseFloat(formData.price), // Chuyển price thành float nếu cần
    };
  
    try {
      const response = await axios.post("http://localhost:8080/api/v1/properties", dataToSend);
      alert("Property added successfully!");
    } catch (error) {
      if (error.response) {
        console.error(error.response.data || error.message);
        alert(error.response?.data?.message || "Failed to add property.");
      } else {
        console.error(error.message);
        alert("Failed to add property.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
      <h2 className="text-center mb-4">Add Property</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          placeholder="Enter property name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          className="form-control"
          placeholder="Enter address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="wardId" className="form-label">Ward ID</label>
          <input
            type="text"
            id="wardId"
            name="wardId"
            className="form-control"
            value={formData.wardId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="placeTypeId" className="form-label">Place Type ID</label>
          <input
            type="text"
            id="placeTypeId"
            name="placeTypeId"
            className="form-control"
            value={formData.placeTypeId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="propertyTypeId" className="form-label">Property Type ID</label>
          <input
            type="text"
            id="propertyTypeId"
            name="propertyTypeId"
            className="form-control"
            value={formData.propertyTypeId}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 mb-3">
          <label htmlFor="maxGuests" className="form-label">Max Guests</label>
          <input
            type="number"
            id="maxGuests"
            name="maxGuests"
            className="form-control"
            value={formData.maxGuests}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="numBeds" className="form-label">Number of Beds</label>
          <input
            type="number"
            id="numBeds"
            name="numBeds"
            className="form-control"
            value={formData.numBeds}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="numBedrooms" className="form-label">Number of Bedrooms</label>
          <input
            type="number"
            id="numBedrooms"
            name="numBedrooms"
            className="form-control"
            value={formData.numBedrooms}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="numBathrooms" className="form-label">Number of Bathrooms</label>
          <input
            type="number"
            id="numBathrooms"
            name="numBathrooms"
            className="form-control"
            value={formData.numBathrooms}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price per Night ($)</label>
        <input
          type="number"
          id="price"
          name="price"
          className="form-control"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary btn-lg">Add Property</button>
      </div>
    </form>
  );
};

export default AddProperty;
