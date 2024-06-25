import './css/App.css';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import FooterRocket from "./image/svg/rocket.png";
import FooterHouse from "./image/svg/house.png";
import FooterRevert from "./image/svg/Revert.png";

function GuestViewStartup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [startup, setStartup] = useState({
    startupName: '',
    imgSrc: '',
    industry: '',
    stage: '',
    introduction: '',
    productSrc: '',
    des: '', // Ensure this field is present
  });

  const textAreaRef = useRef(null);

  useEffect(() => {
    if (location.state) {
      setStartup(location.state.Startup);
    }
    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
  }, [location.state]);

  useEffect(() => {
    if (textAreaRef.current) {
      autoResizeTextArea(textAreaRef.current);
    }
  }, [startup.des]);

  const autoResizeTextArea = (textarea) => {
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set height to fit content
  };

  return (
    <div className="App" style={{ backgroundColor: "white" }}>
      <div className='AppWithHeaderContent'>
        <div className="Infoheader">
          <h2>{startup.startupName}</h2>
          <p>Stage: {startup.stage}</p>
          <p>We are looking for .....................</p>
        </div>
        <div className='StartupsInfoBlocks2'>
          <img src={startup.productSrc} alt="Welcome" />
          <div className="appleInputContainer">
            <label className="appleInputLabel">Introduction</label>
            <textarea
              type="text"
              className="appleInput"
              value={startup.des}
              readOnly
              ref={textAreaRef}
              onChange={(e) => autoResizeTextArea(e.target)} // Attach resize function
            />
          </div>
        </div>
      </div>
      <footer className="FooterNavBar">
        <img src={FooterRocket} alt="Footer" onClick={() => navigate('/GuestViewList')} />
        <img src={FooterHouse} alt="Footer" onClick={() => navigate('/Guest')} />
        <img src={FooterRevert} alt="Footer" onClick={() => navigate('/GuestViewList')} />
      </footer>
    </div>
  );
}

export default GuestViewStartup;
