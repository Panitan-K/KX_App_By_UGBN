import React from 'react';
import './css/avatar.css'; // Import CSS module
import rightarrow from '../image/svg/arrow-right.png'

const InvestorBlockAvatar = ({ imgLink, StartupName, Sector }) => (
  <div className="startup-block-detail">
    <div className="startup-block-avatar">
      <img src={imgLink} alt="Startup Avatar" />
    </div>
    <div className="startup-block-info">
      <h3 className="startup-block-name">{StartupName}</h3>
      <p className="startup-block-sector">Company : {Sector}</p>
    </div>
    <img src={rightarrow} alt="Startup Avatar" className="startup-block-arrow"/>
  </div>
);

export default InvestorBlockAvatar;
