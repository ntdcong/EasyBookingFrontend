import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Icons from Bootstrap Icons
import { 
  LayoutTextSidebar, 
  People, 
  Gear, 
  BoxArrowRight, 
  House
} from 'react-bootstrap-icons';
import { FaCity } from 'react-icons/fa';
import { ClipboardTypeIcon, HousePlus, PanelBottom, PencilIcon, Plane, StopCircle, StretchVertical, TrafficConeIcon } from 'lucide-react';
import { PiFlagBanner } from 'react-icons/pi';

const MENU_ITEMS = [
  { 
    icon: ClipboardTypeIcon, 
    label: 'Quản Lý Tỉnh', 
    path: '/provinces' 
  },
  { 
    icon: StopCircle, 
    label: 'Quản Lý Huyện', 
    path: '/districts' 
  },
  { 
    icon: TrafficConeIcon, 
    label: 'Quản Lý Đường', 
    path: '/wards' 
  },
  {
    icon: HousePlus, 
    label: 'Thêm Địa Điểm', 
    path: '/add-property' 
  },
  {
    icon: PencilIcon, 
    label: 'Quản Lý Địa Điểm', 
    path: '/property-manager' 
  },
  {
    icon: Plane, 
    label: 'Quản Lý Booking', 
    path: '/booking-manager' 
  }
];

const AdminLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div 
        className={`bg-light border-end shadow-sm ${isSidebarCollapsed ? 'sidebar-narrow' : 'sidebar'}`}
        style={{
          width: isSidebarCollapsed ? '80px' : '250px',
          transition: 'width 0.3s ease'
        }}
      >
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          {!isSidebarCollapsed && (
            <h2 className="h5 mb-0">Admin Panel</h2>
          )}
          <button 
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? '>' : '<'}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-3">
          <ul className="nav flex-column">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path} className="nav-item">
                  <Link 
                    to={item.path} 
                    className={`nav-link d-flex align-items-center ${
                      location.pathname === item.path 
                        ? 'active bg-primary text-white' 
                        : 'text-dark'
                    }`}
                  >
                    <Icon className="me-3" />
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto p-3 border-top">
          <button 
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
            onClick={logout}
          >
            <BoxArrowRight className="me-2" />
            {!isSidebarCollapsed && 'Đăng xuất'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-bottom p-3 d-flex justify-content-between align-items-center">
          <h1 className="h4 mb-0">Trang Quản Trị</h1>
          
          {/* User Info */}
          <div className="d-flex align-items-center">
            <span className="text-muted me-2">Xin chào, </span>
            <span className="fw-bold">Quản Trị Viên</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow-1 p-4 bg-light overflow-auto">
          <div className="bg-white shadow-sm rounded p-4">
            {children}
          </div>
        </main>
      </div>

      {/* Custom CSS for sidebar */}
      <style jsx>{`
        .sidebar-narrow .nav-link span {
          display: none;
        }
        .sidebar-narrow .nav-link {
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;