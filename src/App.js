import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import CSS của carousel
import CategoryForm from './components/Category/CategoryForm'; 
import ProvinceList from './components/Location/ListProvince';
import DistrictList from './components/Location/DistrictList'; 
import Layout from './components/Layout/Layout'; 
import HelpPage from './components/Layout/Help'; 
import HomePage from './components/Layout/HomePage'; 
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
import ProfilePage from './components/Auth/ProfilePage';
import ExperiencesPage from './components/Experience/ExperiencesPage';
import ExperiencesDetailPage from './components/Experience/ExperiencesDetailPage';

const App = () => {
  // Kiểm tra nếu có token trong localStorage (người dùng đã đăng nhập)
  const isAuthenticated = localStorage.getItem("accessToken");
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

          {/* Các route yêu cầu đăng nhập sẽ bị ẩn nếu người dùng chưa đăng nhập */}
          <Route 
            path="/add-categories" 
            element={isAuthenticated ? <CategoryForm /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/provinces" 
            element={isAuthenticated ? <ProvinceList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/districts" 
            element={isAuthenticated ? <DistrictList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/wards" 
            element={isAuthenticated ? <WardList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/add-province" 
            element={isAuthenticated ? <AddProvince /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/add-district" 
            element={isAuthenticated ? <AddDistrict /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/add-ward" 
            element={isAuthenticated ? <AddWard /> : <Navigate to="/login" />} 
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
          
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
