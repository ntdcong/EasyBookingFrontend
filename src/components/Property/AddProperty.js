import React, { useState } from "react";
import axios from "axios";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    wardId: "",
    placeTypeId: "",
    propertyTypeId: "",
    hostId: "",
    maxGuests: "",
    numBeds: "",
    numBedrooms: "",
    numBathrooms: "",
    price: "",
  });

  // Hàm xử lý khi thay đổi giá trị các trường input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lấy hostId từ localStorage
    const hostId = localStorage.getItem("userId");
    if (!hostId) {
      alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      return;
    }

    // Chuẩn bị dữ liệu gửi lên API
    const dataToSend = {
      ...formData,
      hostId,
      maxGuests: parseInt(formData.maxGuests, 10),
      numBeds: parseInt(formData.numBeds, 10),
      numBedrooms: parseInt(formData.numBedrooms, 10),
      numBathrooms: parseInt(formData.numBathrooms, 10),
      price: parseFloat(formData.price),
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/properties",
        dataToSend
      );
      alert("Thêm địa điểm thành công!");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Có lỗi xảy ra khi thêm địa điểm."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "auto" }}>
      <h2 className="text-center mb-4">Thêm Địa Điểm</h2>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Tên Địa Điểm
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          placeholder="Nhập tên địa điểm"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Địa chỉ
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="form-control"
          placeholder="Nhập địa chỉ"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="wardId" className="form-label">
            Ward ID
          </label>
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
          <label htmlFor="placeTypeId" className="form-label">
            Place Type ID
          </label>
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
          <label htmlFor="propertyTypeId" className="form-label">
            Property Type ID
          </label>
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
          <label htmlFor="maxGuests" className="form-label">
            Số khách tối đa
          </label>
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
          <label htmlFor="numBeds" className="form-label">
            Số giường
          </label>
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
          <label htmlFor="numBedrooms" className="form-label">
            Số phòng ngủ
          </label>
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
          <label htmlFor="numBathrooms" className="form-label">
            Số phòng tắm
          </label>
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
        <label htmlFor="price" className="form-label">
          Giá thuê mỗi đêm (VNĐ)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          className="form-control"
          placeholder="Nhập giá thuê"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary btn-lg">
          Thêm Địa Điểm
        </button>
      </div>
    </form>
  );
};

export default AddProperty;
