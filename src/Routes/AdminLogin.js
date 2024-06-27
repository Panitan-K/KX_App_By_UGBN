// AdminLogin.js
import styles from './css/Admin.module.css'; // Import CSS module
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from './Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from './Firebase'; 
import AlertBox from './Component/AlertBox'; // Import the AlertBox component

function AdminLogin() {
  const location = useLocation();
  const { role } = location.state || { role: "Admin" }; // Default to "Admin" if role is not passed
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false); // State to manage alert visibility
  const [alertTopic, setAlertTopic] = useState(''); // State to manage alert topic
  const [alertContent, setAlertContent] = useState(''); // State to manage alert content

  window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log('Submitted username:', email);
    console.log('Submitted password:', password);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const roleDocRef = doc(collection(db, 'Roles'), userCredential.user.uid); // Reference to the document with user UID
      const roleDoc = await getDoc(roleDocRef); // Get the document
      
      if (roleDoc.exists()) {
        const userRole = roleDoc.data().AdminRole; // Get the role attribute
        if (userRole === 'admin') {
          navigate('/Dashboard', { state: { role: userRole } });
        } else {
          setAlertTopic('Error');
          setAlertContent('Role not recognized');
          setAlertVisible(true); // Show the alert
        }
      } else {
        setAlertTopic('Error');
        setAlertContent('No Admin role found');
        setAlertVisible(true); // Show the alert
      }

      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setAlertTopic('Login Error');
      setAlertContent(`${errorCode}: ${errorMessage}`);
      setAlertVisible(true); // Show the alert
    }
  };

  return (
    <div className={styles['App-Admin']}>
      <div className={styles['App-Static-Bar']}>
        <p>{role} Login</p>
      </div>

      <div className="App-header">
        <div className="LoginBox">
          <div className="section1 text-center">
            <form onSubmit={handleLogin}>
              <div className={styles['App-Admin']}>
                <h5 htmlFor="Email">Email</h5>
                <input
                  type="text"
                  id="Email"
                  className={styles['form-style']}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <h5 htmlFor="password">Password</h5>
                <input
                  type="password"
                  id="password"
                  className={styles['form-style']}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <button type="submit" className={styles['App-Login-Button']}>
                  Admin Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

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

export default AdminLogin;
