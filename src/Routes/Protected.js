import React, { useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

function Protected({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const userUID = location.state.userUID;

  useEffect(() => {
    if (role === "Startup") {
      console.log(role)
      navigate('/Startup')
    }
    else if (role === "Investor") {
      console.log(role)
      navigate('/InvestorMain', { state: { investorID: 'IN01' } })
    }
  }, [navigate, userUID]);

  // Render the children only if the user is signed in
  if (userUID != null) {
    return <>{children}</>;
  }

  // User is not signed in, already navigated
  return null;
}

export default Protected;
