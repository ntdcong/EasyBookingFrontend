import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AccessDenied.css";

const AccessDenied = () => {
  return (
    <div className="access-denied-container d-flex flex-column justify-content-center align-items-center text-center text-white position-relative overflow-hidden">
      {/* Content Section */}
      <div className="access-content z-3 px-4">
        <h1 className="display-3 text-danger mb-4 fw-bold">
          403 - Access Denied
        </h1>
        <p className="lead mb-5 text-white-50">
          Oops! You do not have permission to access this page.
        </p>
        <a href="/" className="btn btn-danger btn-lg shadow-lg">
          Return to Home
        </a>
      </div>

      {/* Starry Background */}
      <div className="stars-container position-absolute w-100 h-100">
        {[...Array(10)].map((_, index) => (
          <div 
            key={index} 
            className="star" 
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AccessDenied;