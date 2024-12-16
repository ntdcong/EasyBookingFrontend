import React, { useEffect, useState } from "react";
import axios from "axios";

const WardList = () => {
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/wards");
        if (Array.isArray(response.data)) {
          setWards(response.data);
        } else {
          setError("Dữ liệu đường không hợp lệ");
        }
      } catch (error) {
        setError("Không thể lấy dữ liệu đường");
      } finally {
        setLoading(false);
      }
    };

    fetchWards();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
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
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Danh sách Đường</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Tên Đường</th>
            <th>Quận</th>
            <th>Tỉnh</th>
            <th>Ngày Tạo</th>
            <th>Ngày Cập Nhật</th>
          </tr>
        </thead>
        <tbody>
          {wards.map((ward, index) => (
            <tr key={ward.id}>
              <td>{index + 1}</td>
              <td>{ward.name}</td>
              <td>{ward.district.name}</td>
              <td>{ward.district.province.name}</td>
              <td>{new Date(ward.createdAt).toLocaleDateString()}</td>
              <td>
                {ward.updatedAt
                  ? new Date(ward.updatedAt).toLocaleDateString()
                  : "Chưa cập nhật"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WardList;
