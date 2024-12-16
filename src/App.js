import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CategoryForm from './components/Category/CategoryForm'; 
import ProvinceList from './components/Location/ListProvince';
import DistrictList from './components/Location/DistrictList'; 
import Layout from './components/Layout/Layout'; 
import HelpPage from './components/Layout/Help'; 
import HomePage from './components/Layout/HomePage'; 
import AdminLayout from './components/Layout/AdminLayout';
import AdminDashboard from './components/Layout/AdminDashboard';
import WardList from './components/Location/WardList';
import AddProvince from './components/Location/AddProvince';
import AddDistrict from './components/Location/AddDistrict';
import AddWard from './components/Location/AddWard';
import AddProperty from './components/Property/AddProperty';
import PropertyList from './components/Property/PropertyList';
import BookingHistory from './components/Property/BookingHistory';
import PropertyDetail from './components/Property/PropertyDetail';
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/LoginForm';
import AccountTypeSelection from './components/Auth/AccountTypeSelection';
import ProfilePage from './components/Auth/ProfilePage';
import ExperiencesPage from './components/Experience/ExperiencesPage';
import ExperiencesDetailPage from './components/Experience/ExperiencesDetailPage';

const App = () => {
  // Kiểm tra nếu có token và vai trò trong localStorage
  const isAuthenticated = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");
  const isAdmin = userRole === "Admin";

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Trang properties sẽ luôn có sẵn cho cả người dùng chưa đăng nhập */}
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/experience" element={<ExperiencesPage />} />
          <Route path="/experience/:id" element={<ExperiencesDetailPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/type" element={<AccountTypeSelection />} />

          {/* Các route yêu cầu đăng nhập sẽ bị ẩn nếu người dùng chưa đăng nhập */}
          <Route 
            path="/add-categories" 
            element={isAuthenticated ? 
              (isAdmin ? 
                <AdminLayout><CategoryForm /></AdminLayout> : 
                <Navigate to="/login" />
              ) : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/provinces" 
            element={isAuthenticated ? 
              (isAdmin ? 
                <AdminLayout><ProvinceList /></AdminLayout> : 
                <Navigate to="/login" />
              ) : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/districts" 
            element={isAuthenticated ? 
              (isAdmin ? 
                <AdminLayout><DistrictList /></AdminLayout> : 
                <Navigate to="/login" />
              ) : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/wards" 
            element={isAuthenticated ? 
              (isAdmin ? 
                <AdminLayout><WardList /></AdminLayout> : 
                <Navigate to="/login" />
              ) : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/add-province" 
            element={isAuthenticated ? 
              (isAdmin ? 
                <AdminLayout><AddProvince /></AdminLayout> : 
                <Navigate to="/login" />
              ) : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/add-district" 
            element={isAuthenticated ? 
              (isAdmin ? 
                <AdminLayout><AddDistrict /></AdminLayout> : 
                <Navigate to="/login" />
              ) : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/add-ward" 
            element={isAuthenticated ? 
              (isAdmin ? 
                <AdminLayout><AddWard /></AdminLayout> : 
                <Navigate to="/login" />
              ) : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/my-profile" 
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/booking-history" 
            element={isAuthenticated ? <BookingHistory /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/add-property" 
            element={isAuthenticated ? <AddProperty /> : <Navigate to="/login" />} 
          />
          <Route
            path="/admin"
            element={isAuthenticated && isAdmin ? 
              <AdminLayout><AdminDashboard /></AdminLayout> : 
              <Navigate to="/login" />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;