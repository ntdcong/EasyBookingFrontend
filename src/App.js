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
import AccessDenied from './components/Auth/AccessDenied'; // Import AccessDenied page

const App = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");
  const isAdmin = userRole === "Admin";

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
          isAuthenticated && isAdmin ? (
            <AdminLayout>
              <AddProperty />
            </AdminLayout>
          ) : (
            <Navigate to="/access-denied" />
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
