import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css"; // Tạo file CSS để tùy chỉnh giao diện giống Airbnb.

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users/@me/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProfile(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [token]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profile.avatar} alt="Avatar" className="profile-avatar" />
        <h2>{profile.firstName} {profile.lastName}</h2>
      </div>
      <div className="profile-details">
        <p>Email: {profile.email}</p>
        <p>Phone: {profile.phoneNumber}</p>
        <p>Gender: {profile.gender}</p>
        {profile.dateOfBirth && <p>Date of Birth: {profile.dateOfBirth}</p>}
        {profile.address && <p>Address: {profile.address}</p>}
        {profile.bio && <p>Bio: {profile.bio}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
