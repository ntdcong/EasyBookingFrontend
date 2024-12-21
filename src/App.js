import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// Pages
import CategoryForm from './components/Category/CategoryForm';
import ProvinceList from './components/Location/ListProvince';
import DistrictList from './components/Location/DistrictList';
import Layout from './components/Layout/Layout';
import HelpPage from './components/Layout/Help';
import HomePage from './components/Layout/HomePage';
import AdminLayout from './components/Layout/AdminDash/AdminLayout';
import UserManagement from './components/Layout/AdminDash/UserManagement';
import AdminDashboard from './components/Layout/AdminDash/AdminDashboard';
import PropertyManagement from './components/Layout/AdminDash/PropertyManagement';
import HostPropertyManagement from './components/Layout/AdminDash/HostPropertyManagement';
import BookingManagement from './components/Layout/AdminDash/BookingManagement';
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
import AddExperience from './components/Experience/AddExperience';
import AccessDenied from './components/Auth/AccessDenied'; // Import AccessDenied page

const App = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");
  const isAdmin = userRole === "Admin";
  const isHost = userRole === "Host";

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="properties" element={<PropertyList />} />
        <Route path="properties/:id" element={<PropertyDetail />} />
        <Route path="experience" element={<ExperiencesPage />} />
        <Route path="experience/:id" element={<ExperiencesDetailPage />} />
        <Route path="sign-up" element={<SignupForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="type" element={<AccountTypeSelection />} />
      </Route>

      {/* Authenticated Routes */}
      <Route
        path="/add-categories"
        element={
          isAuthenticated && isAdmin ? (
            <AdminLayout>
              <CategoryForm />
            </AdminLayout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      <Route
        path="/provinces"
        element={
          isAuthenticated && isAdmin ? (
            <AdminLayout>
              <ProvinceList />
            </AdminLayout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      <Route
        path="/districts"
        element={
          isAuthenticated && isAdmin ? (
            <AdminLayout>
              <DistrictList />
            </AdminLayout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      <Route
        path="/wards"
        element={
          isAuthenticated && isAdmin ? (
            <AdminLayout>
              <WardList />
            </AdminLayout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      <Route
        path="/add-province"
        element={
          isAuthenticated && isAdmin ? (
            <AdminLayout>
              <AddProvince />
            </AdminLayout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      <Route
        path="/add-district"
        element={
          isAuthenticated && isAdmin ? (
            <AdminLayout>
              <AddDistrict />
            </AdminLayout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      <Route
        path="/add-ward"
        element={
          isAuthenticated && isAdmin ? (
            <AdminLayout>
              <AddWard />
            </AdminLayout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      <Route
        path="/property-manager"
        element={
          isAuthenticated && isAdmin ? (
            <AdminLayout>
              <PropertyManagement />
            </AdminLayout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      <Route
        path="/property-manager-host"
        element={
          isAuthenticated && isHost ? (
            <Layout>
              <HostPropertyManagement />
            </Layout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      <Route
        path="/booking-manager"
        element={
          isAuthenticated && isAdmin ? (
            <AdminLayout>
              <BookingManagement />
            </AdminLayout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      <Route
        path="/user-manager"
        element={
          isAuthenticated && isAdmin ? (
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      <Route
        path="/booking-history"
        element={
          isAuthenticated ? (
            <Layout>
              <BookingHistory />
            </Layout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      <Route
        path="/my-profile"
        element={
          isAuthenticated ? (
            <Layout>
              <ProfilePage />
            </Layout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      <Route
        path="/add-property"
        element={
          isAuthenticated ? (
            userRole === "Admin" ? (
              <AdminLayout>
                <AddProperty /> {/* Route cho Admin */}
              </AdminLayout>
            ) : userRole === "Host" ? (
              <Layout>
                <AddProperty /> {/* Route cho Host */}
              </Layout>
            ) : (
              <Navigate to="/access-denied" /> // Nếu không phải Admin hoặc Host
            )
          ) : (
            <Navigate to="/login" /> // Nếu chưa đăng nhập
          )
        }
      />
      <Route
        path="/add-experience"
        element={
          isAuthenticated ? (
            userRole === "Admin" ? (
              <AdminLayout>
                <AddExperience /> {/* Route cho Admin */}
              </AdminLayout>
            ) : userRole === "Host" ? (
              <Layout>
                <AddExperience /> {/* Route cho Host */}
              </Layout>
            ) : (
              <Navigate to="/access-denied" /> // Nếu không phải Admin hoặc Host
            )
          ) : (
            <Navigate to="/login" /> // Nếu chưa đăng nhập
          )
        }
      />
      <Route
        path="/admin"
        element={
          isAuthenticated && isAdmin ? (
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          ) : (
            <Navigate to="/access-denied" />
          )
        }
      />
      {/* 403 Access Denied Route */}
      <Route path="/access-denied" element={<AccessDenied />} />

    </Routes>
  );
};

export default App;
