import './css/App.css';
import TechbiteBG from './image/logo/TechbiteBG.png';
import React, { useState } from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import { auth } from './Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FooterRocket from "./image/svg/rocket.png";
import FooterHouse from "./image/svg/house.png";
import FooterRevert from "./image/svg/Revert.png";
import AlertBox from './Component/AlertBox'; // Import the AlertBox component

function Login() {
  const location = useLocation();
  const { role } = location.state || { role: "Guest" }; // Default to "Guest" if role is not passed
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false); // State to manage alert visibility
  const [alertTopic, setAlertTopic] = useState(''); // State to manage alert topic
  const [alertContent, setAlertContent] = useState(''); // State to manage alert content
 
  //console.log("Role passed from Welcome page:", role); 
  const handleLogin = async (event) => {
    event.preventDefault();
    

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const _user = userCredential.user;

      console.log("Going to Protect JS with role =",role," and UID = ",_user.uid)
      //setErrMsg(null);
      navigate('/Protected', { state: { userUID: _user.uid ,role:role} });

    } catch (error) {
      setAlertTopic('Error');
      setAlertContent('Incorrect Email or Password');
      setAlertVisible(true); // Show the alert
    }

   
  };

  /*const GoIndex = () => {
    navigate("/")
  }*/
  return (  
    
    <div className="AppMain" style={{ backgroundImage: `url(${TechbiteBG})` }}>
     
     

     <div className="App-header">
      <div className="LoginBox" >
        <div className="section1 text-center">
        <div className='LoginRole'>
          <h1 > Login {role}  </h1>
          <h5>Hello, Welcome to TECHBITE 5.0 Demo Day</h5>
        </div>
        <form onSubmit={handleLogin}>

          <div>
            <h5 htmlFor="Email" className="input-placeholder">Email</h5>
            <input
              type="text"
              id="Email"
              className="form-style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <h5 htmlFor="password" className="input-placeholder">Password</h5>
            <input
              type="password"
              id="password"
              className="form-style"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
    
                
        <div>
        <button type="submit"className="submit-button" >Login</button>
        
        </div>
        </form>
        
      </div>
    </div>
    </div>
      <footer className="FooterNavBar">
          <img src={FooterRocket} alt="Footer" />
          <img src={FooterHouse} alt="Footer" />
          <img src={FooterRevert} alt="Footer" onClick={() =>navigate('/')} />
      </footer>
        {alertVisible && (
        <AlertBox
          alertTopic={alertTopic}
          alertContent={alertContent}
          onClose={() => setAlertVisible(false)} // Close the alert
        />
      )}
    </div>

  
    
  );
}

export default Login;