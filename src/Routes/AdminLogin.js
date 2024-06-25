import styles from './css/Admin.module.css'; // Import CSS module
import React, { useState } from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import { auth } from './Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {  collection, doc, getDoc } from 'firebase/firestore';
import { db } from './Firebase'; 
function AdminLogin() {
  const location = useLocation();
  const { role } = location.state || { role: "Admin" }; // Default to "Guest" if role is not passed
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();


    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts

    /*const fetchRole = async (xUID) => {
      try {
        const RoleCollectionRef = collection(db, 'Role'); // Reference to 'Startup' collection
        const RolequerySnapshot = await getDocs(RoleCollectionRef); // Query the collection and get snapshot
        
        if (!RolequerySnapshot.empty) {
          const RoleData = RolequerySnapshot.docs.find(doc => doc.id === xUID); // Find the document with ID 'S01'
          
          if (RoleData) {
            const Buffer = RoleData.data();
  
            console.log(Buffer);
          } else {
            console.error("Startup document with ID 'S01' not found.");
          }
        } else {
          console.log("No documents found in 'Role' collection.");
        }
      } catch (error) {
        console.error('Error updating Role data:', error);
      }
    };*/
  

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log('Submitted username:', email);
    console.log('Submitted password:', password);
    console.log(errMsg)


    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user.uid)
      const roleDocRef = doc(collection(db, 'Roles'), userCredential.user.uid); // Reference to the document with ID 'userUID'
      const roleDoc = await getDoc(roleDocRef); // Get the document
      if (roleDoc.exists()) {
        //console.log("I GOT ", roleDoc.data().role);
        const userRole = roleDoc.data().AdminRole; // Get the role attribute
        console.log(userRole)
        if (userRole === 'admin') {
          navigate('/Dashboard', {state : {role : userRole} });
        } else {
          console.error('Role not recognized');
      
        }
      } else {
        console.error('No Admin');

      }
  

      setErrMsg(null);


    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrMsg(errorCode + '  ' + errorMessage);
    }
  };

  
  return (
    
    <div className={styles['App-Admin']}>
     
      <div className={styles['App-Static-Bar']}>
     
        <p>{role} Login  </p>
      </div>

     <div className="App-header">
      <div className="LoginBox" >
        <div className="section1 text-center">

        
        <form onSubmit={handleLogin}>

          <div className={styles['App-Admin']}>
            
            <h5 htmlFor="Email">Email</h5>
            <input
              type="text"
              id="Email"
              class={styles['form-style']}
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
              class={styles['form-style']}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
    
          
        <div>
        <button type="submit" className={styles['App-Login-Button']} >Admin Login</button>
        
        </div>
        </form>
        
      </div>
    </div>
    </div>
    </div>

  
    
  );
}

export default AdminLogin;