// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryForm from './components/Category/CategoryForm'; 
import CategoryList from './components/Category/CategoryList'; 
import ProvinceList from './components/Location/ListProvince';
import DistrictList from './components/Location/DistrictList'; // Thêm dòng này
import Layout from './components/Layout/Layout'; 
import WardList from './components/Location/WardList';
import AddProvince from './components/Location/AddProvince';
import AddDistrict from './components/Location/AddDistrict';
import AddWard from './components/Location/AddWard';
import PropertyList from './components/Property/PropertyList';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/add-categories" element={<CategoryForm />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/provinces" element={<ProvinceList />} />
          <Route path="/districts" element={<DistrictList />} />
          <Route path="/wards" element={<WardList />} />
          <Route path="/add-province" element={<AddProvince />} />
          <Route path="/add-district" element={<AddDistrict />} />
          <Route path="/add-ward" element={<AddWard />} />  
          <Route path="/properties" element={<PropertyList />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
