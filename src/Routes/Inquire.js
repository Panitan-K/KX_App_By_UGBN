// src/Inquire.js
import styles from './css/Inquire.module.css';
import React, { useState, useRef } from 'react';
import { storage, db } from './Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import Title from './image/logo/Techbite1.png';
import UploadIcon from './image/svg/Upload-Icon.png'; // Replace with your image path

function Inquire() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [profileURL, setProfileURL] = useState('');
  const fileInputRef = useRef(null); // Reference to the hidden file input

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file) => {
    if (file) {
      const imageRef = ref(storage, `profilePictures/${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);

      // Store the URL in Firestore
      const docRef = doc(db, "Registration", email);
      await setDoc(docRef, { profilePictureURL: downloadURL }, { merge: true });

      setProfileURL(downloadURL);
      alert("Profile picture uploaded successfully!");

      // Navigate to main page or perform other actions
      navigate('/main'); // Adjust the path as needed
    } else {
      alert("Please select an image to upload.");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  return (
    <div className={styles['App-Inquire']}>
      <div className={styles['App-Inquire-Header']} >
        <h1>TECHBITE 5.0 Demo Day</h1>
        <img src={Title} alt="Welcome" className="TECHBITE_CLUB" />
        <h4>TECHBITE CLUB REGISTRATION</h4>
      </div>

      <div className={styles['Input-Box']}>
        <div className={styles['Input-Box-Header']}>
          <div>
            <h4>Please Fill in the content below to create a TECHBITE CLUB account</h4>
          </div>
        </div>
      </div>

      <div className={styles['Reg-Box']}>
        <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles["form-style-box-img"]}>
            <h5 htmlFor="Image" className={styles["input-placeholder"]}>Profile Picture</h5>
            <div className={styles["custom-file-input-wrapper"]} onClick={handleImageClick}>
              <img
                src={UploadIcon} // Use your own image for upload button
                alt="Upload"
                className={styles["custom-file-input-img"]}
              />
            </div>
            <div className= {styles["Label-IMG-Container"]}>
              <p>If none were selected Company banner will be used as default</p>
            </div>
           
            <input
              type="file"
              id="Image"
              className={styles["hidden-file-input"]}
              ref={fileInputRef}
              onChange={handleImageChange}
              required
            />
          </div>
          
          <div className={styles["form-style-box"]}>
            <h5>Email</h5>
            <input
              type="email"
              id="Email"
              className={styles["form-style"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles["form-style-box"]}>
            <h5>Organisation</h5>
            <input
              type="email"
              id="Email"
              className={styles["form-style"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles["form-style-box"]}>
            <h5>Name</h5>
            <input
              type="email"
              id="Email"
              className={styles["form-style"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          

          <div>
            <button type="submit" className={styles["submit-button"]}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Inquire;
