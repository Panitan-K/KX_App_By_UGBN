// src/components/ProfilePictureUpload.js
import React, { useState } from "react";
import { storage, auth } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const ProfilePictureUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `profilePictures/${image.name}`);
      uploadBytes(storageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setUrl(downloadURL);
            alert("Profile picture updated successfully!");
          }).catch((error) => {
            console.error("Error updating profile picture: ", error);
          });
        });
      });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Profile Picture</button>
      {url && <img src={url} alt="Profile" />}
    </div>
  );
};

export default ProfilePictureUpload;
