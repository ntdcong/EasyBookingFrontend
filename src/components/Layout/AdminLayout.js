import React from 'react';

const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userId"); // Nếu bạn có lưu thêm userId
    window.location.href = "/login";
};

const AdminLayout = ({ children }) => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <aside style={{ width: '250px', backgroundColor: '#f8f9fa', padding: '20px' }}>
                <h2>Admin Sidebar</h2>
                <ul>
                    <li>Dashboard</li>
                    <li>Quản lý người dùng</li>
                    <li>Cài đặt</li>
                </ul>
            </aside>
            <div style={{ flex: 1 }}>
                <header style={{ backgroundColor: '#343a40', color: 'white', padding: '10px' }}>
                    <h1>Admin Header</h1>
                    <li>
                        <button className="dropdown-item" onClick={logout}>Đăng xuất</button>
                    </li>
                </header>
                <main style={{ padding: '20px' }}>{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
