import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div className="category-filter-container">
      <div className="container-fluid px-4">
        <div className="category-filter d-flex overflow-auto pb-2">
          {categories.map((category) => (
            <div key={category.slug} className="category-item me-3 text-center">
              <div className="d-flex flex-column align-items-center">
                <i className={`category-icon mb-1`}>{category.icon}</i>
                <span className="category-name small">{category.category_name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
