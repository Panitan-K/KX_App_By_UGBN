import React, { useState, useEffect } from 'react';
import './css/App.css';
import Title from './image/logo/KX.png';
import LoadingImg from './image/logo/Techbite1.png'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <img src={LoadingImg} alt="Loading..." className="loading-image" />
        </div>
      ) : (
        <div className="AppMain fade-in">
          <div className="welcome-container">
            <img src={Title} alt="Welcome" className="UphasiaMiddleLogo" />
            <div className="LogRegContainer">
              <button className="LogRegbox1" onClick={() => navigate('/Login',{state : {role:"Investor"}}) }>INVESTORS</button>
              <button className="LogRegbox1" onClick={() => navigate('/Login',{state : {role:"Startup"}})}>STARTUPS</button>
              <button className="LogRegbox1" onClick={() => navigate('/Guest')}>GUEST</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Welcome;
