import './css/App.css';

import Title from './image/logo/Uphasia.png';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState(null);
    const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    //console.log('Submitted username:', email);
    //console.log('Submitted password:', password);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const _user = userCredential.user;

      //console.log(userCredential)
      //console.log(_user.uid)
        /*
        Uphasia, we are an application that aims to enhance communication well-being. Nowadays, there is a shortage of Speech-Language Pathologists (SLPs) who can effectively treat patients with communication disorders. We see an opportunity to provide new AI technologies, such as ASR and NLP, to make speech therapy more readily available by mimicking the procedures exercised by SLPs in clinics, according to the Thai-WAB test standard (Thai-Western Aphasia Battery Test).

This idea has been preliminarily validated by mentors and judges during Siriraj Hackathon 2023 (3rd Place )

We are currently approaching the medical institution including 
- Siriraj
- Ramathibodi
- Sirinthorn
- Other Private Clinics 

for clinical trials for the next step, our goal is to have our application placed on the Thai National Innovation List. This approval will give us an advantage, as the application will be authorized for use in communication disorder treatments. Our distribution model will encompass both B2C and B2B approaches, with B2G also being a possibility.

        */
      setErrMsg(null);
      navigate('/Protected', { state: { userUID: _user.uid } });

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrMsg(errorCode + '  ' + errorMessage);
    }
  };

  
  return (
    
    <div className="App">
    <div className="static-bar">
    <div className="left-content">

    <Link to="/">
        <img className="title-image" src={Title} alt="Title"   />
     </Link>
    </div>

  
   <div className='right-content'>


   </div>

  </div>

     <div className="App-header">
      <div className="LoginBox" >
        <div className="section1 text-center">
        <div className="Middle-content">
        <h1>Login</h1>
        </div>
        
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
          <p>{errMsg}</p>
          <Link to="/ForgotPassword" class="link2">Forgot Password? </Link>          
        <div>
        <button type="submit"class="submit-button" onClick={() => navigate('/Home')}>Login</button>
        </div>
        </form>
        
      </div>
    </div>
    </div>
    </div>

  
    
  );
}

export default Login;