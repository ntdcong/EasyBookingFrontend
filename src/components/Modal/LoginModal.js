import React from 'react';
import { FaFacebook, FaGoogle, FaApple, FaEnvelope } from 'react-icons/fa'; // React Icons
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const handleClose = () => onClose(false); // Đóng modal

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Đăng nhập - Đăng ký</h3>
        <h2>Chào mừng bạn đến với EasyBooking</h2>    
        <form>
          <label>
            Quốc gia/Khu vực
            <select defaultValue="Vietnam (+84)">
              <option value="Vietnam (+84)">Việt Nam (+84)</option>
              <option value="USA (+1)">USA (+1)</option>
              {/* Thêm các quốc gia khác nếu cần */}
            </select>
          </label>
           <br/>
          <label>          
            <input type="tel" placeholder="Nhập số điện thoại" />
          </label>
          <p>
            Chúng tôi sẽ gọi điện hoặc nhắn tin cho bạn để xác nhận số điện thoại.
            Có áp dụng phí dữ liệu và phí tin nhắn tiêu chuẩn -
            <a href="#"> Chính sách về quyền riêng tư</a>
          </p>
          <button type="submit" className="btn-submit">Tiếp tục</button>
          
          <div className="alternative-login">
            <p>hoặc</p>
            <button className="btn-facebook">
              <FaFacebook size={20} /> Tiếp tục với Facebook
            </button>
            <button className="btn-google">
              <FaGoogle size={20} /> Tiếp tục với Google
            </button>
            <button className="btn-apple">
              <FaApple size={20} /> Tiếp tục với Apple
            </button>
            <button className="btn-email">
              <FaEnvelope size={20} /> Tiếp tục bằng email
            </button>
          </div>
        </form>
        <button className="close-btn" onClick={handleClose}>X</button>
      </div>
    </div>
  );
};

export default LoginModal;
