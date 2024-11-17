// src/components/CategoryList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoryList.css';  // Import CSS cho CategoryList

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the API
  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/categories')
      .then(response => {
        setCategories(response.data);  // Assuming response.data contains the array of categories
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  return (
    <div className="category-list">
      <h2 className="category-list-title">Danh Sách Danh Mục</h2>
      {categories.length > 0 ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Tên Danh Mục</th>
              <th>Mô Tả</th>
              <th>Slug</th>
              <th>Icon</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.category_name}</td>
                <td>{category.description}</td>
                <td>{category.slug}</td>
                <td>{category.icon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default CategoryList;
