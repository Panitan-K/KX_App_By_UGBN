import React from 'react';
import './css/avatar.css'; // Import CSS module

const Avatar = ({ name, avatarUrl,company }) => (
  <div className="user-detail">
   
    <div className="avatar">
      
      <img src={avatarUrl} alt="User Avatar" />
    </div>
    <div className="info">
      <h3>{name}</h3>
      <p>{company}</p>
    </div>
    
  </div>
);

export default Avatar;