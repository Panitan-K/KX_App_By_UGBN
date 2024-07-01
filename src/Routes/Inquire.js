// src/Inquire.js
import styles from './css/Inquire.module.css';
import React, { useState, useRef } from 'react';
import { storage, db } from './Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import Title from './image/logo/DemoDay.png';
import UploadIcon from './image/svg/Upload-Icon.png'; // Replace with your image path
import AlertBox from './Component/AlertBox'; // Import the AlertBox component

function Inquire() {
  const [email, setEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [name, setName] = useState('');
  const [profileURL, setProfileURL] = useState(UploadIcon); // Set initial state to the upload icon
  const fileInputRef = useRef(null); // Reference to the hidden file input

  const [alertVisible, setAlertVisible] = useState(false); // State to manage alert visibility
  const [alertTopic, setAlertTopic] = useState(''); // State to manage alert topic
  const [alertContent, setAlertContent] = useState(''); // State to manage alert content

  const handleImageClickAndUpload = async (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageRef = ref(storage, `profilePictures/${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);

      // Update the profile image URL to the uploaded image
      setProfileURL(downloadURL);
    } else {
      setAlertTopic('Attention');
      setAlertContent('Please Select Image');
      setAlertVisible(true); // Show the alert
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Store the form data and profile image URL in Firestore
    const docRef = doc(db, "Registration", email);
    await setDoc(docRef, {
      email,
      organisation,
      name,
      profilePictureURL: profileURL
    }, { merge: true });

    setAlertTopic('Done');
    setAlertContent('Thank you for your registration. See you on Demo Day!');
    setAlertVisible(true); // Show the alert

    // Clear the inputs and reset the profile picture
    setEmail('');
    setOrganisation('');
    setName('');
    setProfileURL(UploadIcon);
  };

  return (
    <div className={styles['App-Inquire']}>
      <div className={styles['App-Inquire-Header']}>
        <img src={Title} alt="Welcome" className="TECHBITE_CLUB" />
        <h1>TECHBITE CLUB REGISTRATION</h1>
      </div>

      <div className={styles['Input-Box']}>
        <div className={styles['Input-Box-Header']}>
          <div>
            <h4>Please Fill in the content below to create a TECHBITE CLUB account</h4>
          </div>
        </div>
      </div>

      <div className={styles['Reg-Box']}>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-style-box-img"]}>
            <h5 htmlFor="Image" className={styles["input-placeholder"]}>Profile Picture</h5>
            <div
              className={`${styles["custom-file-input-wrapper"]} ${profileURL === UploadIcon ? styles["upload-icon"] : styles["uploaded-img"]}`}
              onClick={handleImageClickAndUpload}
            >
              <img
                src={profileURL} // Display the uploaded image or upload icon
                alt="Upload"
                className={styles["custom-file-input-img"]}
              />
            </div>
            {!profileURL.includes('firebase') && (
              <div className={styles["Label-IMG-Container"]}>
                <p>If none were selected, the company banner will be used as default</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
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
              type="text"
              id="Organisation"
              className={styles["form-style"]}
              value={organisation}
              onChange={(e) => setOrganisation(e.target.value)}
              required
            />
          </div>

          <div className={styles["form-style-box"]}>
            <h5>Name</h5>
            <input
              type="text"
              id="Name"
              className={styles["form-style"]}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <button type="submit" className={styles["submit-button"]}>Submit</button>
          </div>
        </form>
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

export default Inquire;
