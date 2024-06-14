import './css/App.css';

import React, { useState } from 'react';
import { useLocation,useNavigate } from "react-router-dom";
//import { auth } from './Firebase';
//import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const location = useLocation();
  const { role } = location.state || { role: "Guest" }; // Default to "Guest" if role is not passed
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();
  //console.log("Role passed from Welcome page:", role); 
  const handleLogin = async (event) => {
    event.preventDefault();
    if (role === "Startup") {
      console.log(role)
      navigate('/Startup')
    }
    else if (role === "Investor") {
      console.log(role)
      navigate('/InvestorMain')
    }
    //console.log('Submitted username:', email);
    //console.log('Submitted password:', password);
          //console.log(userCredential)
      //console.log(_user.uid)
/*
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const _user = userCredential.user;


      setErrMsg(null);
      navigate('/Protected', { state: { userUID: _user.uid } });

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrMsg(errorCode + '  ' + errorMessage);
    }*/
  };

  
  return (
    
    <div className="App">
     
      <div className='static-bar'>
     
        <p>{role} Login  </p>
      </div>

     <div className="App-header">
      <div className="LoginBox" >
        <div className="section1 text-center">

        
        <form onSubmit={handleLogin}>

          <div>
            <h5 htmlFor="Email" class="input-placeholder">Email</h5>
            <input
              type="text"
              id="Email"
              class="form-style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <h5 htmlFor="password" class="input-placeholder">Password</h5>
            <input
              type="password"
              id="password"
              class="form-style"
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
    </div>

  
    
  );
}

export default Login;